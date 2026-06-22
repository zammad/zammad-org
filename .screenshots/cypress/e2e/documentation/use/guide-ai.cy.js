describe('AI screenshots', () => {
  it('AI ticket summary', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
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

  it('AI writing assistant tools', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
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
