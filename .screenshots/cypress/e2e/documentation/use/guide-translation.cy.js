// Screenshots for the article translation guide page (use/guides/article-translation.md).
//
// The demo stack has no translation service that answers, so the feature state is mocked the way the
// other gated sections are (see guide-ai.cy.js): the real application config is passed through and
// only the feature's own settings are flipped, and the target locales and the translation answer
// come from fixed data. The client asks for a translation only after the ticket's translation
// subscription answered once, so that answer is replayed over the WebSocket as well.
//
// The selectors are the ones that survive the production build: static data-test-id attributes are
// stripped there, only bound ones (`:data-test-id="article-bubble-body-${…}"`) and labels
// (aria-label from v-tooltip, visible text) can be used.

const LOCALES = [
  { __typename: 'Locale', locale: 'de-de', alias: 'German', name: 'German (Germany)', dir: 'ltr' },
  { __typename: 'Locale', locale: 'en-us', alias: 'English', name: 'English (United States)', dir: 'ltr' },
  { __typename: 'Locale', locale: 'fr-fr', alias: 'French', name: 'French (France)', dir: 'ltr' },
]

// A plausible translation of the seeded ticket's first article, in the target language of the shots.
const TRANSLATED_CONTENT =
  'Guten Tag,\n\nich benötige Hilfe bei meiner Bestellung. Die Lieferung ist bisher nicht angekommen.\n\nBeste Grüße\nJohn Doe'

const CONFIG_KEYS = [
  'content_translation_service',
  'content_translation_ticket_article',
  'content_translation_ticket_article_auto',
]

const SERVER_OPERATIONS = [
  'applicationConfig',
  'currentUser',
  'ticketArticleTranslationTargetLocales',
  'ticketArticleTranslate',
  'ticketArticleTranslateMany',
  'aiAnalyticsUsage',
]

// Registered before login, so the app's initial config fetch is covered too.
const mockTranslationFeature = () => {
  cy.intercept('POST', '/graphql', (req) => {
    const ops = Array.isArray(req.body) ? req.body : [req.body]

    if (!ops.some((op) => SERVER_OPERATIONS.includes(op.operationName))) {
      req.continue()
      return
    }

    // Mutations are not batched, so they are answered directly with fixed content.
    const operation = ops[0]

    if (operation.operationName === 'ticketArticleTranslate') {
      req.reply({
        data: {
          ticketArticleTranslate: {
            __typename: 'TicketArticleTranslatePayload',
            article: {
              __typename: 'TicketArticle',
              id: operation.variables.articleId,
              translation: {
                __typename: 'ContentTranslation',
                content: TRANSLATED_CONTENT,
                backend: 'ai',
                translated: true,
              },
            },
            translation: { __typename: 'ContentTranslation', translated: true },
            analytics: {
              __typename: 'AIAnalyticsMetadata',
              run: { __typename: 'AIAnalyticsRun', id: '1' },
              usage: null,
            },
          },
        },
      })
      return
    }

    if (operation.operationName === 'ticketArticleTranslateMany') {
      req.reply({
        data: {
          ticketArticleTranslateMany: {
            __typename: 'TicketArticleTranslateManyPayload',
            pendingArticleIds: [],
            results: [],
          },
        },
      })
      return
    }

    if (operation.operationName === 'aiAnalyticsUsage') {
      req.reply({
        data: {
          aiAnalyticsUsage: { __typename: 'AIAnalyticsUsagePayload', usage: null },
        },
      })
      return
    }

    // Queries keep the real answer; only the feature's own state is rewritten in place.
    req.continue((res) => {
      const body = Array.isArray(res.body) ? res.body : [res.body]
      const out = ops.map((op, i) => {
        const entry = body[i] ?? {}

        if (op.operationName === 'ticketArticleTranslationTargetLocales') {
          return { data: { ticketArticleTranslationTargetLocales: LOCALES } }
        }

        if (op.operationName === 'applicationConfig') {
          const config = entry?.data?.applicationConfig
          if (Array.isArray(config)) {
            CONFIG_KEYS.forEach((key) => {
              const item = config.find((configItem) => configItem?.key === key)
              if (item) item.value = true
            })
          }
          return entry
        }

        if (op.operationName === 'currentUser') {
          const user = entry?.data?.currentUser
          if (user) user.hasContentTranslationAutoAvailable = true
          return entry
        }

        return entry
      })
      res.send(Array.isArray(res.body) ? out : out[0])
    })
  })
}

// The ticket's translation subscription is a real ActionCable one: the server answers it with the
// results that are already available, and the client waits for that answer before it asks for a
// translation. Without a translation service the stack stays silent, so every subscribe (the first
// one and each one after a reconnect or a change of the target language) is answered here.
const answerTranslationSubscription = () => {
  cy.on('window:before:load', (win) => {
    const OriginalWebSocket = win.WebSocket
    const OriginalMessageEvent = win.MessageEvent

    win.WebSocket = class extends OriginalWebSocket {
      send(data) {
        const sent = super.send(data)

        try {
          const frame = JSON.parse(data)

          if (
            frame.command === 'message' &&
            typeof frame.data === 'string' &&
            frame.data.includes('ticketArticleTranslationUpdates')
          ) {
            setTimeout(() => {
              this.dispatchEvent(
                new OriginalMessageEvent('message', {
                  data: JSON.stringify({
                    identifier: frame.identifier,
                    message: {
                      result: {
                        data: {
                          ticketArticleTranslationUpdates: {
                            article: null,
                            translation: null,
                            error: null,
                            analytics: null,
                            __typename: 'TicketArticleTranslationUpdatesPayload',
                          },
                        },
                      },
                      more: true,
                    },
                  }),
                }),
              )
            }, 500)
          }
        } catch {
          // Not a control frame we need to answer.
        }

        return sent
      }
    }
  })
}

const openTicket = () => {
  cy.visit('/desktop/tickets/2')
  cy.get('[data-test-id^="article-bubble-body-"]', { timeout: 20000 }).should('exist')
  cy.wait(3000) // loading
}

// Both header variants carry the language button, and the ticket view scrolls the article list, so
// only one of them is inside the frame - the off-screen one would anchor the menu off the top edge.
const languageButton = () =>
  cy
    .get('header [aria-label^="Translation to"]')
    .filter((index, element) => {
      const rect = element.getBoundingClientRect()
      const frameHeight = element.ownerDocument.defaultView.innerHeight

      return rect.top >= 0 && rect.bottom <= frameHeight
    })
    .first()

// Only the language menu carries a search field; a filter callback over every popover div would
// trip over the tooltips, which are popovers as well.
const languageMenu = () =>
  cy.get('div.popover[role="region"]:has(input[role="searchbox"])').first()

const selectLanguage = (name) => {
  languageButton().click({ force: true })
  languageMenu().should('be.visible')
  cy.contains('[role="option"]', name).click({ force: true })
  // The menu closes on a selection; picking one that is not active already keeps that a real change.
  cy.get('[role="option"]').should('not.exist')
}

// The stack's default target can be any language: switch away and back so the selection is a real
// change, and the shots below always show German.
const selectGerman = () => {
  selectLanguage('French (France)')
  selectLanguage('German (Germany)')
  languageButton().should('have.attr', 'aria-label', 'Translation to German (Germany)')
}

const articleBubble = () => cy.get('[data-test-id^="article-bubble-container-"]').first()

// The row of always-visible article actions (reply, translate, menu), centered on the bubble's edge.
const articleActionRow = () => articleBubble().children('[class*="translate-y-1/2"]')

// The author's avatar chip floats at the article's outer right edge. A crop that stops inside it
// leaves a cut-off circle at the frame's edge, so every element a shot must contain contributes its
// own padded rectangle.
const articleAvatar = () => articleBubble().children('a').first()

const paddedClip = (element) => element.clip({ padding: 10 })

const translateButton = () =>
  articleBubble()
    .find('button[aria-label="Translate article"]', { timeout: 20000 })
    .first()

const translateArticle = () => {
  translateButton().click({ force: true })
  cy.contains('ich benötige Hilfe bei meiner Bestellung', { timeout: 20000 }).should('be.visible')

  // The translated body still resizes for about a second after the swap (its height clamp is
  // recalculated). A screenshot measured during that shift captures a frame that has moved on
  // since - it shows part of the next article at the bottom.
  cy.wait(1500)
}

// The button is the way back to the original text, only its label differs (Show original while the
// translation is on).
const showOriginalButton = () => cy.get('button[aria-label="Show original"]', { timeout: 15000 }).first()

// A highlight overlay stays in the DOM for the rest of the run, so a shot taken after a highlighted
// one has to take it back out (it is the only element the highlight command adds to the body).
const clearHighlight = () => {
  cy.document().then((doc) => {
    Array.from(doc.body.children)
      .filter((element) => {
        const style = doc.defaultView.getComputedStyle(element)
        return style.zIndex === '10000' && style.borderImageSource.includes('gradient')
      })
      .forEach((element) => element.remove())
  })
}

// An article's action row is centered on the bubble's bottom edge, so its lower half - including the
// article action menu button - sits below the bubble, and the highlight frame around the translate
// button reaches even further down. The padded bottom edge keeps both complete in the shot. The next
// article's bubble starts 40px below the first one, so it stays out of the frame.
const ARTICLE_PADDING = [10, 10, 30, 10]

describe('Article translation screenshots', () => {
  it('Article translation target menu', () => {
    mockTranslationFeature()
    answerTranslationSubscription()
    cy.loginAs('ADMIN')
    openTicket()

    languageButton().click({ force: true })
    languageMenu().should('be.visible')
    cy.contains('Translate all articles').should('be.visible')

    // Button and menu belong together in the shot.
    languageMenu()
      .clip({ padding: 10 })
      .then((menuClip) => {
        languageButton()
          .clip({ padding: 10 })
          .then((buttonClip) => {
            cy.mergeClips(menuClip, buttonClip).then((clip) => {
              cy.screenshot('translation-target-menu', { clip })
            })
          })
      })
  })

  it('Translated article', () => {
    mockTranslationFeature()
    answerTranslationSubscription()
    cy.loginAs('ADMIN')
    openTicket()
    selectGerman()

    // The first shot shows the translate button in the article action row, the way into a single
    // article's translation. The author's avatar chip floats at the article's outer edge (a crop that
    // stops inside it would leave a cut-off circle at the frame's edge), so it contributes its own
    // padded rectangle.
    translateButton().should('be.visible').highlight({ padding: 5 })

    paddedClip(articleActionRow())
      .then((clip) => paddedClip(articleAvatar()).then((avatarClip) => cy.mergeClips(clip, avatarClip)))
      .then((clip) => cy.screenshot('translation-button', { clip }))

    clearHighlight()
    translateArticle()

    // Once the translation is on, the same button is the way back - only its label differs (Show
    // original while the translation is on).
    showOriginalButton().highlight({ padding: 5 })

    cy.get('[data-test-id^="article-bubble-body-"]')
      .first()
      .scrollIntoView()
      .screenshot('translation-article', { padding: ARTICLE_PADDING })
  })
})
