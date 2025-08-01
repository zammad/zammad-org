---
order: 1
title: Glossar
---

# Glossar

Haben Sie sich jemals gefragt, was wir mit bestimmten Begriffen meinen? Wir
haben die wichtigsten Begrifflichkeiten unten für Ihr Verständnis
zusammengetragen.

<VPGlossary>

Admin
: Ein Admin(istrator) ist ein Benutzer in Zammad, der besondere Rechte hat und Ihre
  Zammad verwaltet. Ein Admin kann z.B. Benutzerberechtigungen, Zeiterfassungs-Einstellungen,
   Automatisierung und Textbausteine konfigurieren.
  Wenn Sie jemanden suchen, der etwas in Ihrem Zammad anpassen kann, ist Ihr Admin
  die richtige Person, die Sie fragen sollten.

Agent
: Ein Agent ist ein Benutzer in Zammad, der Tickets bearbeitet und auf Kundenanfragen antwortet.
  Agenten können auch Administratoren sein, was bedeutet, dass sie Einstellungen,
  Benutzerrechte, etc. ändern können (siehe oben).

API
: Eine API (Application Programming Interface) ist ein Satz von Regeln und Protokollen
  die es verschiedenen Softwareanwendungen ermöglichen, miteinander zu kommunizieren.
  Es ermöglicht Ihnen, Systeme von Drittanbietern mit Ihrem Zammad zu verbinden (z.B. soziale
  Medien, Messenger, Monitoring-Tools).

  Sie können mehr erfahren auf unserer
  [API-Landingpage](https://zammad.com/de/product/features/rest-api){target=_blank}
  sowie in unserer [API-Referenz](/de/reference/rest-api/intro).

Artikel
: Jedes Element innerhalb eines Tickets wird als Artikel bezeichnet. Ticket-Artikel
  können intern (nur Agenten können sie sehen) oder öffentlich sein (Kunden können sie
  ebenfalls sehen; z.B. öffentliche Notizen oder ausgehende E-Mails) und können
  formatierten Text sowie Anhänge und Inline-Bilder enthalten.

Automatisierung
: Es gibt viele Prozesse, die mit Zammad automatisiert werden können.
  Das bedeutet, dass bestimmte Aktionen automatisch ablaufen.
  Eine Automatisierung kann zeitbasiert oder aktionsbasiert sein und kann alle
  denkbaren Automatisierungsszenarien abdecken.
  Ein Beispiel wäre die wiederkehrende Löschung von Kunden, die
  nicht mehr benötigt werden oder die Zuweisung von Gruppen auf Basis von Ticket-Attributen.

Automatisches Speichern (Autosave)
: Die Autosave-Funktion von Zammad sorgt dafür, dass keine Arbeit verloren geht. Falls Ihr Browser
  abstürzt, melden Sie sich einfach wieder an und machen dort weiter, wo Sie vorher waren.
  Erfahren Sie mehr auf unserer
  [Autosave Landing Page](https://zammad.com/de/product/features/autosave){target=_blank}.

Branding
: Jede Firma hat ihre eigene Identität. Deshalb können Sie bei Zammad Ihr
  Logo, Ihre Signatur, Links und andere Dinge hinzufügen!

Changelog
: Mit jeder neuen Version kommt ein neues Changelog. Es ist im Grunde eine Liste aller
  Dinge, die sich geändert haben, von neuen Verbesserungen bis hin zu Fehlerkorrekturen.

  Sie finden sie alle auf unserem
  [GitHub](https://github.com/zammad/zammad/blob/stable/CHANGELOG.md){target=_blank}!

Checkmk
: Checkmk ist ein leistungsstarkes IT-Überwachungstool, das Echtzeit-Statusmeldungen
  per E-Mail oder REST API an Zammad senden kann. Richten Sie diese Warnungen in Checkmk ein
  und Zammad wird automatisch Tickets erstellen, aktualisieren und schließen, basierend auf
  dem Zustand Ihres Systems.

Clearbit
: Clearbit ist ein Dienst zum Sammeln von Informationen über Ihre
  Kontakte. So können neue Anfragen von unbekannten Benutzern in Zammad automatisch
  mit Informationen wie Firma, Anzahl der Mitarbeiter, Jahresumsatz, Branche
  und vielem mehr anreichern.

Konfliktwarnung
: Wenn zwei Agenten dasselbe Ticket gleichzeitig bearbeiten, kann eine Menge schief gehen -
  von doppelten Antworten bis hin zu überschriebenen Nachrichten. Zammad hilft Ihnen
  mit seiner integrierten Konfliktwarnung, dies zu vermeiden. Wenn Sie also einen anderen
  Avatar eines Agenten und einen kleinen Stift am unteren Rand Ihres Tickets sehen, bedeutet das,
  dass dieser es gerade bearbeitet.

Inhalt-Seitenleiste
: Rechte Seitenleiste in der Ticketansicht, die die Tabs der Seitenleiste
  beinhaltet und die aktive Seitenleiste (falls geöffnet).

Core-Workflows
: Mit dieser Funktion können Sie dynamische Felder und Ticket-Masken konfigurieren, die auf
  Attributen, die in Zammad verfügbar sind, basieren. Sie können zum Beispiel Felder deaktivieren
  oder ausblenden, Felder in Abhängigkeit von anderen Feldern einblenden, diese als Pflichtfeld definieren und
  vieles mehr!

CTI
: CTI steht für Computer-Telefonie-Integration und ermöglicht Ihnen,
  detaillierte Informationen über alle Ihre eingehenden und ausgehenden Anrufe zu sammeln.
  Dazu gehören z.B. ein Anrufprotokoll, eine Übersicht, welcher Agent
  gerade im Gespräch ist, eine Anrufer-ID-Suche und sogar einen "Nicht stören"-Modus.

Kundenspezifische Entwicklung (Custom Development; CD)
: Wir arbeiten stetig daran Zammad zu verbessern und fügen mit jedem Release immer
  weitere Funktionen hinzu. Es gibt allerdings Kunden, die sehr spezielle Funktionen
  oder Anpassungen benötigen, die entweder sehr eilig oder sehr speziell für ihren
  Anwendungsfall sind. Hier kann unser "Custom Development" helfen: Wir bieten
  Kunden die Entwicklung zu einem zuvor vereinbarten Preis an (dieser basiert auf
  den erwarteten Aufwand zur Fertigstellung).

Kunde
: Ein Kunde ist eine Person, mit der Sie über Zammad kommunizieren.
  Für jeden Kunden gibt es eine Profilseite mit allen Tickets und weiteren
  Informationen. Kunden können einer oder mehreren Organisationen zugewiesen werden.
  Jeder Kunde kann über das Kundeninterface auf Zammad zugreifen, wo alle seine
  Tickets mit dem aktuellen Status und Live-Aktualisierungen einsehbar sind.

Dashboard
: Das Dashboard ist die individuelle Begrüßungsseite in Zammad und gibt
  Ihnen Feedback über Ihre Arbeit.
  Hier finden Sie alle möglichen Übersichten, wie z.B. die offenen Tickets,
  die durchschnittliche Wartezeit oder die Wiedereröffnungsrate. Sie können auch sehen,
  was Ihre Kollegen tun, indem Sie den Aktivitäts-Verlauf einsehen.

Dialog
: Ein Dialog ist ein Element, das auf Grund seiner Wichtigkeit in der Mitte des
  Bildschirms auftaucht. Ein Beispiel dafür ist der Dialog, der Sie fragt, Ihre
  ungespeicherten Änderungen zu speichern oder zu verwerfen.

Dokumentation
: Sie haben es sicher schon gemerkt: Sie lesen gerade einen Teil der Dokumentation der
  Zammad-Dokumentation 😉 .

Elasticsearch
: Zammad bietet eine Elasticsearch-Integration (eine freie und offene Suchmaschine)
  die den Suchprozess in Zammad superschnell und leistungsstark macht. Sie
  können sogar ein Berichts-Tool wie Grafana mit Elasticsearch verbinden, um
  leistungsfähige Berichte und Statistiken zu erstellen.

Eskalation
: Eine Eskalation ist das, was passiert, nachdem die Frist für ein Ticket abgelaufen ist. Sie
  können sie mit den SLAs von Zammad konfigurieren. Ein eskaliertes Ticket wird in Ihrer
  Taskleiste und in den Übersichten rot markiert.

Exchange-Integration
: Die Exchange-Integration ermöglicht Ihnen die Synchronisierung Ihrer Kontakte aus Ihrem
  Exchange Adressbuch mit Zammad. Jedes Mal, wenn ein Kontakt in Exchange aktualisiert
  wird, wird dies in Zammad reflektiert. Dies gibt Ihnen direkten Zugriff auf alle Ihre Kontakte
  in Ihrem Zammad.

Externe Authentifizierung
: Die externe Authentifizierung ist eine einfache Option für Ihre Benutzer, sich mit einem Klick
  bei Zammad anzumelden. Sie hat verschiedene Vorteile: Sie ist nicht nur schneller, sondern bedeutet auch,
  dass sich Ihre Benutzer weniger Passwörter merken müssen.
  Zammad unterstützt derzeit mehr als zehn Login-Anbieter, wie z.B. Facebook,
  GitHub, GitLab, Google, oder Microsoft / Office365.

Feature
: Ein Feature ist eine bestimmte Fähigkeit oder Funktionalität, die Zammad Ihnen zur Verfügung
  stellt wie z.B. unsere Integrationen, Produktivitätstools oder zusätzliche Kanäle.
  Wir fügen mit jeder Version neue Funktionen hinzu.

Feature-Anfrage
: Lassen Sie uns wissen, wenn Sie eine bestimmte Funktion in Zammad vermissen.
  Wir sammeln alle Ihre Wünsche in unserem Community-Forum in der
  [Kategorie "Feature Requests"](https://community.zammad.org/c/stuff-you-like-zammad-to-have-feel-free-to-discuss-and-add-proposals/6/all){target=_blank}.
  Wenn eine Anfrage regelmäßig eingeht und wir denken, dass es eine
  großartige Ergänzung wäre, setzen wir sie auf unsere Roadmap und beginnen mit der Arbeit daran.

Feature-Sponsoring
: Wenn eine Organisation ein Feature auf der Liste dringend benötigt,
  kann sie die Entwicklung vorantreiben und die Priorität erhöhen, indem sie
  es sponsert, d.h. die Entwicklungskosten übernimmt.

GitHub
: GitHub ist ein Dienst für die Versionsverwaltung von Softwareentwicklungsprojekten.
  Er verwendet Git, eine Software, die Änderungen in Dateien verfolgt.
  Hier bei Zammad verwenden wir es, um unser Repository zu verwalten.

  Da Zammad ein Open-Source-Projekt ist, tragen viele Entwickler und Technikbegeisterte aus der ganzen
  aus der ganzen Welt dazu bei. GitHub ist der Ort, an dem wir all dies koordinieren.
  Folgen Sie dem Link um einen Blick in [das Repository](https://github.com/zammad/zammad){target=_blank} zu werfen.

  Neben unserem eigenen Repo hat Zammad auch eine Integration für GitHub.
  Sie schafft einen Datenaustausch, der Ihnen alle relevanten Informationen über Ihre
  Issues direkt in einem Tab in der Seitenleiste anzeigt, wie z.B. den Status oder zugewiesene Personen.

GitLab
: GitLab ist ähnlich wie GitHub.
  Hier bei Zammad verwenden wir es für unsere interne Entwicklung.

  Es gibt auch eine Integration, die es Benutzern ermöglicht, GitLab mit Zammad
  zu verbinden, so dass alle ihre Issues und die entsprechenden Änderungen auch in
  Zammads Tab in der Seitenleiste angezeigt werden.

Grafana
: Grafana ist ein Open-Source-Tool für Berichte.
  Zammad Benutzer mit dem Plus-Tarif können es in ihre Instanz integrieren und
  detaillierte Analysen über ihre Leistung erhalten.

  Die Anbindung von Grafana an Elasticsearch ist eine Möglichkeit, die Sie
  auch in Ihrer Premise-Installation vornehmen können.

Gruppen
: Gruppen sind ein Synonym für Abteilungen oder Bearbeitungsgruppen.
  Eingehende Tickets können Gruppen zugewiesen werden.
  Innerhalb der Gruppe kann ein Besitzer definiert werden, der für diese Anfrage verantwortlich ist.
  Der Zugriff auf Tickets wird über die Rollen gesteuert. In einer Rolle kann definiert werden,
  welche Berechtigung sie basierend auf den verschiedenen Gruppen hat.
  Die möglichen Berechtigungen sind "Lesen", "Erstellen", "Ändern", "Übersicht" und
  "voll" (oder keine davon).

  Wenn Sie in der Vergangenheit mit dem OTRS-System gearbeitet haben, erinnern Sie sich vielleicht an das
  Prinzip der "queues". Die Gruppen in Zammad sind die gleichen wie die queues in
  OTRS.

Icinga
: Icinga ist ein Überwachungssystem, das die Verfügbarkeit
  der gesamten Systeminfrastruktur einer Organisation überwacht.
  Es kann in Zammad integriert werden, so dass es ein Ticket auslöst, wenn
  einer Warnsituation auftritt.

i-doit
: i-doit ist eine CMDB (Configuration Management Data Base).
  Sie hilft Ihnen, alle Teile der physischen und digitalen Infrastruktur im Auge zu behalten.
  Eine entsprechende Integration ermöglicht die Verbindung mit Zammad, wo es einen
  neuen Tab zur Ticket-Seitenleiste hinzufügt, so dass Sie zu bestehenden i-doit-Objekten
  verlinken können. Sie können damit auch Zammad Tickets in i-doit erstellen.

Issue-Tracking-System
: Issue-Tracker sind in der Regel Systeme, die Prozesse auf technischer Ebene verfolgen.
  Zwei der bekanntesten Beispiele sind GitHub und GitLab.

  Zammad wird oft auch als Issue-Tracking-System bezeichnet.
  Als Helpdesk konzentriert es sich jedoch auf die Kommunikation auf
  Kundenebene und nicht auf die technische Ebene.

Kibana <Badge type="info" text="nur on-premise" />
: Kibana ist ein browserbasiertes Open-Source-Reporting-Tool, das sich auf die Auswertung
  von Daten konzentriert. Es wurde von Elastic entwickelt, weshalb es nicht verwunderlich ist,
  dass es für seine Analysen Daten aus Elasticsearch verwendet.

  Kibana kann an Zammad angebunden werden,
  was die Nutzung der Helpdesk-Daten im Reporting-Tool erlaubt.

Knowledge Base
: Stellen Sie sich eine sehr umfangreiche Sammlung von FAQs vor - das ist genau das, was die
  Zammad Knowledge Base ist. Sie sammelt alle wichtigen Informationen:
  Definitionen, Prozesse, Anleitungen, Organigramme, usw.

  Knowledge Base-Artikel können entweder intern oder extern sein.
  Sie können somit entweder die Informationen mit der Welt teilen
  (z.B. gut für Informationen zu ihrem Produkt oder Service) oder
  innerhalb Ihres Teams halten (für interne Prozesse oder Informationen für Teams).

Ein LDAP-Server (Lightweight Directory Access Protocol) stellt zusätzliche Informationen
: über Ihre Benutzer in Zammad zur Verfügung. Eine Authentifizierung gegen den LDAP und
  die Zuordnung von LDAP-Rollen zu Zammad-Rollen ist ebenfalls möglich.

Makro
: Ein Makro ist eine Reihe von Aktionen. Durch den Start des Makros werden die Aktionen
  ausgelöst und ausgeführt, so dass der Benutzer nicht jeden Schritt
  einzeln abarbeiten muss. Das spart enorm viel Zeit und sorgt dafür,
  dass kein Schritt vergessen wird.

  Sie können Ihre eigenen Makros definieren und Aktionen basierend auf allen verfügbaren
  Attributen im Ticket durchführen.

Mentions
: Mentions are a Zammad feature that allows you to tag another agent in a
  ticket. Just type [[@]][[@]] and the name. The selected person will be notified
  and will be watching the ticket from now on.

Migrator / Assistent für die Migration
: Wenn eine Firma von einer anderen Helpdesk-Software zu Zammad wechseln möchte,
  stellt sich oft die Frage: Was ist mit meinen bestehenden Daten?
  Deshalb haben wir unsere Migrationsassistenten entwickelt, die bei der Migration aller
  Daten helfen.

Monit
: Monit ist ein Open-Source-Überwachungstool, das eine einfache Einrichtung bietet und
  eine starke Gemeinschaft dahintersteht. Sie können es in Zammad integrieren. Auf diese Weise
  wird jedes Mal ein Ticket erstellt, wenn Sie eine E-Mail in Monit erhalten.

Navigation
: Unter Navigation versteht man die linke Seitenleiste in Zammad, die Tabs zur Navigation,
  die Suche, Benachrichtigungen und viele weitere Elemente enthält, abhängig von Ihrem System.

Navigation Tab
: Ein Element der Navigation. Sie können mehrere Tabs geöffnet haben und schnell
  zwischen ihnen wechseln.

Nagios
: Nagios ist ein weiteres Überwachungstool, das IT-Teams benachrichtigt, wenn ein Vorfall
  auftritt. Es kann in Zammad integriert werden, so dass bei einem Alarm ein Ticket 
  erstellt wird.

On-Premise
: Dieser Begriff bedeutet, dass Zammad nicht als Cloud-Service der Firma Zammad bereitgestellt wird,
  sondern auf einem Server läuft, der von einem Benutzer oder
  Kunden von Zammad kontrolliert wird. Self-Hosting bedeutet das Gleiche.

Organisation
: Eine Organisation ist eine Gruppierung von einzelnen Kunden, die derselben
  Firma oder einer Gruppe von Firmen angehören.
  Ein einzelner Kunde, dessen Organisation "teilend" ist, hat Zugriff auf alle Tickets seiner
  Organisation.

Besitzer
: Der Besitzer eines Tickets ist die Person, die für das Ticket verantwortlich ist und daran arbeitet.
  Der Besitzer kann durch einen anderen ersetzt werden.
  In diesem Fall empfiehlt es sich, einen Übergabevermerk im Ticket zu hinterlassen, damit
  der neue Besitzer weiß, was zu tun ist.

Eltern/Kind Beziehung
: Wenn ein Ticket zu weiteren Teilaufgaben (oder zusätzlichen Korrespondenzen) führt,
  können Sie es in mehrere Tickets aufteilen. Die Hauptanfrage ist dann das übergeordnete
  Eltern-Ticket und die Tickets mit verwandten Unterthemen sind die Kinder-Tickets.
  Übrigens: Auf die gleiche Weise können Sie auch zwei Tickets zu einem zusammenführen.

Placetel
: Placetel ist eine VoIP Cloud-Telefonanlage. Verwenden Sie Ihre normale Telefonnummer
  und rufen Sie jemanden direkt auf dessen Handy oder Festnetz an, während die gesamte
  Kommunikation an einem Ort in Zammad haben.

  Durch die Integration eines Placetel Kontos in Zammad erhalten Benutzer ein Anrufprotokoll,
  wodurch die Historie ihrer Korrespondenz noch genauer wird.
  Anrufer werden direkt über ihre Caller ID identifiziert - eine Schlüsselfunktion, die
  den Agenten viel Zeit bei der Zuweisung von Anrufern spart.

Priorität
: Jedem Ticket wird eine Priorität zugewiesen. Standard ist die Priorität 2 (normal).
  Zusätzlich gibt es die Prioritäten 1 (niedrig) und 3 (hoch). Sie können sogar
  weitere Prioritäten zu Ihrem Zammad hinzufügen.

Release
: Alle paar Monate veröffentlichen wir eine neue Version von Zammad, die als
  Release bezeichnet wird. Jedes Release fügt neue Funktionen zu unserer Software
  hinzu. Es gibt Haupt- und Nebenversionen:
  Hauptversionen (wie Zammad 1.0, 2.0, etc.) bringen größere Änderungen mit sich.
  Nebenversionen (wie 1.1, 2.1, usw.) werden in der Zwischenzeit veröffentlicht und bringen
  kleinere Aktualisierungen.

  In unseren [Versionshinweisen](https://zammad.com/de/releases){target=_blank} können Sie nachlesen, welche
  Funktionen in neuen Versionen enthalten sind und auch wichtige Informationen darüber,
  was vor der Aktualisierung von Zammad zu beachten ist.

Rolle
: Jeder Benutzer hat eine zugewiesene Rolle. Standardmäßig gibt es drei Rollen:
  Admin, Agent und Kunde.

  _Admins_ haben die meisten Rechte: Sie können Rollen, Berechtigungen
  und Einstellungen für das gesamte Team und die Instanz festlegen.
  _Agenten_ können Tickets anzeigen und bearbeiten, aber keine anderen Einstellungen ändern als
  die ihres eigenen Profils.
  _Kunden_ können den Bearbeitungsstatus ihres Tickets in der
  Kundenoberfläche einsehen.

  Sie können sogar neue Rollen zu Ihrem Zammad hinzufügen.

Zweite Navigationsebene
: Bezieht sich auf ein zusätzliches Menü neben der Navigation (z.B. beim Öffnen der
  Profil-Einstellungen).

Seiten(Leiste)
: Dies ist der Bereich, der von der rechten Seite aus für Aktionen wie
  Ticket-Verknüpfung oder Zusammenführung von Tickets ins Bild schwebt.

Seitenleisten-Tab
: In der Seitenleiste gibt es verschiedene Tabs wie "Kunde",
  "Organisation" und "Ticket", abhängig von Ihrem System und Ihrem Ticket.
  Diese werden als Seitenleisten-Tabs bezeichnet.

  Ein aktiver Seitenleisten-Tab ist der aktuell geöffnete Tab der Seitenleiste.

Sipgate
: Sipgate ist eine SaaS-Lösung für Internet-Telefonie.
  Die Zammad-Integration für Sipgate bietet den Benutzern eine detaillierte
  Anruf-Übersicht. Wenn Sie einen Kunden haben, der mit einem bestimmten Agenten verbunden werden möchte,
  erfahren Sie im Anruferprotokoll, ob dieser Agent gerade verfügbar ist.

SLA
: Ein Service Level Agreement (SLA) ist ein Vertrag zwischen einem Nutzer und einer
  Firma, der die erwarteten Mindestanforderungen an den Service definiert, einschließlich
  Qualität, Verfügbarkeit und Pünktlichkeit.
  SLAs werden verwendet, um die vereinbarten Regeln und deren Einhaltung zu
  überwachen

  Sie können in Zammad ganz einfach SLAs einrichten und Parameter definieren, wie z.B. die Zeit
  für die erste Antwort, eine Aktualisierungs- und eine Lösungszeit. Sobald die Frist erreicht ist,
  eskaliert das Ticket.

S/MIME
: S/MIME ist die am weitesten verbreitete Methode für sichere E-Mail-Kommunikation.
  Wenn Sie es in Zammad aktivieren, werden alle von Zammad aus gesendeten Nachrichten signiert und
  verschlüsselt.

SSO
: Single-Sign-On (SSO) ermöglicht Ihnen den Zugriff auf alle Ihre Systeme und Geräte mit
  nur einer Anmeldung. Es gibt verschiedene Anbieter, die diesen Prozess einfach und
  sicher machen. Zammad unterstützt derzeit SSO über SAML und Shibboleth.

Status
: Jedes Ticket hat einen Status, der den aktuellen Fortschritt bei der Lösung des
  Problems widerspiegelt. Der Status eines Tickets kann manuell oder automatisch auf der Grundlage von
  Automatisierungen oder SLA gesetzt werden. Jeder Status hat einen Statustyp. Es gibt vier Statustypen
  und sie sind farblich kodiert. Sie können sogar zusätzliche Status zu Ihrem Zammad hinzufügen.

Tags
: Tags helfen Ihnen, Tickets zu kategorisieren. Sie können sie auf der Grundlage Ihres Anwendungsfalls
  definieren. Wenn Sie zum Beispiel ein Einzelhandelsunternehmen sind, könnten Ihre Tags auf Ihren
  Produktkategorien basieren, um Ihnen zu helfen, Tickets nach der Art des Produkts zu kategorisieren.
  Sie könnten aber auch auf der Art der Anfrage basieren, z.B. Erstattung, Liefer-Problem, Beschwerde.

  Tags can be queried in conditions in an automation and assigned
  automatically, for example depending on keywords in the ticket title.

Text Module
: If you find that you send the same answers over and over again,
  you can save yourself a lot of work and create a text module.
  This way, you just need to type the [[:]][[:]] shortcut in an article and all
  available text modules are shown from which you can select the desired one.
  You can limit the search results by adding parts of the text module's name,
  keywords or content after the [[:]][[:]].

  Hier bei Zammad haben wir zum Beispiel einen Textbaustein mit dem Kürzel
  `::ilff`, was zu `I look forward to your feedback` wird.

(Ticket) Vorlage
: Wenn Sie viele ähnliche Tickets erstellen, können Sie eine Vorlage für diese erstellen. Eine Vorlage
  kann hilfreich sein für Einführungen in Ihr Produkt/Ihre Dienstleistung oder für die Ausarbeitung eines
  Angebots.

Benutzer
: Ein Benutzer ist ein beliebiger Benutzer des Ticketsystems. Jeder Benutzer hat zugewiesene
  Berechtigungen, die ihm den Zugang zu bestimmten Bereichen und Informationen ermöglichen.
  Benutzer können verschiedene Rollen haben, wobei die Standardrollen Agent, Admin
  und Kunde sind.

Webhooks
: Webhooks sind eine einfache Möglichkeit für Systeme, miteinander zu kommunizieren.
  Sie ermöglichen, Echtzeitdaten an jede andere Anwendung zu senden.
  Dadurch haben Sie die Möglichkeit, ein Drittsystem über neue
  Informationen in Zammad zu informieren.

Zammad : Zammad ist der beste Helpdesk der Welt. Punkt.

</VPGlossary>
