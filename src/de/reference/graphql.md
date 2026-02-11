---
order: 7
title: 'GraphQL API'
---

# GraphQL API

## Einführung

Neben der [REST API](rest-api/intro) von Zammad können Sie Daten auch über
die leistungsstarke und quelloffene [GraphQL API](https://graphql.org/)
abrufen, bearbeiten und erstellen.

Diese Dokumentation ist nicht dazu gedacht, alles über GraphQL
abzudecken. Sie soll Ihnen ein grundlegendes Verständnis dafür vermitteln,
wie Sie Daten abrufen und erstellen/ändern können, um darauf
aufzubauen. Eine umfassende Anleitung finden Sie in der
[GraphQL-Dokumentation](https://graphql.org/learn/).

GraphQL wird von vielen, auch großen, Webdiensten verwendet. Aufgrund seiner
Effizienz und seiner Funktionen wurde es zu einer Art Industriestandard. Sie
können genau die Daten anfordern, die Sie benötigen, wodurch unnötige
Datenübertragungen und die Suche nach der Nadel im Heuhaufen minimiert
werden.

Das Abrufen des Zammad GraphQL-Schemas (Introspection genannt) ermöglicht
eine automatische Vervollständigung und clientseitige Validierung beim
Schreiben von Requests.

## Erste Schritte

Wenn Sie die folgenden Schritte befolgen, können Sie erfolgreich eine
einfache Anfrage senden und Daten von Zammad empfangen.

### Clients

Um Anfragen zu senden und Antworten zu erhalten, benötigen Sie einen API
Client. Wenn Sie bereits mit APIs zu tun haben, können Sie diesen Abschnitt
überspringen.  Wenn Sie neu auf dem Gebiet sind, suchen Sie nach einem
Client, der Ihren Anforderungen entspricht. Je nach Betriebssystem haben Sie
unterschiedliche Möglichkeiten. Einige Beispiele für beliebte Clients mit
GraphQL-Unterstützung sind:

- [Bruno](https://www.usebruno.com/downloads)
- [Insomnia](https://insomnia.rest/download)
- [Postman](https://www.postman.com/downloads/)

### Authentifizierung

Falls noch nicht vorhanden, erstellen Sie ein [Token im
Zammad-Profil](/de/documentation/use/manage-profile#token-zugriff), das Sie
als API-Benutzer verwenden möchten. Je nachdem, worauf Sie per API zugreifen
wollen, legen Sie die Berechtigungen entsprechend fest.

Achten Sie darauf, dass Sie es vor dem Schließen des Dialogs kopieren, da
Sie es nicht noch einmal sehen können. Falls Sie es versäumt haben,
erstellen Sie einfach ein neues Token.

### Client vorbereiten

Öffnen Sie Ihren API Client und richten Sie ihn ein.

- Fügen Sie Ihr Token von Zammad als Bearer-Token hinzu.
- Erstellen Sie einen Request und fügen Sie Ihre Zammad-Domain mit dem
  Suffix `/graphql` hinzu, z.B. `https://fastlane.inc/graphql`.
- Rufen Sie das GraphQL-Schema von Zammad aus der Introspection ab oder
  laden Sie es aus einer Datei.

::: warning
Die Schema-Introspection ist für Zammad in der Entwicklungsumgebung aktiviert. Um sie für Produktionssysteme zu aktivieren, setzen Sie die
Umgebungsvariable `ZAMMAD_GRAPHQL_INTROSPECTION` auf `true`. Dies vergrößert die potentielle Angriffsfläche und wird
**nicht empfohlen**.
:::

Klicken Sie auf Details, um einen Screencast zu sehen, der die grundlegenden
Schritte mit dem Client Bruno zeigt.

::: details
<video controls="controls" src="/public/videos/graphql-client-setup-bruno.mp4" />
:::

### Einen Request erstellen

Alle Requests und Responses sind im JSON-Format. Das bedeutet, dass alle
Informationen in Klammern gekapselt sein und eine hierarchische Struktur
haben müssen.

Werfen wir einen Blick auf einen Request zum Abrufen von Informationen aus
Zammad. Eine solche Anfrage beginnt mit der Zeichenkette `query`, gefolgt
von dem Objekt, zu dem Sie Informationen abrufen möchten.

Einfaches Beispiel zum Abrufen von Benutzern mit ihrem Vor- und Nachnamen:

```gql :line-numbers
query userName (
  $userId: ID!
  ) {
  user(userId: $userId) {
    firstname
    lastname
  }
}
```

Die `$userId` aus Zeile 2 definiert eine Variable, die als ID verwendet
wird. Geben Sie im Variablenabschnitt Ihres Clients den Wert für diese
Variable an. In diesem Beispiel sieht der Variablen-Abschnitt wie folgt aus:

```json
{
  "userId": "gid://zammad/User/2"
}
```

Der obige Wert ist im Global ID-Format der GraphQL-Implementierung von
Zammad. Je nachdem, mit welchem Objekttyp Sie arbeiten möchten, ersetzen Sie
`User` durch ein anderes Objekt wie `Ticket`, `Organization`, `Group`,
etc. Zammad erwartet einen numerischen Wert als ID.

Die eigentliche Anfrage beginnt mit Zeile 4 im obigen Codeblock. In diesem
einfachen Beispiel werden lediglich die Attribute `firstname` und `lastname`
von dem Benutzer mit der ID 2 abgerufen.

Klicken Sie auf Details, um einen Screencast zu sehen, der einen einfachen
Request unter Verwendung einer Variable in Bruno zeigt.

::: details
<video controls="controls" src="/public/videos/graphql-user-request-variable.mp4" />
:::

Um Daten zu erstellen oder zu ändern, ersetzen Sie `query` durch `mutation`
im Request.

## Beispiele

Die Beispiele verwenden Variablen für die verschiedenen Objekttypen. Stellen
Sie sicher, dass Sie diese bei der Verwendung der Beispiele setzen.

::::tabs

==== Ticket

:::tabs

=== Request

<<< @/fixtures/graphql/ticket-req.gql

=== Response

<<< @/fixtures/graphql/ticket-res.json

:::

==== User

:::tabs

=== Request

<<< @/fixtures/graphql/user-req.gql

=== Response

<<< @/fixtures/graphql/user-res.json

:::

==== Organization

:::tabs

=== Request

<<< @/fixtures/graphql/organization-req.gql

=== Response

<<< @/fixtures/graphql/organization-res.json

:::

::::

## Anhang

### Global IDs

:::info

Ersetzen Sie `{ID}` durch einen numerischen Wert.

:::

- `gid://zammad/Ticket/{ID}`
- `gid://zammad/User/{ID}`
- `gid://zammad/Organization/{ID}`
