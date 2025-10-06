---
order: 1
title: Rails-Befehle
---

# Rails-Konsole

Zammad verwendet Ruby on Rails, so dass Sie die [Rails
Konsole](http://guides.rubyonrails.org/command_line.html){target=_blank}
nutzen können.

:::warning
Bitte überprüfen Sie Ihre Befehle vor der Ausführung, da einige dieser
Befehle zu Datenverlusten oder beschädigten Tickets führen können! Wenn
Sie sich unsicher sind, **testen Sie es zuerst auf einem Testsystem**!
:::

## Zammads Rails-Konsole starten

### Ausführen eines einzelnen Befehls

:::info
Ersetzen Sie `{COMMAND}` durch den Befehl, den Sie ausführen möchten.
:::

:::tip
Wenn Sie ein `p` vor Ihrem Befehl voranstellen (z.B. 
`rails r 'p Delayed::Job.count'`), erhalten Sie eine 
Ausgabe im Terminal (ohne sehen Sie nichts!).
:::

:::tabs key:installmethod

=== Docker-Installation

```sh
docker compose run --rm zammad-railsserver bundle exec rails r '{BEFEHL}'
```

=== Paket-Installation

```sh
zammad run rails r '{BEFEHL}'

```

=== Quellcode-/Entwickler-Installation

```sh
rails r '{BEFEHL}'
```

:::

### Interaktive Rails-Konsole ausführen

:::tabs key:installmethod

=== Docker-Installation

```sh
docker compose run --rm zammad-railsserver bundle exec rails c
```

=== Paket-Installation

```sh
zammad run rails c

```

=== Quellcode-/Entwickler-Installation

```sh
rails c
```

:::

### Safe Mode der Rails-Konsole

Normally, starting Rails console requires certain third party services to be
up and running. You may receive errors and console will refuse to start in
case they are not available.

Es ist jedoch möglich, die Rails-Konsole im sicheren Modus zu starten, indem
man eine spezielle Umgebungsvariable setzt. Wenn `ZAMMAD_SAFE_MODE=1`
gesetzt ist, wird die Prüfung auf Vorhandensein ignoriert.

```sh
ZAMMAD_SAFE_MODE=1 zammad run rails c
```

## Ticket-Befehle

### Erhalten Sie die RAW E-Mail

Mit dem folgenden Befehl können Sie empfangene EML-Dateien, die Zammad
abgerufen hat, überprüfen. Dies ist nützlich, wenn Sie E-Mails beim Abholen
löschen und die EML-Datei selbst überprüfen müssen.

Um die EML-Datei des ersten Artikels zu erhalten, können Sie den folgenden
Befehl verwenden.  In unserem Beispiel handelt es sich um das Ticket mit der
Nummer "101234".

```ruby
Ticket.find_by(number:'101234').articles.first.as_raw.content
```

Bei Bedarf können Sie auch den Raw-Inhalt späterer Artikel abrufen (Sie
müssen allerdings den richtigen Artikel finden). Auch hier ist unsere
Ticket-Nummer "101234".

Im ersten Schritt erhalten wir alle Artikel IDs des Tickets:

```ruby
Ticket.find_by(number:'101234').article_ids
```

Ausgabe:

```ansi
[4, 3, 2]
```

Aus der Liste, die wir erhalten, können wir dann den Inhalt des Artikels
abrufen:

```ruby
Ticket::Article.find(3).as_raw.content
```

:::info
Wenn Sie nur `Ticket::Article.find(3)` verwenden, können Sie weitere
Informationen sehen (z.B. wer die Mail geschickt hat, wann sie abgerufen wurde, ...).
:::

### Aktualisierung aller Tickets eines bestimmten Kunden

:::warning
Bitte beachten Sie, dass diese Aktion ressourcenintensiv sein kann. Wenn Sie
viele Tickets haben, kann dies Zammad verlangsamen.
:::

```ruby
Ticket.where(customer_id: 4).update_all(customer_id: 1)
```

### Ticket-Status-Typen abrufen

Hier werden alle Statustypen angezeigt, die für die Erstellung eines neuen
Ticket-Status benötigt werden:

```ruby
Ticket::StateType.pluck(:id, :name)
```

Oben werden sowohl die ID des Typs als auch der Name zurückgegeben - z.B.:

```ansi
`[[1, "neu"], [2, "offen"], ...`.
```

## Benutzer-Befehle

### Benutzer finden

Um Benutzerinformationen zu bearbeiten oder nach bestimmten Informationen zu
suchen, müssen Sie den Benutzer zunächst finden.

ID des Benutzers ist bereits bekannt:

```ruby
User.find(4)
```

Suche nach dem Benutzer über seine E-Mail-Adresse:

```ruby
User.find_by(email: 'your@email')
```

Suche nach dem Benutzer anhand seines Logins:

```ruby
User.find_by(login: 'john.doe')
```

### Gesperrte Benutzerkonten entsperren

:::tip
Das Entsperren eines gesperrten Benutzerkontos wird auch von Zammads UI unterstützt!
:::

Es kann vorkommen, dass ein Benutzer sich selbst aussperrt, indem er mehrmals das
falsche Passwort versucht. Abhängig von der festgelegten maximalen Anzahl an fehlgeschlagenen
Anmeldeversuchen (Standard: 10x), kann Zammad das Konto sperren.

Der Benutzer kann sich nicht mehr anmelden, wenn er das Passwort nicht
ändert oder Sie den Zähler zurücksetzen.

```ruby
u=User.find(**USERID**)
```

```ruby
u.login_failed=0
```

```ruby
u.save!
```

Sie können auch überprüfen, ob das Konto gesperrt ist, indem Sie den
folgenden Befehl ausführen (das Ergebnis muss um 1 höher sein als Ihr Limit,
also 11 bei der Standardeinstellung von 10 fehlgeschlagenen Anmeldungen):

```ruby
User.find(**USERID**).login_failed
```

### E-Mail Adresse des Benutzers ändern / aktualisieren

Bei Bedarf können Sie die E-Mail-Adresse des Benutzers ändern.

:::info
Bitte beachten Sie, dass das Attribut `login` hiervon nicht betroffen ist und
Zammad daher möglicherweise andere Informationen in der Benutzeroberfläche anzeigt.
:::

```ruby
u = User.find(**USERID**)
```

```ruby
u.email = 'user@exmaple.com'
```

```ruby
u.save!
```

Dazu müssen Sie zunächst die ID des Benutzers ermitteln.

### Login-Name des Benutzers ändern / aktualisieren

Ändern Sie den Benutzernamen des Benutzers (z.B. wenn Sie sich mit einem
kürzeren Benutzernamen anstelle einer Mailadresse anmelden möchten)

```ruby
u = User.find(**USERID**)
```

```ruby
u.login = 'user@exmaple.com'
```

```ruby
u.save!
```

Dazu müssen Sie zunächst die ID des Benutzers ermitteln.

### Administratorrechte für Benutzer festlegen

Sie haben keinen Zugriff mehr auf Zammad? Gewähren Sie sich selbst oder
einem anderen Benutzer administrative Rechte.

```ruby
u = User.find_by(email: 'you@example.com')
```

```ruby
u.roles = Role.where(name: ['Agent', 'Admin'])
```

```ruby
u.save!
```

### Passwort für Benutzer festlegen

Sie oder der Benutzer haben Ihr Passwort vergessen? Kein Problem! Setzen Sie
es bei Bedarf einfach von Hand zurück.

```ruby
User.find_by(email: 'you@example.com').update!(password: 'your_new_password')
```

### Passwort für Benutzer entfernen

Wenn Sie nach dem Start eine zweite Authentifizierungsmethode (z.B. LDAP)
hinzugefügt haben, kann in der Benutzerverwaltung von Zammad immer noch ein
Passwort vorhanden sein. In solchen Fällen können sich Benutzer mit ihrem
(lokalen) Zammad-Passwort zusätzlich zu den Zugangsdaten anmelden, die beim
externen Authentifizierungsanbieter gespeichert sind. Entfernen Sie einfach
das von Zammad gespeicherte Passwort.

```ruby
User.find_by(email: 'you@example.com').update!(password: nil)
```

## Gruppen Befehle

### Eine Gruppe finden

```ruby
Group.find_by(name: 'Users').follow_up_possible
```

## Chat-Befehle

### Protokolle der IP-Adressen entfernen

Verwenden Sie den folgenden Befehl, um alle IP-Adresseinträge aus beendeten
Chats zu entfernen, die in den letzten sieben Tagen nicht aktualisiert
wurden:

```ruby
Chat::Session.where(state: 'closed').where('updated_at < ?', 7.days.ago).each do |session|
next if session.preferences['remote_ip'].blank?
```

```ruby
session.preferences.delete('geo_ip')
```

```ruby
session.preferences.delete('remote_ip')
```

```ruby
session.save!(touch: false)
end
```

## Zammad Einstellungen

In diesem Abschnitt finden Sie einige Einstellungen, die Sie auch in der
Zammad-Benutzeroberfläche vornehmen können.

### Auto Shutdown Einstellungen

Legt fest, ob ein automatisches Herunterfahren von Zammad durchgeführt wird,
wenn die Datenbank geändert wurde (z.B. nachdem benutzerdefinierte Attribute
im Objektmanager erstellt wurden).  Das zugrundeliegende System (Systemd,
Docker, Kubernetes) wird dann die Prozesse/Container nach dem Herunterfahren
neu starten. Die Standardeinstellung ist `true`.

Die Einstellung `false` macht nur in sehr seltenen Fällen Sinn und Sie
müssen die Zammad Dienste dann manuell neu starten.

```ruby
Setting.set('auto_shutdown', 'true')
```

### Ticket_hook Einstellung

Damit erhalten Sie den Ticket-Hook, den Sie in dem `[]` vor der
Ticket-Nummer finden. Standardmäßig ist dies `Ticket#` - in einem
produktiven System sollten Sie diese Einstellung nicht ändern.

```ruby
Setting.get('ticket_hook')
```

### FQDN-Einstellung

Ermitteln Sie die aktuelle FQDN-Einstellung von Zammad und passen Sie sie
bei Bedarf an.

:::info
Diese Einstellung hat keine Auswirkungen auf SSL-Zertifikate oder Webserver
Konfigurationen.
:::

Aktuellen FQDN abrufen:

```ruby
Setting.get('fqdn')
```

Legen Sie einen neuen FQDN fest:

```ruby
Setting.set('fqdn', 'new.domain.tld')
```

### HTTP(s) Einstellung

Diese Einstellung gehört indirekt zu Ihrer FQDN-Einstellung und ist relevant
für variablenbasierte URLs (z.B. in Benachrichtigungen), die Zammad
generiert.

:::warning
Diese Einstellung wirkt sich auch auf das CSRF-Token-Verhalten von Zammad aus. Wenn Sie
z.B. auf HTTPs setzen, Sie aber HTTP verwenden, wird die Anmeldung
fehlschlagen!

Die Einstellung hat keinen Einfluss auf SSL-Zertifikate oder die Konfiguration des Webservers.
:::

Abrufen des aktuellen http-Typs:

```ruby
Setting.get('http_type')
```

Ändern Sie den http-Typ in HTTPs:

```ruby
Setting.set('http_type', 'https')
```

### Storage Provider Einstellungen

Die Einstellung des Storage Providers ist bei Standardinstallationen auf
"DB" eingestellt.  Wenn Sie jedoch viele Anhänge erhalten oder eine stark
ausgelastete Installation haben, ist die Verwendung der Datenbank zum
Speichern von Anhängen nicht die empfohlene Lösung.

Abrufen der aktuellen Speichermethode für Anhänge:

```ruby
Setting.get('storage_provider')
```

Ändern der Speicherung von Anhängen in der Datenbank

```ruby
Setting.set('storage_provider', 'DB')
```

Wenn Sie bereits Dateien gespeichert haben und diese verschieben möchten,
können Sie das folgende Beispiel verwenden. Bitte beachten Sie, dass dieser
Vorgang nur in nicht produktiven Umgebungen ausgeführt werden sollte. Falls
Sie ihn in Produktionsumgebungen durchführen müssen, sollten Sie eine
Verzögerung für die Ausführung angeben - andernfalls kann Ihr Zammad nicht
erreichbar sein.

Verschieben von Dateien von DB nach Dateisystem mit einer bestimmten
Verzögerung nach jeder Datei in Sekunden:

```ruby
Store::File.move('DB', 'File', delay_in_sec)
```

Die folgenden Einstellungen sind bei einer Standardinstallation verfügbar:

- `DB` (Datenbank)
- `File` (Dateisystem (`/opt/zammad/storage/`))

### Elasticsearch konfigurieren

Wenn sich Ihre Elasticsearch-Installation ändert, können Sie die folgenden
Befehle verwenden, um sicherzustellen, dass Zammad weiterhin auf
Elasticsearch zugreifen kann.

Ändern Sie die URL von Elasticsearch:

```ruby
Setting.set('es_url', 'http://127.0.0.1:9200')
```

Ändern Sie den Benutzer von Elasticsearch (z.B. für die Authentifizierung):

```ruby
Setting.set('es_user', 'elasticsearch')
```

Ändern Sie das Elasticsearch-Passwort für die Authentifizierung:

```ruby
Setting.set('es_password', 'zammad')
```

Ändern Sie den Indexnamen:

```ruby
Setting.set('es_index', Socket.gethostname + '_zammad')
```

Ignorieren Sie Dateien für die Indizierung nach Dateityp:

```ruby
Setting.set('es_attachment_ignore', %w[.png .jpg .jpeg .mpeg .mpg .mov .bin .exe .box .mbox])
```

Begrenzen Sie die Größe der Anhänge:

```ruby
Setting.set('es_attachment_max_size_in_mb', 50)
```

Schalten Sie die SSL-Verifizierung ein oder aus:

```ruby
Setting.set('es_ssl_verify', 'false')
```

### Proxy aktivieren

Legen Sie einen von Zammad zu verwendenden Proxy fest:

```ruby
Setting.set('proxy', 'proxy.example.com:3128')
```

```ruby
Setting.set('proxy_username', 'some user')
```

```ruby
Setting.set('proxy_password', 'some pass')
```

### Asciifold deaktivieren

Diese Funktion ist standardmäßig aktiviert. Falls Sie eine genauere Suche
benötigen, können Sie sie ausschalten:

```ruby
Setting.set('es_asciifolding', false)
```

Nachdem Sie die Einstellung geändert haben, stellen Sie sicher, dass Sie
[den Suchindex neu
aufbauen](/de/tutorials/connect-config-elasticsearch#den-suchindex-aufbauen-neu-erstellen).

## Versteckte Einstellungen

In diesem Abschnitt finden Sie einige Einstellungen, die Sie nicht in der
Zammad-Benutzeroberfläche finden. Diese Einstellungen könnten nützlich sein,
da sie das Verhalten von Zammad verändern können.

### Alle ausgehenden E-Mails an ein BCC-Postfach senden

Mit dieser Option können Sie alle ausgehenden E-Mails (keine
Benachrichtigungen) an ein bestimmtes Postfach senden. Bitte beachten Sie,
dass es sich dabei nicht um ein Postfach handeln sollte, das Sie bereits
importieren! Dies gilt für alle Gruppen und ist eine globale Einstellung.

```ruby
Setting.set('system_bcc', 'alias@domain.tld')
```

Sie können die aktuelle BCC-Einstellung überprüfen, indem Sie folgendes
ausführen:

```ruby
Setting.get('system_bcc')
```

### Zähler für gruppierte Übersichten aktivieren

Dies ermöglicht einen Ticket-Zähler in jeder Kopfzeile bei gruppierten
Elemente.

Aktivieren Sie den Zähler für gruppierte Übersichten:

```ruby
Setting.set('ui_table_group_by_show_count', true)
```

Zähler für gruppierte Übersichten deaktivieren:

```ruby
Setting.set('ui_table_group_by_show_count', false)
```

Aktuelle Einstellung abrufen (`nil` ist false):

```ruby
Setting.get('ui_table_group_by_show_count')
```

### Standard-Ticket-Typ bei Erstellung

Zammad erlaubt Ihnen, den Standard-Artikeltyp bei der Erstellung eines
Tickets zu definieren. Standardmäßig ist dies ein eingehender Telefonanruf.

Sie können wählen zwischen

- `phone-in` (eingehender Anruf, **Standard**),
- `phone-out` (ausgehender Anruf) und
- `email-out` (ausgehende E-Mail).

```ruby
Setting.set('ui_ticket_create_default_type', 'email-out')
```

Um die aktuelle Einstellung abzurufen, führen Sie den folgenden Befehl aus:

```ruby
Setting.get('ui_ticket_create_default_type')
```

### Hinzufügen einer Warnung bei der Ticket-Erstellung

Wenn Sie Ihren Agenten während der Erstellung eines Tickets einen Hinweis
oder eine Warnung anzeigen möchten, können Sie dies mit dem folgenden Befehl
tun.

Sie können drei verschiedene Warnungen dafür verwenden:

- Eingehende Anrufe `:"phone-in"=>"`
- Ausgehende Anrufe `:"phone-out"=>"`
- Ausgehende E-Mails `:"email-out"=>"`

```ruby
Setting.set('ui_ticket_create_notes', {
      : "phone-in"  => "Sie sind im Begriff, einen eingehenden Anruf zu notieren.",
      : "phone-out" => "Sie sind im Begriff, einen ausgehenden Anruf zu notieren.",
      : "email-out" => "Sie sind im Begriff, eine E-Mail zu versenden."
   })
```

:::info
Sie können diese drei Untereinstellungen unabhängig voneinander verwenden, wenn Sie z.B. keine
Warnung bei eingehenden Anrufen benötigen, entfernen Sie einfach `: "phone-in"=>"`
aus dem Befehl. Die Einstellung selbst wird in einem Hash (`{}`) vorgenommen.
:::

Um zu überprüfen, was derzeit eingestellt ist, können Sie verwenden:

```ruby
Setting.get('ui_ticket_create_notes')
```

### Hinzufügen einer Warnung für den Artikel-Antwortprozess

Wenn Sie Ihren Agenten während der **Antwort** auf einen Ticket-Artikel eine
Warnung ausgeben möchten, können Sie dies mit dem unten stehenden Befehl
tun.

Sie können unterschiedliche Warnungen für verschiedene Kanäle Sichtbarkeiten
von Artikeln vorsehen:

- Interne Notizen `: "note-internal"=>"`
- Öffentliche Notizen `:"note-public"=>"`
- Interne Anrufe `:"phone-internal"=>"`
- Öffentliche Anrufe `: "phone-public"=>"`
- Interne E-Mails `: "email-intern"=>"`
- Öffentliche E-Mails `: "email-public"=>"`

```ruby
Setting.set('ui_ticket_add_article_hint', {
      : "note-internal"  => "Sie schreiben eine |interne Notiz|, die nur Personen aus Ihrer Organisation sehen können.",
      : "note-public"    => "Sie schreiben eine |öffentliche Notiz|.",
      : "phone-internal" => "Sie schreiben eine |interne Telefonnotiz|, die nur Personen aus Ihrer Organisation sehen können.",
      : "phone-public"   => "Sie schreiben eine |öffentliche Telefonnotiz|.",
      : "email-intern"   => "Sie schreiben eine |interne E-Mail|, die nur Personen Ihrer Organisation sehen können.",
      : "email-public"   => "Sie schreiben eine |öffentliche E-Mail|."
   })
```

:::info
Sie können die obigen Beispieleinstellungen unabhängig voneinander verwenden, wenn Sie z.B.
keine Warnung bei internen Anrufen benötigen, entfernen Sie einfach
`: "phone-internal"=>""` in dem Befehl. Die Einstellung selbst ist in der
Form eines Arrays ( `{}` ).
:::

Um zu überprüfen, was derzeit eingestellt ist, können Sie verwenden:

```ruby
Setting.get('ui_ticket_add_article_hint')
```

### E-Mail-Adresse des Kunden bei der Kundenauswahl anzeigen (Ticket-Erstellung)

Standardmäßig zeigt Zammad die E-Mail-Adressen der Kunden nicht an.  Mit der
folgenden Option können Sie dieses Verhalten ändern.

```ruby
Setting.set('ui_user_organization_selector_with_email', true)
```

Abfrage des aktuellen Status dieser Einstellung mit:

```ruby
Setting.get('ui_user_organization_selector_with_email')
```

### Schriftarteneinstellungen für ausgehende HTML-E-Mails ändern

:::info
Einige Clients (wie Outlook) greifen möglicherweise auf andere Einstellungen zurück, 
während es bei anderen funktioniert.
:::

Mit der folgenden Einstellung können Sie die E-Mail-Schriftart von Zammad
anpassen. Diese Einstellung erfordert keinen Neustart des Dienstes.

```ruby
Setting.set("html_email_css_font", "font-family:'Helvetica Neue', Helvetica, Arial, Geneva, sans-serif; font-size: 12px;")
```

Abfrage des aktuellen Status dieser Einstellung mit:

```ruby
Setting.get('html_email_css_font')
```

### Anzahl der offenen Tickets des Kunden hervorheben

Mit dieser Option wird die Anzahl der offenen Tickets des ausgewählten
Kunden erhöht. Sie hebt die Anzahl in verschiedenen Farben hervor, wenn ein
Schwellenwert erreicht wird.

```ruby
Setting.set('ui_sidebar_open_ticket_indicator_colored', true)
```

Für die obigen Einstellungen gelten die folgenden Schwellenwerte. Sie können
diese Werte **nicht** ändern.

| Situation    | keine Hervorhebung | Warnung (orange) | Gefahr (rot) |
|-----------------------|---------------|------------------|--------------|
| **Ticket-Bearbeitung**       | \< 2          | 2                | \>= 3        |
| **Ticket Neu-Erstellung** | 0             | 1                | \>= 2        |

### Tab "Anhang" in der Seitenleiste aktivieren

Diese Option aktiviert einen neuen Tab in der rechten Seitenleiste der
Ticketansicht, der alle Anhänge des aktuell angezeigten Tickets anzeigt.

```ruby
Setting.set('ui_ticket_zoom_sidebar_article_attachments', 'true')
```

### Zeitspanne für die Anzeige des Kundenprofils bei neuen Anrufen

Zammad zeigt den Kundendialog an, wenn ein Anruf dieses Kunden eingeht und
ein Ticket dieses Kunden in diesem Zeitraum existiert. Der Standardzeitraum
ist 30 Tage. Liegt kein Ticket in diesem Zeitraum vor, wird der Kundendialog
nicht automatisch angezeigt.

Setzen Sie den Zeitraum auf 90 Tage:

```ruby
Setting.set('cti_customer_last_activity', '90')
```

### Öffentliche "Notizen" als SLA-relevant einstellen

Normalerweise sind Notizen nicht SLA-relevant. Verwenden Sie den folgenden
Befehl, um öffentlich sichtbare Notizen in die Berechnung der SLA-Einhaltung
einzubeziehen (interne Notizen haben _nie_ Auswirkungen auf die
SLA-Berechnungen). Beachten Sie, dass mit dieser Einstellung die Option zum
Löschen öffentlicher Notizen deaktiviert wird.

:::info
Standardmäßig werden Kunden nicht benachrichtigt, wenn einem Ticket öffentliche Notizen hinzugefügt werden.
Richten Sie einen Trigger ein, wenn Sie dieses Verhalten ändern möchten.
:::

Aktivieren Sie SLA, um Notizen als Kommunikation zu zählen:

```ruby
Ticket::Article::Type.find_by(name:'note').update!(communication: true)
```

Aktivieren Sie SLA, um Notizen als Kommunikation zu ignorieren:

```ruby
Ticket::Article::Type.find_by(name:'note').update!(communication: false)
```

### Prioritätssymbol aktivieren

Um zusätzliche Symbole für die Priorität zu aktivieren, verwenden Sie den
folgenden Befehl:

```ruby
Setting.set('ui_ticket_priority_icons', true)
```

## Andere nützliche Befehle

### E-Mails abrufen

Mit dem folgenden Befehl wird ein manueller Abruf der E-Mail-Kanäle
durchgeführt. Dabei werden auch Fehler angezeigt, die bei diesem Vorgang
auftreten können.

```ruby
Channel.fetch
```

### Fehlgeschlagene E-Mails erneut verarbeiten

Wenn Zammad eine E-Mail abruft, die es nicht analysieren kann (z.B. aufgrund
eines Parserfehlers oder einer fehlerhaften Nachricht), speichert es die
E-Mail in der Datenbank und warnt im Überwachungsbereich darüber.

Im Falle einer fehlerhaften Nachricht (z.B. eine ungültige E-Mail-Adresse in
einem der Header-Felder) müssen Sie die E-Mail möglicherweise manuell
bearbeiten, bevor Zammad sie verarbeiten kann. Führen Sie dazu die folgenden
Schritte aus.

#### Alle fehlgeschlagenen E-Mails in einen lokalen Ordner exportieren

```sh
rake zammad:email_parser:failed_email:export_all`
```

Sie können den Speicherort der exportierten E-Mails in der Ausgabe Ihrer
Konsole finden.  Jedes Mal, wenn Sie einen Export von fehlgeschlagenen
(nicht verarbeitbaren) E-Mails durchführen, wird ein Ordner erstellt, der
alle fehlgeschlagenen E-Mails zum Zeitpunkt der Ausführung enthält.

#### Bearbeiten Sie die E-Mail

Die E-Mail wurde im obigen Schritt exportiert. Nun können Sie sie sich
ansehen und versuchen, sie zu reparieren. Achten Sie darauf, dass der
Dateiname nicht verändert wird, da der Import sonst fehlschlägt.

#### Importieren und erneutes Verarbeiten lokal geänderter E-Mails

Nachdem Sie die E-Mail bearbeitet haben, führen Sie sie folgendes aus:

```sh
rake zammad:email_parser:failed_email:import path/to/your/email.eml
```

Damit werden Ihre Änderungen aus der Datei in die Datenbank übernommen. Sie
können auch den gesamten Ordner als Argument übergeben, so dass alle darin
befindlichen `.eml`-Dateien importiert und erneut verarbeitet werden. Wenn
die erneute Verarbeitung der E-Mail erfolgreich war, wird die Datei
bzw. werden die Dateien gelöscht und der leere Ordner entfernt.

:::tip
Stellen Sie sicher, dass Sie diese Befehle nur vom Zammad-Hauptverzeichnis `/opt/zammad` aus ausführen.
Es kann Probleme geben, wenn Sie versuchen, sie aus dem
erzeugten Unterordner auszuführen.
:::

#### Unerwünschte E-Mails löschen

Unerwünschte E-Mails, z.B. Spam, können Sie nach dem Export mit dem
folgenden Befehl aus der Datenbank löschen:

```sh
rake zammad:email_parser:failed_email:delete path/to/your/email.eml
```

Wenn Sie stattdessen den Exportordner als Argument übergeben, werden alle
enthaltenen E-Mails aus der Datenbank entfernt, ihre Dateien gelöscht und
schließlich der leere Ordner entfernt.

### Befüllen eines Testsystems mit Testdaten

:::danger
Führen Sie dies nicht in einer produktiven Umgebung aus! Dies kann Zammad verlangsamen
und ist schwer rückgängig zu machen!
:::

Der folgende Befehl fügt `50` Agenten, `1000` Kunden, `20` Gruppen, `40`
Organisationen, `5` neue Übersichten und `100` Tickets hinzu. Sie können
jederzeit `0` verwenden, um bestimmte Elemente nicht zu erstellen. Mit
diesem Befehl erstellt Zammad zufällige Daten, die keinen logischen Sinn
ergeben.

```ruby
FillDb.load(agents: 50,customers: 1000,groups: 20,organizations: 40,overviews: 5,tickets: 100,)
```

## Daten löschen

:::danger
☠️ Die hier aufgeführten Befehle führen zu **nicht wiederherstellbarem Datenverlust**! Nur
fortfahren, wenn Sie wissen, was Sie tun und
[ein Backup haben](/de/tutorials/backup-restore)!
:::

### Entfernen von Tickets (und ihren Artikeln)

Löschen eines Tickets (angegeben durch die Datenbank ID):

```ruby
Ticket.find(4).destroy
```

Alle Tickets löschen:

```ruby
Ticket.destroy_all
```

Behalten Sie einige Tickets (angegeben durch die Datenbank ID); löschen Sie
den Rest:

```ruby
tickets_to_keep = [1, 2, 3]
```

```ruby
Ticket.where.not(id: tickets_to_keep).destroy_all
```

### Entfernen von Benutzern

:::warning
Kunden **dürfen nicht** gelöscht werden, solange sie noch Tickets im
System haben.

Daher werden in den folgenden Beispielen nicht nur die angegebenen
Kunden, sondern auch **alle mit ihnen verbundenen Tickets** gelöscht. Untenstehende
Befehle löschen ohne weitere Warnungen.
:::

:::tip
Wenn Sie nicht sicher sind, was Sie tun sollen und mehr darüber erfahren möchten, was Zammad
beim Entfernen von Benutzern tut, sollten Sie stattdessen die UI-Optionen von Zammad
verwenden. Sie finden die Datenschutzfunktion in Zammads Verwaltungsoberfläche unter
_System > Datenschutz_.
:::

Das Entfernen von Benutzern ist auf 2 Arten möglich: Einzelne Benutzer und
mehrere auf einmal.

Entfernen Sie einen einzelnen Benutzer:

```ruby
User.find_by(email: '<email address>').destroy
```

Mehrere Benutzer entfernen:

```ruby
User.where(
      email: ['<email address 1>', '<email address 2>']
   ).destroy_all
```

### Entfernen von Organisationen

:::info
Beim Entfernen einer Organisation werden **nicht** die zugehörigen Kunden gelöscht.
:::

#### Schritt 1: Organisationen auswählen

Nach dem Status "aktiv":

```ruby
organizations = Organization.where(active: false)
```

Nach dem Namen:

```ruby
organizations = Organization.where(name: 'Acme')
```

Bei teilweiser Übereinstimmung mit den Notizen:

```ruby
organizations = Organization.where('note LIKE ?', '%foo%')
```

#### Schritt 2: Vorschau der betroffenen Organisationen

```ruby
puts organizations.map { |org| "ORGANIZATION #{org.name}" }.join("\n")
```

#### Schritt 3: Mit der Löschung fortfahren

```ruby
organizations.each do |org|
    puts %{Preparing deletion of organization "#{org.name}"...}
```

```ruby
org.members.each do |member|
    puts "  Removing #{member.fullname} from organization..."
    member.update!(organization_id: nil)
end
```

```ruby
    puts "  Deleting #{org.name}..."
    org.destroy
   end
```

### Entfernen von Systemdaten

Löschen aller Online-Benachrichtigungen:

```ruby
OnlineNotification.destroy_all
```

Entfernen Sie alle Einträge aus dem Aktivitätsverlauf (Dashboard):

```ruby
ActivityStream.destroy_all
```

Einträge für alle kürzlich angesehenen Objekte (Tickets, Benutzer,
Organisationen) entfernen:

```ruby
RecentView.destroy_all
```

Entfernen Sie alle Historien-Informationen von Tickets, Benutzern und
Organisationen (gefährlich!):

```ruby
History.destroy_all
```

### Zammad Installation zurücksetzen

::: danger

Die folgenden Befehle sind absichtlich unvollständig, Fehlerausgaben leiten Sie
durch die Schritte! Die folgenden Operationen führen zu Datenverlust und sind nur für
die Entwicklung und zum Testen.

Vergessen Sie nicht, Zammad zu stoppen, bevor Sie die Datenbank löschen!
:::

```sh
rake db:drop
```

```sh
rake db:create
```

```sh
rake db:migrate
```

```sh
rake db:seed
```
