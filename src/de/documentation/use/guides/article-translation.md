---
order: 7
title: Artikel-Übersetzung
---

# Artikel-Übersetzung

Agenten können Ticket-Artikel in ihre bevorzugte Sprache übersetzen. Diese
Funktion ist optional und muss von Ihrem Administrator konfiguriert und
aktiviert werden.

Je nach Konfiguration können Sie entweder einzelne Artikel selbst übersetzen
lassen oder Zammad jeden Artikel in den von Ihnen betrachteten Tickets
übersetzen lassen. Sie können jederzeit wieder zum Originalinhalt
zurückkehren.

Eine Übersetzung ersetzt den Inhalt des Originalartikels und ein Hinweis
unterhalb des Artikels weist Sie darauf hin, dass Sie eine Übersetzung
sehen. Zammad behält die Formatierung des Originaltextes soweit wie möglich
bei, doch gelegentlich kann Formatierung verloren gehen, wenn sich der
Satzaufbau stark ändert.

Unter einem übersetzten Artikel zeigt Zammad in der Aktionsleiste des
Artikels eine Übersetzungs-Schaltfläche an, deren Symbol blau wird, während
Sie die Übersetzung lesen. Mit dieser Schaltfläche können Sie zwischen der
Übersetzung und dem Originalinhalt wechseln.

![Screenshot zeigt einen übersetzten
Ticket-Artikel](/screenshots/cypress/documentation/use/guide-translation.cy.js/translation-article.png)

::: info
Die [Hervorhebungsfunktion](../advanced-features#highlight-text) ist nur in der Originalversion verfügbar. Schalten Sie
 wieder auf den Originalinhalt um, wenn Sie etwas im Artikel hervorheben möchten.
:::

## Wählen Sie Ihre Sprache

Die Sprachschaltfläche in der oberen Leiste des Tickets zeigt den Sprachcode
Ihrer Zielsprache für Übersetzungen an, zum Beispiel `EN-US`, sowie den
vollständigen Namen der Sprache in einem Tooltip, wenn Sie mit der Maus
darüberfahren. Klicken Sie auf die Schaltfläche, um das Sprachmenü zu öffnen
und die Sprachen zu sehen, die der konfigurierte Übersetzungsdienst
unterstützt. Verwenden Sie das Suchfeld, wenn Sie nach einer bestimmten
Sprache suchen.

![Screenshot zeigt Sprachmenü mit der Sprachenliste und der Option zur
Übersetzung aller
Artikel](/screenshots/cypress/documentation/use/guide-translation.cy.js/translation-target-menu.png)

Zammad verwendet standardmäßig die Sprache, die Sie in Ihren persönlichen
Benutzereinstellungen festgelegt haben. Falls der Übersetzungsdienst diese
Sprache nicht unterstützt, wird die Systemstandardsprache von Zammad oder -
falls auch diese nicht unterstützt wird - Englisch verwendet.

Ihre Zielsprache für die Übersetzung ist eine persönliche Einstellung:
Zammad speichert diese für Ihr Benutzerkonto und wendet sie auf jedes von
Ihnen eröffnete Ticket an, einschließlich der Tickets in anderen
Browser-Tabs.

Die Zielsprache der Übersetzung ist unabhängig von der Sprache der
Zammad-Benutzeroberfläche, die Sie in Ihren [persönlichen
Einstellungen](../user-profile) festlegen.

## Einen einzelnen Artikel übersetzen

Klicken Sie auf die Übersetzen-Schaltfläche in der Aktionszeile des
Artikels, um diesen Artikel in die gewünschte Zielsprache zu
übersetzen. Klicken Sie erneut darauf, um zum Originaltext zurückzukehren.

![Screenshot zeigt einen Artikel, bei dem die Schaltfläche "Übersetzen" in
der Aktionsleiste zu sehen ist und hervorgehoben
ist](/screenshots/cypress/documentation/use/guide-translation.cy.js/translation-button.png)

Sollte die Zielsprache nicht der Sprache entsprechen, in der Sie den Artikel
lesen möchten, ändern Sie diese bitte wie oben beschrieben in der oberen
Leiste des Tickets.

## Jeden Artikel automatisch übersetzen

Falls Ihr Administrator die automatische Übersetzung für Ihre Rolle
aktiviert hat, enthält das Sprachmenü in der oberen Leiste des Tickets auch
einen Schalter **Alle Artikel übersetzen** (siehe Screenshot unter **Sprache
auswählen**). Während er aktiviert ist, übersetzt Zammad die Artikel aller
Tickets, die Sie öffnen, sodass Sie sie nicht einzeln übersetzen
müssen. Artikel, die bereits in Ihrer Zielsprache vorliegen, behalten ihren
Originaltext; dies erfordert, dass die Artikel-Spracherkennung von Ihrem
Administrator aktiviert wurde.

Deaktivieren Sie den Schalter, wenn Sie lieber einzelne Artikel übersetzen
möchten. Genau wie bei Ihrer Zielsprache gilt diese Einstellung für jedes
Ticket, das Sie aufrufen.

Wenn Sie einen einzelnen Artikel erneut in seiner Originalsprache lesen
möchten, während der Schalter generell aktiviert bleibt, verwenden Sie die
**Original anzeigen** Schaltfläche.

## Qualität und Feedback zur Übersetzung

Die Übersetzungen werden automatisch generiert; überprüfen Sie deshalb bitte
das Ergebnis sorgfältig.

Verwenden Sie die "Daumen hoch" und "Daumen runter" Schaltflächen unter
einem übersetzten Artikel, um Ihrem Administrator bei der Bewertung des
Übersetzungsdienstes zu helfen; wenn Sie auf "Daumen runter" klicken öffnet
sich ein Feld, in dem Sie das Problem erläutern können. Sollten Sie mit
einer Übersetzung nicht zufrieden sein können Sie die
Aktualisierungs-Schaltfläche in derselben Zeile verwenden (Tooltip
**Neuerstellung**), um den Artikel erneut übersetzen zu lassen.
