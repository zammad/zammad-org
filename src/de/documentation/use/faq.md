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
Depending on the settings of your Zammad instance, the reasons can differ. But usually the reason is that a customer
replied to the ticket after it was set to closed. Another reason could be that a colleague re-opened it. If you can't
see an article which fits to the description, you can take a look at the ticket history to find out more. Do so by
opening the ::a:: menu in the ticket sidebar tab and select **History**.

Your Zammad admin can adjust what should happen when a customer replies after a ticket got closed.
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
Ja! Lesen Sie [hier](guides/overviews#ubersichten-neu-anordnen) weiter.
:::

## Mit Tickets arbeiten

::: details How to assign somebody to a ticket?
In dem Ticket-Seitenleisten-Tab finden Sie ein Feld **Besitzer**. Wählen Sie einen der angebotenen Agenten aus und hinterlassen Sie eine
interne Notiz, damit der andere Agent weiß, worum es geht.

Wenn Sie nur eine Frage haben oder eine Information benötigen, können Sie auch einfach
einen Kollegen in einem Artikel [erwähnen](advanced-features#erwahnen-von-kollegen), indem Sie `@@` verwenden und Ihre Frage stellen.
:::

::: details How to delete a ticket?
Zunächst einmal können Tickets nicht von Agenten gelöscht werden. Dies geschieht aus Gründen der Transparenz und um
versehentliches und willkürliches Löschen zu verhindern.

Wenn Kunden jedoch möchten, dass ihre Daten gelöscht werden (z.B. aufgrund eines GDPR-Löschantrags), kann dies in Zammad durchgeführt werden.
Wenden Sie sich an Ihren Zammad-Administrator und bitten Sie ihn, die Löschung auszuführen.
:::

::: details How to use text templates?
Verwenden Sie Zammads [Textbausteine](advanced-features#textbausteine-verwenden), indem Sie im Artikel-Editor `::` eingeben. Wenn Sie
zusätzliche Textbausteine benötigen, bitten Sie Ihren Zammad-Administrator, sie für Sie hinzuzufügen.
:::

::: details How to ask a colleague for help in the ticket?
Entweder Sie [erwähnen](advanced-features#erwahnen-von-kollegen) Kollegen in einem Artikel, indem Sie `@@` verwenden und Ihre Frage stellen.
:::

::: details How to cite the customer's email or parts of it?
Um den Artikel oder Teile davon zu zitieren, markieren Sie den Text, den Sie zitieren möchten, und klicken Sie auf **Antworten**
unter dem Artikel. Dies kann auch mehrfach geschehen (z.B. um verschiedene Teile des Tickets blockweise zu beantworten).

Die Zitierung des gesamten Artikels hängt davon ab, wie Ihr Zammad konfiguriert ist. Wenn Sie dieses
Verhalten ändern möchten, bitten Sie Ihren Administrator darum.
:::
