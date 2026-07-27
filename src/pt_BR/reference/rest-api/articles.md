---
order: 2
title: Article
---

# Article

## Geral

Alguns atributos de artigos podem não ser óbvios ou vir com bastantes opções
- a lista abaixo esperamos que ajude você nessa jornada.

### `content_type`

O Zammad suporta `text/html` para texto formatado em HTML ou `text/plain`
para texto simples. Isso permite ter melhores opções de formatação, se
necessário.

A interface web do Zammad geralmente usa `text/html`.

### `type`

O Zammad suporta um grande número de tipos de artigo. A lista abaixo pode
estar incompleta, dependendo da sua instância e possíveis add-ons/alterações
personalizadas instaladas.

Se não indicado de outra forma, todos os tipos de artigo abaixo são
**artigos de comunicação** e, portanto, afetam o cálculo de SLA nos padrões
do Zammad.

A diferença é que artigos de comunicação oferecem a opção de responder
automaticamente. Quais ações exatamente estão disponíveis depende do tipo de
artigo e, por exemplo, das listas de destinatários.

`email`
: isso permite criar artigos de email de entrada ou saída.
  No entanto, isso depende muito do `sender` escolhido.

`phone` : indica notas de telefone.

`web`
: geralmente usado apenas por clientes. Este tipo é usado sempre que o
  seu cliente usa a interface web para criar artigos.

`note`
: sempre que uma comunicação não se encaixa (por exemplo: notas internas), escolha
  note. O Zammad também usa esse tipo de artigo como fallback padrão.

  Este **não é um artigo de comunicação**.

`sms` : este tipo é usado para a integração de SMS do Zammad.

`chat`
: este tipo de artigo é tecnicamente um placeholder e só está disponível
  via API.

`fax`
: este tipo de artigo é tecnicamente um placeholder e só está disponível
  via API.

`twitter status` e `twitter direct-message`
: esses tipos de artigo são usados pelo canal do Twitter do Zammad. Tecnicamente,
  você pode usá-los para responder automaticamente a solicitações existentes via
  Twitter.

`facebook feed post` e `facebook feed comment`
: esses tipos de artigo são usados pelo canal do Facebook do Zammad. Tecnicamente,
  você pode usá-los para responder automaticamente a solicitações existentes via
  Facebook.

`telegram personal-message`
: usado pelo canal do Telegram do Zammad. Tecnicamente, você pode usá-los para
  responder automaticamente a solicitações existentes via Telegram.

### `internal`

Este atributo permite definir a visibilidade dos seus artigos. Para
visibilidade apenas interna, use `true`; para visibilidade também para seus
clientes, use `false`.

::: warning
**Visibilidade: interno não significa que seja silencioso**

Se você definir um artigo como `internal: true`, mas optar por enviar um email,
tenha ciência de que esse email ainda será enviado!
:::

### `sender`

Indica qual usuário criou o artigo. Você pode escolher entre:

- `Agent`
- `Customer`
- `System`

::: warning
Dependendo da seleção acima, alguns tipos de artigo podem não estar
disponíveis ou se comportar de forma diferente. Esteja ciente de que `System` faz com que os usuários não
consigam ler o corpo (isso funciona de forma semelhante à exibição dos gatilhos do Zammad
nos tickets).
:::

## List articles by ticket

Permissão necessária: `ticket.agent` **ou** `ticket.customer`

Solicitação `GET` enviada: `/api/v1/ticket_articles/by_ticket/{ticket id}`

::: details

<<< @/fixtures/rest-api/ticket_articles/by_ticket/get-ticket-id-res.json

:::

## List specific article

Permissão necessária: `ticket.agent` **ou** `ticket.customer`

Solicitação `GET` enviada: `/api/v1/ticket_articles/{article id}`

::: details

<<< @/fixtures/rest-api/ticket_articles/get-article-id-res.json

:::

## Criar

Permissão necessária: `ticket.agent` **ou** `ticket.customer`

Solicitação `POST` enviada: `/api/v1/ticket_articles`

::: tip
Se você quiser criar artigos em nome de outros usuários (por exemplo, para uma
nota de telefone), use o atributo `origin_by_id`. A permissão `ticket.agent`
é obrigatória para isso.
:::

### Plain article

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_articles/post-plain-req.json

=== Response

<<< @/fixtures/rest-api/ticket_articles/post-plain-res.json

:::
::::

### Article with attached files

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_articles/post-file-req.json

=== Response

<<< @/fixtures/rest-api/ticket_articles/post-file-res.json

:::
::::

### Article with inline images

Imagens inline podem ser usadas fornecendo data URIs na sua marcação HTML.

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_articles/post-inline-req.json

=== Response

<<< @/fixtures/rest-api/ticket_articles/post-inline-res.json

:::
::::

## Receive attachments

Agora que você tem todos esses anexos chiques dentro dos seus tickets, você
pode querer baixar alguns específicos.

Solicitação `GET` enviada: `/api/v1/ticket_attachment/{ticket id}/{article
id}/{attachment id}`

Resposta: `{image file}`

::: tip
Se você não tem certeza de quais artigos um ticket contém, por favor
[liste](#list-articles-by-ticket) os artigos afetados primeiro.
:::
