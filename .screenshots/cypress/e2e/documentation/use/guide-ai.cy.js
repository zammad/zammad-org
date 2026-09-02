describe('AI screenshots', () => {
  it('AI ticket summary', () => {
    cy.loginAs('ADMIN')
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'ticketAIAssistanceSummarize') {
        req.reply({
          data: {
            ticketAIAssistanceSummarize: {
              __typename: 'TicketAIAssistanceSummarizePayload',
              summary: {
                __typename: 'TicketAIAssistanceSummary',
                customerRequest: "The customer, John Doe, contacted support regarding a missing refund for a returned order (number 4388019). He stated he had already returned the goods but hadn't received the corresponding refund.",
                conversationSummary: "John Doe initially inquired about the status of his refund for a returned order. The agent, Liam Chen, investigated and found the return receipt wasn't properly registered. The agent processed the refund and offered a 5% discount code for a future purchase. The customer confirmed receipt of the refund.",
                openQuestions: ['No open questions'],
                upcomingEvents: ['No upcoming events'],
                customerMood: 'Grateful',
                customerEmotion: '😌',
              },
              fingerprintMd5: '1234567890abcdef1234567890abcdef',
            },
          },
        })
      } else {
        req.reply()
      }
    })
    cy.visit('/desktop/tickets/2')
    cy.wait(3000) // loading
    cy.get('[aria-label="AI summary"]').click()
    cy.get('#content-sidebar').highlight({ padding: -2 })
    cy.screenshot('ai-ticket-summary-sidebar')
  })

  it('AI knowledge base assistant', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })

    // --- Mock the synchronous query -------------------------------------------------
    // BatchHttpLink (batchMax: 3, batchInterval: 20) wraps queries in a JSON array,
    // so req.body is [{operationName, variables, query}, ...].  Mutations (like the
    // summary above) bypass batching and arrive as a plain object.
    const publishedAt = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const kbResult = {
      data: {
        ticketAIRelatedKnowledgeBaseAnswers: {
          __typename: 'TicketAIRelatedKnowledgeBaseAnswers',
          pending: false,
          answers: [
            {
              __typename: 'TicketAIRelatedKnowledgeBaseAnswer',
              score: 0.91,
              translation: {
                __typename: 'KnowledgeBaseAnswerTranslation',
                id: '1',
                title: 'Return and exchange policy',
                visibility: 'published',
                categoryTreeTranslation: { __typename: 'KnowledgeBaseCategoryTranslation', id: '1', title: 'Products and orders' },
                content: { __typename: 'KnowledgeBaseAnswerContent', bodyExcerpt: '' },
                answer: { __typename: 'KnowledgeBaseAnswer', id: '1', archivedAt: null, publishedAt, internalAt: null, tags: [], category: { __typename: 'KnowledgeBaseCategory', id: '1', title: 'Products and orders', knowledgeBase: { __typename: 'KnowledgeBase', id: '1' } } },
                kbLocale: { __typename: 'KnowledgeBaseLocale', systemLocale: { __typename: 'SystemLocale', locale: 'en-us', name: 'English (United States)' } },
              },
            },
            {
              __typename: 'TicketAIRelatedKnowledgeBaseAnswer',
              score: 0.86,
              translation: {
                __typename: 'KnowledgeBaseAnswerTranslation',
                id: '2',
                title: 'How to track your order',
                visibility: 'draft',
                categoryTreeTranslation: { __typename: 'KnowledgeBaseCategoryTranslation', id: '2', title: 'Products and orders' },
                content: { __typename: 'KnowledgeBaseAnswerContent', bodyExcerpt: '' },
                answer: { __typename: 'KnowledgeBaseAnswer', id: '2', archivedAt: null, publishedAt, internalAt: null, tags: [], category: { __typename: 'KnowledgeBaseCategory', id: '2', title: 'Products and orders', knowledgeBase: { __typename: 'KnowledgeBase', id: '1' } } },
                kbLocale: { __typename: 'KnowledgeBaseLocale', systemLocale: { __typename: 'SystemLocale', locale: 'en-us', name: 'English (United States)' } },
              },
            },
          ],
        },
      },
    }

    // Mock the KB query AND flip vectordb_enabled in the application config.
    // Core gates the "Related knowledge" section on vectordb_enabled &&
    // ai_provider && ai_assistance_kb_answer_suggestions
    // (useAiSuggestedAnswersAvailability), so the config response gets
    // vectordb_enabled forced to true. Every request is forwarded to the real
    // backend first: stubbing the whole applicationConfig response breaks
    // login and the app shell, which need their real config. The per-operation
    // response entries are then rewritten (Apollo returns batch entries in
    // request order), so applicationConfig is handled independently of the KB
    // query, including when BatchHttpLink puts both in the same batch.
    // Registered BEFORE login so the app's initial config fetch is covered.
    // Single intercept for all /graphql POSTs — a later intercept with the
    // same route would take priority and shadow this one (Cypress routes
    // requests to the most recently registered matching intercept).
    // Force a clean browser state first: the previous test leaves a valid
    // session behind, and when this test then visits /desktop the app can
    // resume it and redirect to a ticket view before Cypress gets around to
    // clearing storage (observed flakily under headless Electron, where the
    // added intercept latency widens the race window).
    cy.visit('/desktop/logout')
    cy.url({ timeout: 20000 }).should('match', /\/desktop\/login$/)
    cy.window().then((win) => {
      // Wait for every IndexedDB deletion to complete; reject on errors or
      // blocked requests so a stuck deletion fails the test instead of
      // leaving stale state behind silently.
      return win.indexedDB.databases().then((dbs) =>
        Promise.all(
          dbs
            .filter((db) => db && db.name)
            .map(
              (db) =>
                new Promise((resolve, reject) => {
                  const req = win.indexedDB.deleteDatabase(db.name)
                  req.onsuccess = () => resolve(null)
                  req.onerror = () => reject(req.error)
                  req.onblocked = () =>
                    reject(new Error(`IndexedDB deletion of "${db.name}" is blocked`))
                }),
            ),
        ),
      )
    })
    cy.intercept('POST', '/graphql', (req) => {
      const ops = Array.isArray(req.body) ? req.body : [req.body]

      const hasKb = ops.some((op) => op.operationName === 'ticketAIRelatedKnowledgeBaseAnswers')
      const hasConfig = ops.some((op) => op.operationName === 'applicationConfig')
      if (!hasKb && !hasConfig) {
        // Anything else: forward to the real backend.
        req.continue()
        return
      }

      req.continue((res) => {
        const body = Array.isArray(res.body) ? res.body : [res.body]
        const out = ops.map((op, i) => {
          if (op.operationName === 'ticketAIRelatedKnowledgeBaseAnswers') {
            return kbResult
          }
          const entry = body[i] ?? {}
          const cfg = entry?.data?.applicationConfig
          if (Array.isArray(cfg)) {
            const key = cfg.find((item) => item?.key === 'vectordb_enabled')
            if (key) key.value = true
          }
          return entry
        })
        res.send(Array.isArray(res.body) ? out : out[0])
      })
    })

    cy.loginAs('ADMIN')

    // --- Mock the ActionCable subscription ------------------------------------------
    // The ticketAIRelatedKnowledgeBaseAnswersUpdates subscription is delivered via
    // ActionCable WebSocket (not HTTP POST).  The screenshots stack has no real
    // vector DB, so the server sends {error: "…"} which blocks the UI.  Intercept
    // incoming WebSocket messages and null-out the error field.
    cy.on('window:before:load', (win) => {
      const OrigWebSocket = win.WebSocket
      function MockWebSocket(url, protocols) {
        const ws = new OrigWebSocket(url, protocols)
        const origAddEventListener = ws.addEventListener.bind(ws)
        ws.addEventListener = function (type, listener, options) {
          if (type === 'message') {
            const wrapped = function (event) {
              try {
                const payload = JSON.parse(event.data)
                const msg = payload?.message?.result?.data?.ticketAIRelatedKnowledgeBaseAnswersUpdates
                if (msg && msg.error) {
                  msg.error = null
                  listener(new MessageEvent('message', { data: JSON.stringify(payload), origin: event.origin }))
                  return
                }
              } catch (_) { /* not JSON or different shape — pass through */ }
              listener(event)
            }
            return origAddEventListener(type, wrapped, options)
          }
          return origAddEventListener(type, listener, options)
        }
        return ws
      }
      MockWebSocket.prototype = OrigWebSocket.prototype
      win.WebSocket = MockWebSocket
    })

    cy.visit('/desktop/tickets/2')
    cy.wait(3000) // loading
    cy.get('#ticket-ai-knowledge-base-answers').should('be.visible')
    cy.wait(1000)
    // Clip to the parent wrapper so the "Related knowledge" header is included.
    cy.get('#ticket-ai-knowledge-base-answers').parent().clip({ padding: 5 }).then((clip) => {
      cy.screenshot('ai-knowledge-base-assistant', { clip })
    })
  })

  it('AI writing assistant tools', () => {
    cy.loginAs('ADMIN')
    cy.visit('/desktop/tickets/3')
    cy.wait(3000) // loading
    cy.get('button').contains('Reply').click().wait(500)
    cy.get('[role="textbox"]').should('be.visible').click().type('Hi Evelyn,{enter}{enter}your order has been shiped already.{selectAll}')
    cy.get('[aria-label="AI writing assistant tools"]').click().wait(1000)
    cy.get('div.editor-action-popover').should('be.visible').clip({ padding: 5 }).then((PopoverClip) => {
      cy.get('[id="ticketArticleReplyForm"]').should('be.visible').clip({ padding: 5 }).then((EditorClip) => {
        cy.mergeClips(PopoverClip, EditorClip).then((clip) => {
          cy.screenshot('ai-writing-assistant-tools', { clip })
        })
      })
    })
    cy.get('button').contains('Discard your unsaved changes').click() //removing draft to clean up
    cy.get('button').contains('Discard changes').click() //removing draft to clean up
  })
})
