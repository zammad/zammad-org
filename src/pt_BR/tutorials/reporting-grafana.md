---
order: 5
title: 'Relatórios com o Grafana'
---

# Relatórios com o Grafana

::: info
Este guia é sobre o Grafana. Se você quiser usar outra ferramenta, verifique se ela
suporta índices do Elasticsearch. Se sim, você está pronto para começar!
:::

O Grafana é uma aplicação de análise/visualização de terceiros que você pode
conectar ao Zammad (precisamente: ao Elasticsearch). Ele pode acessar o
índice do Elasticsearch e visualizar seus dados do Zammad.

Este guia lhe dará algumas etapas para começar. Para um entendimento mais
profundo, você deve considerar dar uma olhada nos [atributos indexados pelo
Elasticsearch](/pt_BR/reference/es-indexed-attributes) e ler a [documentação
do Grafana](https://grafana.com/docs/){target=_blank}.

Este guia espera que todos os requisitos estejam funcionando. Não cobriremos
configurações principais de cada ferramenta. Observe também que não podemos
ajudá-lo com a configuração da sua ferramenta específica de terceiros.

## Pré-requisitos

Você precisa de:

- Uma instância em execução do Grafana (hospedada ou auto-hospedada) na
  versão 10.3 ou superior
- Acesso de leitura ao seu índice do Elasticsearch
- Uma instância do Zammad na versão 4 ou superior

::: warning
Nunca exponha o Elasticsearch publicamente se você não tiver certeza de como
fazer isso. Especialmente **nunca** sem autenticação! O Zammad
armazena informações **muito sensíveis** dentro do índice do
Elasticsearch.
:::

## Setting up required data sources

**Antes de começarmos:** as fontes de dados sempre seguem o mesmo esquema. Reduzimos
as informações abaixo a `name`, `time field name` e `index name`.
Tudo o mais depende do seu ambiente e está fora do nosso escopo.

:::: tip
Substitua `zammad_production_` pelo prefixo adequado ao seu caso.

Clique em detalhes para ver como consultar o índice.

::: details
Ajuste o seguinte comando ao seu ambiente:

```sh
curl http://localhost:9200/_aliases?pretty=true
```

Isso retornará uma saída como a seguinte:

```json
{
  "zammad_production_knowledge_base_translation" : {
    "aliases" : { }
  },
  "zammad_production_ticket_priority" : {
    "aliases" : { }
  },
  "zammad_production_stats_store" : {
    "aliases" : { }
  },
  "zammad_production_organization" : {
    "aliases" : { }
  },
  "zammad_production_cti_log" : {
    "aliases" : { }
  },
  "zammad_production_group" : {
    "aliases" : { }
  },
  "zammad_production_knowledge_base_answer_translation" : {
    "aliases" : { }
  },
  "zammad_production_ticket" : {
    "aliases" : { }
  },
  "zammad_production_ticket_state" : {
    "aliases" : { }
  },
  "zammad_production_chat_session" : {
    "aliases" : { }
  },
  "zammad_production_user" : {
    "aliases" : { }
  },
  "zammad_production_knowledge_base_category_translation" : {
    "aliases" : { }
  }
}
```

:::
::::

### ES - chat sessions

- Nome do índice: `zammad_production_chat_session`
- Nome do campo de tempo: `created_at`

### ES - CTI log

- Nome do índice: `zammad_production_cti_log`
- Nome do campo de tempo: `start_at`

### ES - ticket articles

- Nome do índice: `zammad_production_ticket`
- Nome do campo de tempo: `article.created_at`

### ES - tickets by closed_at

- Nome do índice: `zammad_production_ticket`
- Nome do campo de tempo: `close_at`

### ES - tickets by created_at

- Nome do índice: `zammad_production_ticket`
- Nome do campo de tempo: `created_at`

### ES - tickets by first_response_at

- Nome do índice: `zammad_production_ticket`
- Nome do campo de tempo: `first_response_at`

Com as fontes de dados acima, você basicamente tem tudo o que precisa para
começar a construir seus próprios painéis.

## Quick start with dashboard template

Se você quiser se inspirar, pode usar nossos painéis de exemplo mencionados
abaixo. Esses painéis também podem ser encontrados no
[GitHub](https://github.com/zammad/grafana-dashboards){target=_blank}.

### Importing a dashboard

No Grafana, selecione _➕ > Import_ (ou qualquer outro lugar que ofereça importar
um painel) e envie o arquivo json que você baixou do Github, ou use o ID do grafana.com,
fornecido como um selo, como <Badge type="tip" text="12345"/> anexado aos títulos
das próximas seções.

Durante a importação, você pode fornecer um nome de painel e uma pasta. Você
também será solicitado a mapear as fontes de dados para o seu ambiente. Se
você usou nossos nomes de fonte de dados acima, pode simplesmente pesquisar
pelo mesmo nome.

### Ticket statistics dashboard <Badge type="tip" text="14222"/>

![Painel de tickets do
Grafana](/screenshots/tutorials/reporting/tickets.png)

#### Dashboard graphs

- abertura e fechamento de tickets[^1]
- artigos criados
- SLA de ticket (no prazo _e_ violação) por tipo[^1][^2]

#### Ticket and article meta information

- distribuição de tickets por grupo
- proporção de remetentes (por exemplo, Cliente/Agente)[^3]
- proporção de tipo de artigo (por exemplo, email, telefone)[^3]
- tipo de conteúdo do artigo
- proporções de escalonamento[^1]
- média de primeira resposta, tempo de atualização e tempo de fechamento[^2]
- top 10 de:
  - organização do cliente do ticket[^1]
  - clientes de ticket[^1]
  - responsáveis por ticket[^1]
  - tempo médio contabilizado no ticket
  - tags de ticket[^1]
- últimos 10 tickets escalonados

#### Required data sources

- `ES - Ticket Articles`
- `ES - Tickets by created_at`
- `ES - Tickets by closed_at`

### Chat-session statistics dashboard <Badge type="tip" text="14224"/>

![Painel de chat do
Grafana](/screenshots/tutorials/reporting/chat-sessions.png)

#### Dashboard graphs

Criações de sessão de chat.

#### Chat session meta information

- top 10 de:
  - tags de chat
  - agentes de chat
  - páginas de saída de chat
  - origens por cidade
- proporção de tópico de chat
- número médio de mensagens dentro de sessões de chat
- tempo médio de chat
- mapa-múndi com países de origem do chat

#### Required data sources

- `ES - Chat Sessions`

### CTI-log statistics dashboard <Badge type="tip" text="14223"/>

![Painel de chamadas do Grafana](/screenshots/tutorials/reporting/calls.png)

#### Dashboard graphs

Número de chamadas por direção (entrada/saída).

#### Chat session meta information

- proporção de chamadas (entrada/saída)
- tempo médio de espera
- tempo médio de conversa
- top 10 de:
  - chamadores (entrada)
  - atendentes de chamada (entrada)

#### Required data sources

- `ES - CTI Log`

[^1]: Alguns valores não estão disponíveis como informação de série temporal. Isso
    significa que só podemos exibir o _último_ valor do campo em questão.

[^2]: Requer que a função de SLA esteja ativa. Valores negativos indicam
    violações de SLA.

[^3]: IDs de referência específicos não são os mesmos em cada instância, e portanto
    o painel pode não funcionar ou mostrar dados incorretos. Verifique a
    descrição dos painéis sobre como encontrar as relações no seu sistema.
