---
order: 3
title: Editor
---

# Editor

Der Zammad-Editor bietet eine umfangreiche Textbearbeitung für die
Erstellung von Artikeln. Er sollte selbsterklärend und einfach zu bedienen
sein. Wegen der Bedeutung dieses zentralen Elements in Zammad werden auf
dieser Seite einige Funktionen behandelt, die vielleicht nicht auf den
ersten Blick sichtbar sind.

![Screenshot zeigt Zammads
Editor](/screenshots/cypress/usage-guide-editor.cy.js/editor-overview.png)

## Spezialfunktionen

Der Editor von Zammad enthält einige intelligente Funktionen. Sie finden
diese auf der linken Seite der Symbolleiste des Editors. Da sie bereits an
anderer Stelle beschrieben sind, verweisen wir hier nur darauf, um doppelten
Inhalt zu vermeiden.

- [KI-Assistent Text-Werkzeuge](ai#ki-assistent-text-werkzeuge)
- [Benutzer erwähnen](../advanced-features#erwahnen-von-kollegen)
- [Textbausteine einfügen](../advanced-features#textbausteine)
- [Knowledge Base-Artikel
  einfügen](../advanced-features#knowledge-base-artikel-einfugen)

## Einfügen komplexer Inhalte

Beim Einfügen von Inhalten aus anderen Quellen, insbesondere von Dokumenten,
die Tabellen, komplexe Formatierungen oder Bilder enthalten, ist zu
beachten, dass die Darstellung in Zammad abweichen kann. Der Editor
versucht, Ihre Formatierung nach Möglichkeit beizubehalten, aber es kann zu
Unstimmigkeiten kommen. Wenn Sie mit einer solchen Situation konfrontiert
werden, versuchen Sie, den Inhalt einzeln zu kopieren/einzufügen oder fügen
Sie reinen Text ein und wenden Sie die Formatierung im Editor an (siehe
Abschnitt [Formatierung](#formatierung-anwenden) unten).

## Absätze

Um Absätze im Editor zu trennen, drücken Sie **einmal** die
[[enter]]-Taste. Dies wird je nach verwendeter Software des Empfängers
entweder mit oder ohne Leerzeilen als Absätze dargestellt. Wenn Sie eine
zusätzliche Leerzeile einfügen, kann dies auf der Client-Seite als zwei
Leerzeilen dargestellt werden.

## Text zitieren

Möglicherweise möchten Sie einen Text Ihres Kunden zitieren, um Ihre Antwort
genau darauf zu beziehen, und damit Ihre Kunden langen Konversationen nicht
den Überblick verlieren. Um diese Funktion zu nutzen, markieren Sie einfach
den Text, den Sie zitieren möchten, und klicken Sie auf die Schaltfläche
`Antworten` oder `Weiterleiten` neben dem Artikel. Wenn Sie bereits Text
eingefügt haben, bleibt dieser erhalten und der ausgewählte Text wird
zusätzlich eingefügt. Das bedeutet, dass Sie diesen Vorgang wiederholen
können, um verschiedene Abschnitte zu zitieren, ohne dass Ihr geschriebener
Text verloren geht.

## Formatierung anwenden

Sie können den Text im Editor auf verschiedene Arten formatieren:

- Verwenden Sie die integrierte Werkzeugleiste
- Verwenden Sie Tastaturkürzel
- Verwenden Sie [Markdown](https://www.markdownguide.org)-Syntax

The editor **toolbar** includes buttons for common formatting
tasks. Hovering over each button will display a tooltip explaining its
function. As an alternative you can use **keyboard shortcuts** (see next two
sections). Either activate the formatting in advance or select the text
after writing and use the formatting you want to apply.

### Allgemeine Tastaturkürzel

Der Editor unterstützt auch Tastaturkürzel, um Ihren Arbeitsablauf zu
optimieren. Diese Tastenkombinationen sind bei vielen
Textverarbeitungsprogrammen üblich. Wichtige Tastenkombinationen sind:

 Kürzel/Befehl          | Formatierung
------------------------|----------------------
[[strg]] + [[b]]        | **Fett**
[[strg]] + [[i]]        | _Kursiv_
[[strg]] + [[u]]        | <u>Unterstrichen</u>

Have a look at the keyboard shortcuts in Zammad where you can find all
shortcuts. Open it via the [avatar
menu](/en/documentation/use/user-profile#avatar-menu) in the bottom left
corner or type [[?]].

Have a look at the next section to use even more formatting via
keyboard. Regardless if you are used to write Markdown or not, some of them
might still be helpful in your daily work.

### Markdown-Verwendung

For users familiar with Markdown syntax, the editor provides basic support
for formatting content with Markdown. When using Markdown syntax, it gets
immediately applied immediately or after the closing limiter so you can see
the result directly in the editor. To go back to standard text, simply use
the same limiter again or use [[enter]], depending on the option.

Es ist nicht beabsichtigt, alle Markdown-Funktionen zu unterstützen, sondern
den Benutzern zu helfen, Dinge einfacher zu erledigen. Daher werden die
wichtigsten Dinge wie Überschriften, Listen, Links, Codeblöcke und mehr
unterstützt. Werfen Sie einen Blick auf die nicht abschließende Liste an
Formatierungsbeispielen unten.

Markdown Syntax                | Formatierung
-------------------------------|---------------
`**`                           | Begrenzer für **fett**
`_`                            | Begrenzer für _kursiv_
`#`, `##`, `###`               | Überschrift, Level abhängig von Anzahl der `#`
`>`                            | Zitat
`` ` ``                        | Begrenzer für `inline code`
`` ``` ``                      | Code-Block
`---`                          | Horizontale Linie als Trenner
