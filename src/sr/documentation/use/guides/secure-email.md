---
order: 3
title: 'Secure email'
---

# Secure email

Zammad подржава два система безбедне имејл комуникације:

- **PGP** (Pretty Good Privacy)
- **S/MIME** (Secure/Multipurpose Internet Mail Extensions)

Оба система вам омогућавају да размењујете **потписане** и **шифроване**
поруке са другима.

## Предуслови

- Both features are optional. If you don't see the `Encrypt` and `Sign`
  buttons in the email article editor, your administrator has not activated
  them yet.
- PGP и S/MIME раде само ако их користи и друга страна.
- Ваш администратор је одговоран за додавање свих потребних сертификата и
  кључева у административном панелу Zammad-а.

Ако су ови захтеви испуњени, функција би требало да ради одмах, и Zammad ће
шифровати, дешифровати, потписивати и проверавати потписе имејл порука
уколико је то могуће. Ваш администратор може да дефинише подразумевано
понашање за сваку групу. Међутим, можете сами да преиначите подразумевано
понашање за сваки одлазни имејл чланак укључивањем или искључивањем
шифровања и потписивања (погледајте пример на снимку екрана испод са
искљученим шифровањем и укљученим потписивањем). Наставите са читањем да
бисте сазнали више о уобичајеним грешкама.

![Screenshot showing outgoing email which just gets signed and not
encrypted](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-signing-only.png)

## Signing & encryption

Signing
: Signing is a proof that a message has not been manipulated on its way. It guarantees message **integrity** and
  **authenticity**.

Encryption
: Encryption scrambles a message so that it can only be unscrambled by the intended recipient. It guarantees message
  **privacy** and **data security**.

## Incoming email

Иконице катанца и штикле при врху поруке служе као индикатори статуса
шифровања и потписивања. Кликните на чланак долазне поруке да бисте
проширили њене детаље. Унутар детаља, пређите курсором преко безбедносног
статуса за више информација.

![Screenshot showing Encrypted and Signed status icons on an incoming email
article](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-incoming-article.png)

### Status icons for incoming emails

| Icon | Meaning |
|---|---|
| ![Encrypted icon](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-encrypted.png) | **Encrypted for you.** Even if intercepted by a third party, they will not be able to read it. |
| ![Not encrypted icon](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-not-encrypted.png) | **Cannot be decrypted.** Zammad lacks the required key to decrypt this message. |
| ![Signed icon](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-signed.png) | **Successfully verified.** You can be confident it is authentic and the content has not been modified. |
| ![Not signed icon](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-not-signed.png) | **Signature verification failed.** Hover over the icon for more information. |

## Outgoing email

Use the `Encrypt` and `Sign` buttons to turn on encryption and signing for
outgoing emails. They are available for new tickets and replies. Hover over
the buttons to show details.

![Screenshot showing the Encrypt and Sign toggle buttons in the email reply
editor](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-outgoing-article.png)

::: info
Outgoing emails can only be encrypted for a single recipient.
:::

### Status icons for outgoing emails

| Icon | Meaning |
|---|---|
| ![Encrypted icon](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-encrypted.png) | **Will be encrypted.** Even if intercepted by a third party, they will not be able to read it. |
| ![Not encrypted icon](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-not-encrypted.png) | **Will not be encrypted.** |
| ![Signed icon](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-signed.png) | **Will be signed.** Recipients can verify that it came from you and that the content has not been modified. |
| ![Not signed icon](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-not-signed.png) | **Will not be signed.** |

## Решавање проблема

### Потпис: Није могуће пронаћи сертификат за верификацију

![Screenshot showing Security error warning banner on an
article](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-error-banner.png)

Без сертификата пошиљаоца, Zammad не може проверити потпис поруке. Замолите
свог администратора да дода сертификат пошиљаоца у Zammad-ово складиште
сертификата.

::: warning
Always verify certificates in-person or over the phone! The whole point of signature verification is to alert you when
someone is trying to pretend to be someone they are not. Never accept a certificate from someone online without
verifying it first.
:::

### Шифровање: Није могуће пронаћи приватни кључ за дешифровање

This message was encrypted with a certificate that does not match any on
file.  Without a matching private key, Zammad cannot decrypt the message.
Ask your administrator to verify your organization's private key in Zammad's
certificate store, and ask the sender to double-check the public key they
used to encrypt the message.

### The `Encrypt` button is disabled

Замолите свог администратора да дода сертификат примаоца у Zammad-ово
складиште сертификата.

### The `Sign` button is disabled

Замолите свог администратора да потврди приватни кључ ваше организације у
Zammad-овом складишту сертификата.

### Multiple security types configured

You might see both `PGP` and `S/MIME` buttons. This happens when both
systems are configured in your system and a customer is using both as
well. In this case, you have an additional button to switch between PGP and
S/MIME security types. Just pick one, make sure encryption and signing is
enabled and send your email.
