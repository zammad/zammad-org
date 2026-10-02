---
order: 10
title: 'Notificação por email'
---

# Notificação por email

::: info
Esta página trata da configuração de email de _notificação_ de saída do sistema:
as configurações de SMTP (ou MTA local) que o Zammad usa para enviar as suas
próprias notificações internas, como "um ticket foi atribuído a você", além da
identidade de remetente local (`EmailAddress`) associada a elas. Isso é
diferente de um canal de caixa de correio de tickets / caixa de suporte, que é um
recurso separado e não é abordado nesta página.
:::

## Listar

Permissão necessária: `admin.channel_email`

Solicitação `GET` enviada: `/api/v1/channels_email`

Este é um índice combinado: ele retorna o(s) canal(is) de notificação, o(s)
canal(is) de caixa de correio de tickets e os endereços de remetente locais
em uma única resposta.  A resposta abaixo foi reduzida aos campos relevantes
para a configuração de email de notificação.

::: details

<<< @/fixtures/rest-api/email_notification/get-res.json

:::

::: info
Apenas um canal pode estar com `active: true` por configuração de notificação de cada vez.
Configurar um novo (veja _Configurar_ abaixo) desativa automaticamente
o que estava ativo antes. Na resposta acima, `sendmail`
(id `2`) agora está com `active: false` porque `smtp` (id `1`) foi configurado
depois.
:::

## Configurar

Permissão necessária: `admin.channel_email`

Solicitação `POST` enviada: `/api/v1/channels_email_notification`

::: info
Passe as configurações do adaptador em uma chave `options` de nível superior, como mostrado abaixo.
Outros nomes de chave, como `new_configuration` (o nome do parâmetro da
classe de serviço interna `Service::System::SetEmailNotificationConfiguration`),
não são rejeitados com um erro de validação. Em vez disso, a solicitação falha com um
erro não tratado `undefined method 'downcase' for nil`.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/email_notification/post-req.json

=== Response

<<< @/fixtures/rest-api/email_notification/post-res.json

:::

::::

::: info
Esta chamada tem dupla função: ela testa a conexão ao vivo, enviando um email de teste
real como efeito colateral, e, se o teste for bem-sucedido, salva a
configuração como o canal de notificação ativo na mesma chamada. Não há
etapa separada de "salvar"; `notification_channel_ids` em
`/api/v1/channels_email` reflete imediatamente o novo canal.

Se a conexão não puder ser estabelecida, a resposta é `200 OK` com
`result: invalid` e a configuração salva permanece inalterada.
:::

::: details

<<< @/fixtures/rest-api/email_notification/post-invalid-connection-res.json

:::

::: info
`POST /api/v1/channels_email_probe` não é uma alternativa a este
endpoint para uma configuração apenas de notificação. Ele sempre valida uma caixa de correio _completa_
de entrada e saída (`EmailHelper::Probe.full`). Enviar a ele
configurações SMTP apenas de saída retorna
`{"result": "failed", "reason": "inbound failed"}`, mesmo quando as
configurações de saída estão corretas.
:::

::: details

<<< @/fixtures/rest-api/email_notification/probe-outbound-only-res.json

:::

## Endereço de remetente

A identidade de remetente local usada para emails de notificação de saída é
gerenciada como um recurso `EmailAddress`.

### Listar

Permissão necessária: `admin.channel_email` **ou** `ticket.agent`

Solicitação `GET` enviada: `/api/v1/email_addresses`

Retorna um array de objetos, cada um no formato do objeto único mostrado na
resposta de _Show_ abaixo.

::: details

<<< @/fixtures/rest-api/email_notification/email_addresses/get-res.json

:::

### Mostrar

Permissão necessária: `admin.channel_email` **ou** `ticket.agent`

Solicitação `GET` enviada: `/api/v1/email_addresses/{id}`

::: details

<<< @/fixtures/rest-api/email_notification/email_addresses/get-id-res.json

:::

### Criar

Permissão necessária: `admin.channel_email`

Solicitação `POST` enviada: `/api/v1/email_addresses`

::: info
`channel_id` é uma referência, não um alvo de validação: um ID que não
existe é aceito, e o endereço é então armazenado com `channel_id: null`
e `active: false`. Os endereços costumam ser vinculados a um canal de caixa de correio
de tickets, e não ao canal de notificação.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/email_notification/email_addresses/post-req.json

=== Response

<<< @/fixtures/rest-api/email_notification/email_addresses/post-res.json

:::

::::

### Atualização

Permissão necessária: `admin.channel_email`

Solicitação `PUT` enviada: `/api/v1/email_addresses/{id}`

O formato do payload é idêntico ao de Create. Enviar o payload completo de
Create para o `id` de um endereço existente atualiza esse registro no
lugar. Não cria uma duplicata. A resposta é o registro atualizado, no mesmo
formato da resposta de Create acima.

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/email_notification/email_addresses/put-id-req.json

=== Response

<<< @/fixtures/rest-api/email_notification/email_addresses/put-id-res.json

:::

::::

### Excluir

Permissão necessária: `admin.channel_email`

::: danger
**Esta é uma remoção permanente**

Observe que remover endereços de email não pode ser desfeito.

Os grupos que usam o endereço excluído como endereço de remetente
(`email_address_id`) ficam sem endereço de remetente.
:::

Solicitação `DELETE` enviada: `/api/v1/email_addresses/{id}`

::: details

<<< @/fixtures/rest-api/email_notification/email_addresses/delete-id-res.json

:::
