import {
  test,
  expect,
  loginAs,
  screenshot,
  box,
  union,
  button,
  highlight,
  discardDraft,
  openTicket,
} from '../../../support/screenshots.js'

// The operations of a GraphQL request: Apollo's BatchHttpLink sends queries as
// a list, mutations as a single object.
const operations = (request) => {
  const body = request.postDataJSON()
  return Array.isArray(body) ? body : [body]
}

test.describe('AI screenshots', () => {
  test('AI ticket summary', async ({ page }) => {
    await loginAs(page, 'ADMIN')
    await page.route('**/graphql', async (route) => {
      if (!operations(route.request()).some((op) => op?.operationName === 'ticketAIAssistanceSummarize')) {
        await route.continue()
        return
      }
      await route.fulfill({
        json: {
          data: {
            ticketAIAssistanceSummarize: {
              __typename: 'TicketAIAssistanceSummarizePayload',
              summary: {
                __typename: 'TicketAIAssistanceSummary',
                customerRequest: "The customer, John Doe, contacted support regarding a missing refund for a returned order (number 4388019). He stated he had already returned the goods but hadn't received the corresponding refund.",
                conversationSummary: 'John Doe initially inquired about the status of his refund for a returned order. The agent, Liam Chen, investigated and found the return receipt wasn\'t properly registered. The agent processed the refund and offered a 5% discount code for a future purchase. The customer confirmed receipt of the refund.',
                openQuestions: ['No open questions'],
                upcomingEvents: ['No upcoming events'],
                customerMood: 'Grateful',
                customerEmotion: '😌',
              },
              fingerprintMd5: '1234567890abcdef1234567890abcdef',
            },
          },
        },
      })
    })
    await openTicket(page, 2)
    await page.locator('[aria-label="AI summary"]').click()
    await highlight(page.locator('#content-sidebar'), { padding: -2 })
    await screenshot(page, 'ai-ticket-summary-sidebar')
  })

  test('AI knowledge base assistant', async ({ page }) => {
    const publishedAt = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const answer = (id, score, title, visibility) => ({
      __typename: 'TicketAIRelatedKnowledgeBaseAnswer',
      score,
      translation: {
        __typename: 'KnowledgeBaseAnswerTranslation',
        id,
        title,
        visibility,
        categoryTreeTranslation: { __typename: 'KnowledgeBaseCategoryTranslation', id, title: 'Products and orders' },
        content: { __typename: 'KnowledgeBaseAnswerContent', bodyExcerpt: '' },
        answer: {
          __typename: 'KnowledgeBaseAnswer',
          id,
          archivedAt: null,
          publishedAt,
          internalAt: null,
          tags: [],
          category: { __typename: 'KnowledgeBaseCategory', id, title: 'Products and orders', knowledgeBase: { __typename: 'KnowledgeBase', id: '1' } },
        },
        kbLocale: { __typename: 'KnowledgeBaseLocale', systemLocale: { __typename: 'SystemLocale', locale: 'en-us', name: 'English (United States)' } },
      },
    })
    const kbResult = {
      data: {
        ticketAIRelatedKnowledgeBaseAnswers: {
          __typename: 'TicketAIRelatedKnowledgeBaseAnswers',
          pending: false,
          answers: [
            answer('1', 0.91, 'Return and exchange policy', 'published'),
            answer('2', 0.86, 'How to track your order', 'draft'),
          ],
        },
      },
    }

    // The "Related knowledge" section needs vectordb_enabled, ai_provider and
    // ai_assistance_kb_answer_suggestions. The stack has no vector database:
    // force vectordb_enabled in the application config, and answer the
    // knowledge base query with the answers above. Every other operation, and
    // the rest of the config, comes from the real backend: login and the app
    // shell need it. Registered before the login, so that the first config
    // fetch is covered.
    await page.route('**/graphql', async (route) => {
      const ops = operations(route.request())
      const names = ops.map((op) => op?.operationName)
      if (!names.includes('ticketAIRelatedKnowledgeBaseAnswers') && !names.includes('applicationConfig')) {
        await route.continue()
        return
      }
      const response = await route.fetch()
      const body = await response.json()
      const answers = Array.isArray(body) ? body : [body]
      const out = ops.map((op, i) => {
        if (op?.operationName === 'ticketAIRelatedKnowledgeBaseAnswers') return kbResult
        const entry = answers[i] ?? {}
        const setting = entry?.data?.applicationConfig?.find?.((item) => item?.key === 'vectordb_enabled')
        if (setting) setting.value = true
        return entry
      })
      await route.fulfill({ response, json: Array.isArray(body) ? out : out[0] })
    })

    // The updates of the related answers come through an ActionCable
    // subscription. Without a vector database, the server sends an error,
    // which blocks the section: drop it from the incoming messages.
    await page.addInitScript(() => {
      const OriginalWebSocket = window.WebSocket
      function MockWebSocket(url, protocols) {
        const ws = new OriginalWebSocket(url, protocols)
        const addEventListener = ws.addEventListener.bind(ws)
        ws.addEventListener = (type, listener, options) => {
          if (type !== 'message') return addEventListener(type, listener, options)
          const wrapped = (event) => {
            try {
              const payload = JSON.parse(event.data)
              const message = payload?.message?.result?.data?.ticketAIRelatedKnowledgeBaseAnswersUpdates
              if (message && message.error) {
                message.error = null
                listener(new MessageEvent('message', { data: JSON.stringify(payload), origin: event.origin }))
                return
              }
            } catch {
              // Not JSON, or another message.
            }
            listener(event)
          }
          return addEventListener(type, wrapped, options)
        }
        return ws
      }
      MockWebSocket.prototype = OriginalWebSocket.prototype
      window.WebSocket = MockWebSocket
    })

    await loginAs(page, 'ADMIN')
    await page.goto('/desktop/tickets/2')
    const answers = page.locator('#ticket-ai-knowledge-base-answers')
    await expect(answers).toBeVisible()
    await expect(answers.getByText('How to track your order')).toBeVisible()
    await page.waitForTimeout(1000) // transition
    // With the "Related knowledge" header of the parent.
    await screenshot(page, 'ai-knowledge-base-assistant', await box(answers.locator('..'), 5))
  })

  test('AI writing assistant tools', async ({ page }) => {
    await loginAs(page, 'ADMIN')
    await openTicket(page, 3)
    // A click on "Reply" right after the ticket has loaded can leave the
    // reply form hidden (seen once in CI): click again until its editor shows.
    const editor = page.locator('#ticketArticleReplyForm [role="textbox"]')
    await expect(async () => {
      if (!(await editor.isVisible())) await button(page, 'Reply').click()
      await expect(editor).toBeVisible({ timeout: 5_000 })
    }).toPass({ timeout: 30_000 })
    await editor.click()
    await page.keyboard.type('Hi Evelyn,')
    await page.keyboard.press('Enter')
    await page.keyboard.press('Enter')
    await page.keyboard.type('your order has been shiped already.')
    await page.keyboard.press('ControlOrMeta+A')
    await page.waitForTimeout(1000)
    await page.locator('[aria-label="AI writing assistant tools"]').click()
    const popover = page.locator('div.editor-action-popover')
    await expect(popover).toBeVisible()
    await screenshot(
      page,
      'ai-writing-assistant-tools',
      await union(await box(popover, 5), await box(page.locator('[id="ticketArticleReplyForm"]'), 5)),
    )
    await discardDraft(page)
  })
})
