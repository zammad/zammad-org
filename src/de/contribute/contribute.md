---
order: 1
---

# Beitragen

Wir freuen uns, wenn Sie zu Zammad beitragen! Sie können dies auf
verschiedene Arten tun. Sie können beitragen, indem Sie eines unserer Repos
auf GitHub forken und einen Pull Request mit Ihren Änderungen erstellen
(außer für Übersetzungen, siehe unten). 🚀

Sie können dazu beitragen:
 * [Quellcode]contribute#zammad-source-code)
 * [Dokumentation](contribute#documentation)
 * [Übersetzung](contribute#translation)

Bitte sehen Sie sich unsere Hinweise für Beiträge an.

All repos can be found on
[Github](https://github.com/zammad){target=_blank}.


## Zammad Quellcode

The Zammad source code can be found on GitHub in the [Zammad
repository](https://github.com/zammad/zammad){target=_blank}.

Have a look at the [developer
manual](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank}
to get started.

### Unterstützte Branches / Versionen

The main [Zammad
repository](https://github.com/zammad/zammad){target=_blank} at Github has
several branches.

#### `develop`

* Dies ist der aktuelle (unveröffentlichte) Entwicklungsstand der nächsten
  Hauptversion (dieser wird zum neuen `stable`-Branch).
* Verwenden Sie das nicht für den Produktiv-Betrieb!
* Supported with bug and security fixes - see also our [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}.

#### `stable`

* Dies ist die aktuelle stabile Version, z.B. Zammad 5.2.
* Verwenden Sie diese für den Produktiv-Betrieb.
* Supported with bug and security fixes - see also our [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}.

#### `stable-x.y`

* Dies sind Branches von alten Versionen von Zammad wie `stable-5.1` für
  Zammad 5.1.
* Keine Unterstützung durch Fehler- oder Sicherheitskorrekturen.

## Dokumentation

Möchten Sie zur Zammad-Dokumentation beitragen?

Open a new GitHub pull request at https://github.com/zammad/zammad-org with
your changes and make sure to follow the prerequisites and instructions in
the repo's README.

The documentation you are reading is available on next.zammad.org and
zammad.org and is built via Vitepress. The source files are written in
Markdown.  Make sure to change the English source files only which are
placed under `/src/en/`. The translation is done via Weblate and will
overwrite any changes in the language specific folders (except `/src/eng/`).

## Übersetzung

Wenn Sie uns bei der Übersetzung helfen und die mehrsprachige Unterstützung
von Zammad und/oder der Dokumentation verbessern wollen, sind Sie ebenfalls
willkommen! Die Übersetzung von Zammad selbst und der Dokumentation erfolgt
mit Hilfe von Weblate, einem Dienst für die gemeinschaftliche Übersetzung
von Projekten.

You just have to head over to Zammad's [Weblate
instance](https://translations.zammad.org/){target=_blank}.  You can either
create an account (if you don't have one already) or even sign in with your
Github account!

We will cover some basic steps in the following sections to get you started
with translating. However, if you want to use some additional features of
Weblate and want to dive deeper into it, their [translation
documentation](https://docs.weblate.org/en/latest/user/translating.htm){target=_blank}
is a good starting point.

### Grundlagen

The translation of **Zammad** and the translation of the **documentation**
are split into different projects in Weblate. When you click in the top menu under
"*Projects > Browse all projects*", you can find the overview of the
projects:

![Screenshot mit Übersetzungsprojekten in Weblate und
Menü](/screenshots/weblate-overview-docs.png)

Struktur von Übersetzungsprojekten in Weblate:

 * Dokumentation
    * New Documentation at next.zammad.org
 * Zammad
    * Zammad (`develop`, Entwicklungsversion)
    * Zammad (`stable` Version)
    * *Einige weitere, die hier nicht relevant sind*

::: tip

It should be no big difference which branch you choose to translate. When Weblate
detects the same strings in different branches, they will be used for all
branches and only have to be translated once. If in doubt, choose the `develop`
version.
:::

Nachdem Sie ein Projekt (Dokumentation oder Zammad) ausgewählt haben, sehen
Sie verschiedene Unterprojekte und deren Übersetzungsstatus für alle
Sprachen in einer Übersicht.  Diese Übersichten können eine recht niedrige
Übersetzungsrate zeigen, was auf die Menge der aktiven Sprachen
zurückzuführen ist.

Hier können Sie eine der "Komponenten" auswählen, was mehr oder weniger dasselbe ist wie
verschiedenen Versionen. Nachdem Sie eine der Komponenten ausgewählt haben, können Sie den Status der
Übersetzung für die verschiedenen Sprachen sehen, wie im
folgenden Screenshot mit einem Beispiel aus *Dokumentation > Benutzer
Dokumentation (latest)*:

![Screenshot zeigt Übersetzungsstand der verschiedenen Sprachen für die
Benutzer Dokumentation ](/screenshots/weblate-translations-user-docs.png)

### Übersetzen

Nachdem Sie die Sprache ausgewählt haben, in die Sie übersetzen möchten,
sollten Sie zunächst "*Nicht übersetzt*" auswählen (oder die gleiche
Bedeutung in Ihrer Sprache, je nachdem, was Sie in Ihrem Profil eingestellt
haben).

Danach sehen Sie die erste unübersetzte Zeichenkette im oberen Feld und
können theoretisch mit dem Übersetzen beginnen. Zunächst eine kurze
Übersicht über die Benutzeroberfläche von Weblate:

![Screenshot des Weblate User-Interface](/screenshots/weblate-ui.png)

1. **Pfad** zum aktuellen Projekt und zur aktuellen Sprache
2. **Übersetzungsbereich** selbst. Sie finden die Zeichenkette der Quelle
   (*"English (United States) "*) ganz oben und das Feld für Ihre
   Übersetzung (*"French "* in diesem Beispiel).
3. **Glossar**: Hier finden Sie gängige Übersetzungen im Zammad-Kontext. Die
   Begriffe aus dem Glossar sind auch in den Zeichenketten der Quelle
   hervorgehoben.
4. **Weitere nützliche Tabs**:
    * **Benachbarte Zeichenketten**: zeigt Ihnen den Kontext des Wortes oder
      der Zeichenkette an
    * **Automatische Vorschläge**: hier finden Sie automatische Vorschläge
      von DeepL und Vorschläge von ähnlichen Zeichenketten, die bereits
      übersetzt sind.  Verwenden Sie die Schaltfläche "*In Übersetzung
      kopieren*", um sie in das Übersetzungsfeld einzufügen und die
      Änderungen zu übernehmen. Verwenden Sie die Schaltfläche "*Annehmen*",
      um die vorgeschlagene Übersetzung zu akzeptieren und automatisch zur
      nächsten Zeichenkette zu wechseln.
    * **Andere Sprachen**: Hier können Sie sich eine Übersicht verschaffen,
      welche Sprachen übersetzt wurden, und Sie können auch die übersetzten
      Zeichenketten sehen (könnte für Sprachen nützlich sein, die ähnlich
      sind).

### Fehlerbehebung

And finally some notes for "special" source strings, you might see in the
documentation projects:

- **\`example-string\`**

    This is rendered as `example-string`. Depending on the context, it can be
    translated or not. In any case, use the \` before and after the string in
    your translation.

- **\[example\](/en/path/to/document-or-website\)**

    This is a link to another page, including the language code.
    The above "example" is the text, which is shown as link text. This part can
    be translated. For the path, only the `en` may be replaced by the
    language code you are translating in. Make sure that your language is
    already present on zammad.org (check it by using the language switcher).
    Otherwise contact us if you want to have your language activated (and a
    substantial amount of the strings are already translated).

- **\*\*Beispiel Text\*\***

    Markierung für Text (z. B. fett, kursiv). Alternativ: \*Beispiel Text\*.
    Diese Zeichenketten können übersetzt werden, aber die Markup-Kennzeichnung
    (z.B. ein oder mehrere \*) sollte sinngemäß übernommen werden.


