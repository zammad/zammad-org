---
order: 1
---

# Beitragen

Wir freuen uns, wenn Sie zu Zammad beitragen! Sie können dies auf
verschiedene Arten tun. Sie können beitragen, indem Sie eines unserer Repos
auf GitHub forken und einen Pull Request mit Ihren Änderungen erstellen
(außer für Übersetzungen, siehe unten). 🚀

You can contribute to:

- [Source-code](contribute#zammad-source-code)
- [Documentation](contribute#documentation)
- [Translation](contribute#translation)

Bitte sehen Sie sich unsere Hinweise für Beiträge an.

Alle Repos sind auf [Github](https://github.com/zammad){target=_blank} zu
finden.

## Zammad Quellcode

Der Quellcode von Zammad ist auf GitHub im [Zammad
Repository](https://github.com/zammad/zammad){target=_blank} zu finden.

Werfen Sie einen Blick in das
[Entwicklerhandbuch](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank},
um loszulegen.

### Unterstützte Branches / Versionen

Das
Haupt-[Zammad-Repository](https://github.com/zammad/zammad){target=_blank}
auf Github hat mehrere Branches.

#### `develop`

- Dies ist der aktuelle (unveröffentlichte) Entwicklungsstand der nächsten
  Hauptversion (dieser wird zum neuen `stable`-Branch).
- Verwenden Sie das nicht für den Produktiv-Betrieb!
- Unterstützt durch Fehler- und Sicherheitskorrekturen - siehe auch unsere
  [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}.

#### `stable`

- Dies ist die aktuelle stabile Version, z.B. Zammad 5.2.
- Verwenden Sie diese für den Produktiv-Betrieb.
- Unterstützt durch Fehler- und Sicherheitskorrekturen - siehe auch unsere
  [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}.

#### `stable-x.y`

- Dies sind Branches von alten Versionen von Zammad wie `stable-5.1` für
  Zammad 5.1.
- Keine Unterstützung durch Fehler- oder Sicherheitskorrekturen.

## Dokumentation

Möchten Sie zur Zammad-Dokumentation beitragen?

Open a new GitHub pull request at <https://github.com/zammad/zammad-org>
with your changes and make sure to follow the prerequisites and instructions
in the repo's README.

The documentation you are reading is available on next.zammad.org and
zammad.org and is built via Vitepress. The source files are written in
Markdown.  Make sure to change the English source files only which are
placed under `/src/en/`. The translation is done via Weblate and will
overwrite any changes in the language specific folders (except `/src/en/`).

## Übersetzung

Wenn Sie uns bei der Übersetzung helfen und die mehrsprachige Unterstützung
von Zammad und/oder der Dokumentation verbessern wollen, sind Sie ebenfalls
willkommen! Die Übersetzung von Zammad selbst und der Dokumentation erfolgt
mit Hilfe von Weblate, einem Dienst für die gemeinschaftliche Übersetzung
von Projekten.

Sie müssen dazu nur zu Zammads
[Weblate-Instanz](https://translations.zammad.org/){target=_blank} gehen.
Sie können entweder ein Konto erstellen (falls Sie noch keines haben) oder
sich sogar mit Ihrem Github-Konto anmelden!

In den folgenden Abschnitten werden wir einige grundlegende Schritte
behandeln, damit Sie mit dem Übersetzen beginnen können. Wenn Sie jedoch
einige zusätzliche Funktionen von Weblate nutzen und tiefer eintauchen
möchten, ist deren
[Übersetzungsdokumentation](https://docs.weblate.org/en/latest/user/translating.htm){target=_blank}
ein guter Ausgangspunkt.

### Grundlagen

The translation of **Zammad** and the translation of the **documentation**
are split into different projects in Weblate. When you click in the top menu under
"_Projects > Browse all projects_", you can find the overview of the
projects:

![Screenshot mit Übersetzungsprojekten in Weblate und
Menü](/screenshots/weblate-overview-docs.png)

Struktur von Übersetzungsprojekten in Weblate:

- Dokumentation
  - Neue Dokumentation auf next.zammad.org
- Zammad
  - Zammad (`develop`, Entwicklungsversion)
  - Zammad (`stable` Version)
  - _Some more which aren't relevant here_

::: tip

Es macht keinen großen Unterschied, welchen Zweig Sie zur Übersetzung wählen. Wenn Weblate
die gleichen Zeichenketten in verschiedenen Branches erkennt, werden sie für alle
Branches verwendet und müssen nur einmal übersetzt werden.
I m Zweifelsfall wählen Sie die `develop` Version.
:::

Nachdem Sie ein Projekt (Dokumentation oder Zammad) ausgewählt haben, sehen
Sie verschiedene Unterprojekte und deren Übersetzungsstatus für alle
Sprachen in einer Übersicht.  Diese Übersichten können eine recht niedrige
Übersetzungsrate zeigen, was auf die Menge der aktiven Sprachen
zurückzuführen ist.

Here you can select one of the "components", which is more or less the same as
different versions. After selecting one of them, you can see the status of
translation for the different languages, as you can see in the
following screenshot with an example from _Documentation > User
Documentation (latest)_:

![Screenshot showing translation status of different languages for the user
documentation](/screenshots/weblate-translations-user-docs.png)

### Übersetzen

After selecting your language you want to translate to, a good starting
point is to select "_Untranslated strings_" (or the same meaning in your
language, depending on what you have set in your profile).

Danach sehen Sie die erste unübersetzte Zeichenkette im oberen Feld und
können theoretisch mit dem Übersetzen beginnen. Zunächst eine kurze
Übersicht über die Benutzeroberfläche von Weblate:

![Screenshot des Weblate User-Interface](/screenshots/weblate-ui.png)

1. **Pfad** zum aktuellen Projekt und zur aktuellen Sprache
2. **Translation area** itself. You can find the source string (_"English
   (United States)"_) at the top and the field for your translation
   (_"French"_ in this example).
3. **Glossar**: Hier finden Sie gängige Übersetzungen im Zammad-Kontext. Die
   Begriffe aus dem Glossar sind auch in den Zeichenketten der Quelle
   hervorgehoben.
4. **Weitere nützliche Tabs**:
    - **Benachbarte Zeichenketten**: zeigt Ihnen den Kontext des Wortes oder
      der Zeichenkette an
    - **Automatic suggestions**: here you can find automatic suggestions
      from DeepL and suggestions from similar strings, which are already
      translated.  Use the "_Clone to translation_" button to insert it in
      the translation field to apply changes. Use the "_Accept_" button to
      accept the suggested translation and automatically switch to the next
      string.
    - **Andere Sprachen**: Hier können Sie sich eine Übersicht verschaffen,
      welche Sprachen übersetzt wurden, und Sie können auch die übersetzten
      Zeichenketten sehen (könnte für Sprachen nützlich sein, die ähnlich
      sind).

### Fehlerbehebung

Und schließlich noch einige Hinweise für "spezielle" Zeichenketten, die Sie
vielleicht in den Dokumentationsprojekten sehen:

- **\`Beispiel-String\`**

    Dies wird als `Beispiel-String` ausgegeben. Je nach Kontext kann dieser
    übersetzt werden oder nicht. Verwenden Sie in jedem Fall \` vor und nach der Zeichenkette in
    Ihrer Übersetzung.

- **\[Beispiel\](/en/pfad/zu/dokument-oder-website\)**

    Dies ist ein Link zu einer anderen Seite, einschließlich des Sprachcodes.
    Das obige "Beispiel" ist der Text, der als Linktext angezeigt wird. Dieser Teil kann
    übersetzt werden. Für den Pfad darf nur das `en` durch den Sprachcode ersetzt werden,
    in den Sie übersetzen. Stellen Sie sicher, dass Ihre Sprache
    bereits auf zammad.org vorhanden ist (überprüfen Sie dies mit dem Sprachumschalter).
    Andernfalls kontaktieren Sie uns, wenn Sie Ihre Sprache aktivieren lassen wollen (und ein
    maßgeblicher Teil der Zeichenketten bereits übersetzt ist).

- **\*\*Beispiel Text\*\***

    Markierung für Text (z. B. fett, kursiv). Alternativ: \*Beispiel Text\*.
    Diese Zeichenketten können übersetzt werden, aber die Markup-Kennzeichnung
    (z.B. ein oder mehrere \*) sollte sinngemäß übernommen werden.
