---
order: 5
title: CTI
---

# CTI genérico

## Introdução

Esta página descreve os escopos e funcionalidades genéricos da API CTI.

::: warning

- A autenticação neste endpoint funciona de forma fundamentalmente diferente comparada a
  o restante da API.
- Clientes de API _não_ funcionam com os endpoints CTI, a menos que explicitamente indicado
  pelo fornecedor do cliente!
- Os endpoints CTI são relevantes apenas para sistemas PBX.
:::

## Recursos

Aqui está uma pequena lista condensada das possibilidades que essa API CTI
oferece.

### Entrada

- Funções de registro de chamadas para seus agentes.
- Bloqueio de IDs de chamador durante a sinalização.

### Saída

- Funções de registro de chamadas para seus agentes.
- Definir IDs de chamador de saída dependendo do destino do ID de chamador.

### Endpoint

O endpoint pode ser encontrado na integração CTI genérica e contém um token
único que atua como autenticação. Certifique-se de manter essa URL de
endpoint segura.

::: info
A configuração CTI genérica e o endpoint correto podem ser encontrados no seu
Zammad na interface de administração em _System > Integrations > CTI (generic)_.

Observe também os requisitos e limitações listados ali.
Todas as opções que exigem retornos (por exemplo, bloqueio, manipulação de IDs
de chamador de saída) dependem de configurações dentro da página de integração
CTI do Zammad.
:::

::: tip
Há duas opções de como fazer `POST` dos dados relevantes para o Zammad:

- JSON (recomendado)
- Form-data
:::

### Eventos

Há vários eventos em termos de uma chamada em andamento. Essas ações sempre
vêm do seu sistema PBX e podem ser:

- evento "newCall" (início de uma chamada)
- evento "hangup" (fim da chamada)
- evento "answer" (também conhecido como atender o telefone)

Em algumas situações, o Zammad pode fornecer um retorno em suas chamadas do
PBX (por exemplo, uma rejeição) se você bloqueou um chamador específico. O
Zammad nunca iniciará ações específicas com seu PBX. O Zammad é um
componente passivo em todos os casos descritos.

### Exemplos usados

**Exemplo:**
As chamadas abaixo foram enviadas com a seguinte configuração. Isso é
importante para você entender as respostas que estamos mostrando aqui.

**Saída:**

- ID de chamador de destino `4989*` define ID de chamador de saída
  `498999998145` com nota "All from munich"
- ID de chamador de destino `4930*` define ID de chamador de saída
  `493023125877` "All from Berlin"

**Outras configurações:**

- ID de chamador padrão para chamadas de saída `496990009111`

## Evento de nova chamada

### Geral

`attributes` disponíveis e <Badge type="info" text="sample data" />:

`event` <Badge type="info" text="newCall"/>
:
  Tell Zammad there is a new call.

`from` <Badge type="info" text="4930555716000"/>
:
  Number that initiated the call. Can be `anonymous` as well.

`to` <Badge type="info" text="4930555716000"/>
:
  Number that is being called.

`direction` <Badge type="info" text="in"/>
:
  The call direction. If your agent initiates a call, this will be `out`. Calls
from external side to you are `in`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070"/>
: um ID único para a chamada. O Zammad usará esse ID para identificar uma
  chamada existente com as ações seguintes (por exemplo, atender ou desligar).

`user` <Badge type="info" text="John Doe"/>
: o nome real do(s) usuário(s) envolvido(s). Você pode precisar fornecer parâmetros no estilo
  array (`[]`), dependendo do método de chamada escolhido. Se a direção for `out`,
  este é o nome da(s) pessoa(s) que ligou(aram). Se a direção for `in`, este
  é o nome da(s) pessoa(s) chamada(s).

`queue` <Badge type="info" text="support"/>
: um nome de fila opcional; essa opção é relevante para o filtro de registro de chamadas.
  Este valor é opcional.

### Saída

:::: details

::: tabs key:cti

=== JSON

Solicitação `POST` enviada:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-req.json

Resposta:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-res.json

Comando curl de exemplo:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-req.sh

=== Form-data

Solicitação `POST` enviada:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-form-req

Retorna:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-res.json

Comando curl de exemplo:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-form-req.sh

:::
::::

### Entrada

:::: details

::: tabs key:cti

=== JSON

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-req.json

Resposta:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-res.json

Comando curl de exemplo:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-req.sh

=== Form-data

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-form-req

Retorna:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-res.json

Comando curl de exemplo:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-form-req.sh

:::
::::

### Respostas específicas por situação

Dependendo da direção da chamada escolhida, o Zammad retornará um ID de
chamada (opcionalmente) configurado, ou bloqueará (opcionalmente) um
chamador. Se seu Zammad não tiver configurado uma ou ambas as opções, o
retorno será vazio.

::: info
This has to be supported by your PBX to work.
:::

#### Rejeitar IDs de chamador bloqueados

Se uma nova chamada recebida corresponder a um número a bloquear, o Zammad
retornará o seguinte.

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-blocked-res.json

Se nenhum número a bloquear corresponder, o Zammad retornará o seguinte.

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

::: warning
Seu PBX ainda precisa encerrar a chamada (evento hangup). Caso contrário, a
chamada não apenas aparecerá no registro de chamadas do Zammad, mas também aparecerá como uma
chamada em andamento.
:::

#### Definir ID de chamador de saída específico

Caso sua instância tenha um ID de chamador de sobrescrita correspondente
configurado, o Zammad retornará o seguinte payload.

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-caller-id-res.json

Se nenhuma correspondência de sobrescrita for encontrada, ou você não
configurou nada, o Zammad retornará o seguinte.

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

## Evento de atendimento de chamada

### Geral

`attributes` disponíveis e <Badge type="info" text="sample data" />:

`event` <Badge type="info" text="answer" />:
:
  Tell Zammad that someone answered the call.

`from` <Badge type="info" text="493055571600" />:
:
  Number that initiated the call.

`to` <Badge type="info" text="493055571600" />:
:
  Number that is being called.

`direction` <Badge type="info" text="in" />:
:
  The call direction - if your agent initiates a call, this will be `out`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070" />:
: um ID único para a chamada. O Zammad usará esse ID para identificar uma
  chamada existente com as ações seguintes (por exemplo, atender ou desligar).

`answeringNumber` <Badge type="info" text="493055571600" />:
:   o Zammad procurará um usuário com o valor fornecido; os seguintes atributos serão avaliados na ordem dada:
      - `user.phone`
      - `user.login`
      - `user.if`
    Este valor é opcional.

`user` <Badge type="info" text="John Doe" />:
: o nome real do(s) usuário(s) envolvido(s). Você pode precisar fornecer parâmetros no estilo
  array (`[]`), dependendo do método de chamada escolhido. Se a direção for `out`,
  este é o nome da(s) pessoa(s) que ligou(aram). Se a direção for `in`, este é
  o nome da(s) pessoa(s) chamada(s). Este valor é opcional.

Há duas opções de como fazer `POST` dos dados relevantes para o Zammad.

### Saída

:::: details

::: tabs key:cti

=== JSON

Solicitação `POST` enviada:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-req.json

Resposta:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Comando curl de exemplo:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-req.sh

=== Form-data

Solicitação `POST` enviada:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-form-req

Retorna:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Comando curl de exemplo:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-form-req.sh

:::
::::

### Entrada

:::: details

::: tabs key:cti

=== JSON

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-req.json

Resposta:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Comando curl de exemplo:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-req.sh

=== Form-data

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-form-req

Retorna:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Comando curl de exemplo:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-form-req.sh

:::
::::

## Encerramento de chamada

### Geral

`event` <Badge type="info" text="hangup" />:
:
  Tell Zammad that someone answered the call.

`from` <Badge type="info" text="493055571600" />:
:
  Number that initiated the call.

`to` <Badge type="info" text="493055571600" />:
:
  Number that is being called.

`direction` <Badge type="info" text="in" />:
:
  The call direction - if your agent initiates a call, this will be `out`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070" />:
: um ID único para a chamada. O Zammad usará esse ID para identificar uma
  chamada existente com as ações seguintes (por exemplo, atender ou desligar).

`cause`
:   isso define o motivo do encerramento. O Zammad avalia a causa e indica,
    por exemplo, chamadas perdidas de acordo, no registro de chamadas. Os valores possíveis são:
    - `normalClearing` (uma das partes desligou após a chamada ser estabelecida)
    - `busy` (a parte chamada estava ocupada)
    - `cancel` (o chamador desligou antes de a parte chamada atender)
    - `noAnswer` (a parte chamada rejeitou a chamada. Por exemplo, através de uma configuração DND)
    - `congestion` (a parte chamada não pôde ser alcançada)
    - `notFound` (o número chamado não existe ou a parte chamada está offline)
    - `forwarded` (a chamada foi encaminhada para outra parte)

`answeringNumber` <Badge type="info" text="493055571600" />:
:   o Zammad procurará um usuário com o valor fornecido; os seguintes atributos serão avaliados na ordem dada:
    - `user.phone`
    - `user.login`
    - `user.if`
    Este valor é opcional.

### Saída

:::: details

::: tabs key:cti

=== JSON

Solicitação `POST` enviada:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-req.json

Resposta:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Comando curl de exemplo:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-req.sh

=== Form-data

Solicitação `POST` enviada:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-form-req

Retorna:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Comando curl de exemplo:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-form-req.sh

:::
::::

### Entrada

:::: details

::: tabs key:cti

=== JSON

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-req.json

Resposta:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Comando curl de exemplo:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-req.sh

=== Form-data

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-form-req

Resposta:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Comando curl de exemplo:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-form-req.sh

:::
::::
