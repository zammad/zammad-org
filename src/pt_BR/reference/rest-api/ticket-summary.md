---
order: 20
title: 'Ticket summary'
---

# Ticket summary

## Mostrar/Acionar

Permissão necessária: `ticket.agent`

Solicitação `POST` enviada: `/api/v1/tickets/{ticket id}/summarize`

O endpoint de resumo de ticket usa `POST` porque criar e buscar o resumo
acontecem em uma única operação:

- Se um resumo existe, ele é retornado.
- Se um resumo não existe, a criação é acionada em segundo plano (tarefa
  assíncrona).

Usar `GET` seria incorreto, já que a chamada também pode criar dados. Se
você quiser que um resumo exista, chame o endpoint; se ele ainda não estiver
pronto, tente novamente após pelo menos 30 segundos.

Exemplo de resposta se a geração de um novo resumo acabou de ser acionada
pela solicitação:

::: details

<<< @/fixtures/rest-api/ticket-summary/post-res-null.json

:::

Exemplo de resposta para um resumo existente (por exemplo, para o mesmo
ticket acima, depois de esperar até que a criação tenha terminado):

::: details

<<< @/fixtures/rest-api/ticket-summary/post-res-summary.json

:::
