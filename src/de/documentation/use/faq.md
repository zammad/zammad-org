---
order: 10
title: FAQs
---

# FAQs

## Allgemein

::: details How to find tickets?
Das hängt von Ihrem Anwendungsfall ab. Zammad bietet viele Möglichkeiten, Tickets zu suchen und auf sie zuzugreifen.

Wenn Sie **nach einem bestimmten Ticket oder Inhalt** suchen, ist die Suche der beste Weg. Sie finden das Suchfeld im oberen
Bereich der Navigations-Seitenleiste oder können sie mit dem Tastaturkürzel [[s]] aktivieren. Die Suche zeigt Ihnen sogar Ihre
zuletzt angesehenen Elemente an, vielleicht finden Sie dort schon, was Sie suchen. Es gibt eine separate Seite über die
[Suche](./guides/search) für weitere Informationen.

Wenn Sie **mit der Arbeit an Tickets** beginnen wollen, werfen Sie einen Blick auf [die Übersichten](./guides/overviews), die im Grunde eine
Liste der aktuellen Tickets sind. Diese Übersichten sollten Sie in die Lage versetzen, leicht zu unterscheiden,
was erledigt werden muss, was in Arbeit ist und was derzeit pausiert ist. Falls Sie Probleme mit diesen Übersichten haben,
sollte Ihnen Ihr Zammad-Administrator helfen können.
:::

::: details How to get notified for ticket changes?
Passen Sie die [Benachrichtigungseinstellungen in Ihrem Profil] (manage-profile#benachrichtigungen) an. Sie können unterscheiden zwischen der
Aktion (z.B. Ticketerstellung), dem Benachrichtigungskanal (E-Mail und/oder Browser), Ihrer Beziehung zum Ticket (z.B. ob
Sie der Besitzer sind) und die Benachrichtigungen auf eine bestimmte Gruppe beschränken.
:::

::: details Why is the ticket open again? I closed it already!
Je nach den Einstellungen Ihrer Zammad-Instanz können die Gründe dafür unterschiedlich sein. Normalerweise ist der Grund jedoch, dass ein Kunde
auf das Ticket geantwortet hat, nachdem es auf geschlossen gesetzt wurde. Ein anderer Grund könnte sein, dass ein Kollege es wieder geöffnet hat. Wenn Sie
keinen Artikel sehen, der auf diese Erklärung passt, können Sie einen Blick in die Ticket-Historie werfen, um mehr herauszufinden. Tun Sie dies, indem Sie
das Menü ::a:: im Ticket-Seitenleisten-Tab öffnen und **Historie** auswählen.

Ihr Zammad-Administrator kann einstellen, was passieren soll, wenn ein Kunde antwortet, nachdem ein Ticket geschlossen wurde.
:::

:::: details What does the customer see in the ticket?
Standardmäßig steht den Kunden nur eine reduzierte Oberfläche zur Verfügung. Sie können Tickets erstellen, ihre eigenen Tickets einsehen (und
je nach Einstellung auch die ihrer Kollegen) und auf ihre Profileinstellungen zugreifen. Auch die Ticket Detailansicht enthält nur
relevante Elemente für den Kunden. Elemente, die einen internen Zweck haben (wie Gruppe, Priorität, interne Notizen), sind
für Kunden nicht sichtbar.

::: warning
Die obige Erklärung basiert auf den Standardeinstellungen von Zammad. Beachten Sie, dass die Konfiguration Ihres Systems möglicherweise
anders sein kann. Im Zweifelsfall sollten Sie Ihren Administrator fragen.
:::
::::

::: details I can't log in. What can I do?

- Haben Sie Ihr Passwort vergessen? Versuchen Sie, es im Login-Dialog über den Link **Kennwort vergessen?** zurückzusetzen, indem Sie Ihre
  E-Mail-Adresse eingeben.
- Haben Sie keine Möglichkeit mehr, Ihren zweiten Faktor für die 2-Faktor-Authentifizierung (2FA) zu verwenden? Nutzen Sie einen Wiederherstellungscode und richten Sie eine
  neue 2FA-Methode ein. Weitere Informationen finden Sie auf der [2FA-Seite](./guides/two-factor-auth).
- Haben Sie Ihre 2FA-Wiederherstellungscodes verloren? Wenden Sie sich an Ihren Zammad-Administrator. Dies gilt auch, wenn Ihr Problem
  hier nicht genannt wurde.
:::

::: details How can I use keyboard shortcuts? I want to be more productive.
Benutzen Sie sie einfach! Eine Übersicht über die verfügbaren Tastenkombinationen finden Sie, indem Sie [[?]] auf Ihrer Tastatur drücken oder die
Übersicht über das Avatar-Menü (klicken Sie auf Ihren Avatar in der unteren linken Ecke und wählen Sie **Tastaturkürzel**) öffnen.

Einige dieser Tastenkombinationen hängen davon ab, wo Sie sich befinden oder welche Aktion Sie durchführen (z.B. im Editor oder in der Ticket
Detail-Ansicht).
:::

::: details How to switch between dark and light mode for the user interface?
Sie können im Avatar-Menü zwischen hellem, dunklem und automatischem Modus (versucht, die Einstellung Ihres Browsers zu verwenden) wechseln. Ändern Sie
die Darstellung, indem Sie auf Ihren Avatar in der unteren linken Ecke klicken und den Schalter auf den gewünschten Zustand stellen.

Eine weitere Möglichkeit ist die Verwendung des Tastaturkürzels [[d]]. Wenn kein Eingabefeld aktiviert ist, wechselt die Taste zwischen
den verschiedenen Modi.
:::

## Benutzerprofil

::: details How to change my profile/avatar image?
Gehen Sie zum [Avatar-Bereich in Ihren Profileinstellungen](manage-profile#avatar), indem Sie das Avatar-Menü in der unteren
linken Ecke öffnen und **Profileinstellungen** wählen. Dort können Sie ein Bild hochladen, ein Foto aufnehmen (sofern Ihr Gerät über eine
Kamera verfügt) oder bereits vorhandene Bilder löschen.
:::

::: details I want to change the language of the Zammad user interface. How can I do that?
Gehen Sie in Ihren Profileinstellungen in den Bereich Sprache, indem Sie das Avatar-Menü in der linken unteren Ecke öffnen und wählen Sie
**Profileinstellungen**.
:::

::: details What should I do before going on vacation?
Gehen Sie in Ihren Profileinstellungen in den Bereich [Abwesenheit](manage-profile#abwesenheit), indem Sie das Avatar-Menü in der
in der linken unteren Ecke öffnen und **Profileinstellungen** wählen. Dort können Sie einen Agenten als Vertretung festlegen.
:::

::: details Can I adjust the order of the overviews?
Ja! Lesen Sie in der [Übersichts-Anleitung](guides/overviews#ubersichten-neu-anordnen) weiter.
:::

## Mit Tickets arbeiten

::: details How to assign somebody to a ticket?
In the ticket sidebar tab, you can find an **Owner** field. Choose from the offered agents and make sure to leave an
internal note so the other agent knows what it is about.

If you only have a question or need some information, you could also just
[mention a colleague](advanced-features#mention-a-colleague) in an article by using [[@]][[@]] and raise your question.
:::

::: details How to delete a ticket?
Zunächst einmal können Tickets nicht von Agenten gelöscht werden. Dies geschieht aus Gründen der Transparenz und um
versehentliches und willkürliches Löschen zu verhindern.

Wenn Kunden jedoch möchten, dass ihre Daten gelöscht werden (z.B. aufgrund eines GDPR-Löschantrags), kann dies in Zammad durchgeführt werden.
Wenden Sie sich an Ihren Zammad-Administrator und bitten Sie ihn, die Löschung auszuführen.
:::

::: details How to use text templates?
Use Zammad's [text modules](advanced-features#text-modules) by typing [[:]][[:]] in the article editor or choose it
from the editor toolbar. If you need to have additional modules, ask your Zammad admin to add it for you.
:::

::: details How to ask a colleague for help in the ticket?
The best way to do this is to [mention a colleague](advanced-features#mention-a-colleague) in an article by using
[[@]][[@]] and raise your question. This triggers a notification for your colleague. Depending on your internal
processes, switching the owner of the ticket could also be a possible option.
:::

::: details How to cite the customer's email or parts of it?
To partially or selective cite the article or parts of it, mark the text, you want to cite, and click on the `Reply`
button next to the article. This can be done even multiple times (e.g. to answer different parts of the ticket).

The citation of the whole article depends on how your Zammad is configured. If you want to apply changes to this
behavior, ask your admin to change it.
:::
