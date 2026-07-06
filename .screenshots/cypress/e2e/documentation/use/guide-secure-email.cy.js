describe("Secure Email", function () {
  beforeEach(function () {
    cy.env(["ADMIN_LOGIN", "ADMIN_PASS"]).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS);
    });
  });
  
    // ------------------------------------------------------------------
    // Incoming decrypted and verified email
    // ------------------------------------------------------------------
  
  it("encryption and signing icons", function () {
    cy.visit("/desktop/tickets/7");
    cy.get("main").should("exist");
    cy.wait(2000);
    cy.get('svg[aria-label="Encrypted"]').should("be.visible").wait(1500).screenshot("secure-email-encrypted", { padding: 5 })

    cy.get('svg[aria-label="Signed"]').should("be.visible").wait(1500).screenshot("secure-email-signed", { padding: 5 });

    cy.get('[data-test-id^="article-bubble-body-"]').first().click();
    cy.wait(2500);
    cy.contains("PGP").parent().highlight({ padding: 5 });
    cy.get('[data-test-id^="article-bubble-container-"]').first().screenshot("secure-email-incoming-article", { padding: [10, 10, 15] });
  });

  it("outgoing email signing only", function () {
    cy.visit("/desktop/tickets/7");
    cy.get("main").should("exist");
    cy.wait(2000);
    cy.touchDeviceEmulation(true);
    cy.get('[aria-label="Action menu button"]').first().click({ force: true });
    cy.wait(500);
    cy.get("button").contains("Reply").click();
    cy.wait(500);
    cy.get("[contenteditable='true']", { timeout: 8000 }).should("be.visible");
    cy.get("[contenteditable='true']").focus().type("This reply just gets signed.");
    cy.wait(500)
    cy.get('button').contains('Encrypt').click().wait(200) //icon-encryption-enabled
    cy.wait(500);
    cy.get("[contenteditable='true']").click()
    cy.get('[id^="ticketArticleReplyForm"]').screenshot("secure-email-signing-only", { padding: [10, 10, 15] });
    cy.wait(500);
    cy.touchDeviceEmulation(false);
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard changes').click()
  });

  // ------------------------------------------------------------------
  // Editor: Encrypt / Sign buttons on a new outgoing email draft
  // ------------------------------------------------------------------

  it("outgoing email with encryption and signing", function () {
    cy.visit("/desktop/tickets/7");
    cy.get("main").should("exist");
    cy.wait(2000);
    cy.touchDeviceEmulation(true);
    cy.get('[aria-label="Action menu button"]').first().click({ force: true });
    cy.wait(500);
    cy.get("button").contains("Reply").click();
    cy.wait(1500);
    cy.get("[contenteditable='true']", { timeout: 8000 }).should("be.visible");
    cy.get("[contenteditable='true']").focus().type("This is a reply for an encrypted and signed email.");
    cy.wait(1200);
    cy.get('[id^="ticketArticleReplyForm"]').find('[role="listbox"]').should("be.visible").highlight({ padding: 8 });
    cy.get('[id^="ticketArticleReplyForm"]').screenshot("secure-email-outgoing-article", { padding: [10, 10, 15] });
    cy.get('[aria-label="Action menu button"]').first().click({ force: true });
    cy.wait(500);
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard changes').click()
    cy.touchDeviceEmulation(false);
  });

  // ------------------------------------------------------------------
  // Error states: warning banner and individual fail icons
  // ------------------------------------------------------------------

  it("security error indicators on ticket articles", function () {
    cy.visit("/desktop/tickets/7");
    cy.get("main").should("exist");
    cy.wait(2000);
    cy.contains("h2", "Security error").parents('[data-test-id^="article-bubble-container-"]').should("be.visible").screenshot("secure-email-error-banner", { padding: [10, 10, 15] });

    cy.contains("h2", "Security error")
      .parents('[data-test-id^="article-bubble-container-"]')
      .find('[data-test-id^="article-bubble-body-"]')
      .click();
    cy.wait(500);

    cy.get("svg.icon-encryption-fail")
      .should("be.visible")
      .clip({ padding: 3 })
      .then((clip) => {
        cy.screenshot("secure-email-not-encrypted", { clip });
      });

    cy.get("svg.icon-signing-fail")
      .should("be.visible")
      .clip({ padding: 3 })
      .then((clip) => {
        cy.screenshot("secure-email-not-signed", { clip });
      });
  });
});
