---
order: 2
title: 'Connect and configure Elasticsearch'
---

# Connect and configure Elasticsearch

<!--@include: @/en/modules/zammad-services-hint.md-->

Este guia mostra como conectar o Zammad ao Elasticsearch.

## Conectar o Elasticsearch ao Zammad

### Definir a URL do Elasticsearch

Defina o endereço do servidor Elasticsearch; adapte ao seu cenário.

```sh
zammad run rails r "Setting.set('es_url', 'https://localhost:9200')"
```

### Set the Elasticsearch user and password

```sh
zammad run rails r "Setting.set('es_user', 'elastic')"
```

Substitua `<password>` pela senha que você obteve durante a instalação do Elasticsearch. Caso precise criar uma nova
senha, execute `/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic`.

```sh
zammad run rails r "Setting.set('es_password', '<password>')"
```

### Add certificate to Zammad

#### Add it via rails console

Caso você esteja instalando um novo Zammad e ainda não tenha passado pelo
assistente de configuração inicial, adicione o certificado via console:

```sh
sudo cat /etc/elasticsearch/certs/http_ca.crt | zammad run rails r "SSLCertificate.create!(certificate: STDIN.read)"
```

#### Adicionar via interface

Caso você já tenha um Zammad em execução e configurado, pode adicionar o certificado nas configurações de administração do Zammad
(_Settings > Security > SSL Certificates_) como alternativa. Para mostrar e copiar o certificado gerado automaticamente pelo
Elasticsearch, execute:

```sh
sudo cat /etc/elasticsearch/certs/http_ca.crt
```

Para adicioná-lo no Zammad, envie o arquivo de certificado ou cole o
conteúdo na caixa de diálogo. Certifique-se de copiar/colar os delimitadores
(por exemplo, `-----BEGIN CERTIFICATE-----`) também.

### Build/rebuild the searchindex

Sem especificar núcleos de CPU a usar:

```sh
zammad run rake zammad:searchindex:rebuild
```

Especificando núcleos de CPU a usar (exemplo 8):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

## Optional settings

Reunimos algumas configurações úteis que você pode querer aplicar. Para mais
informações, consulte a [documentação da
Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html){target=_blank}.

### Index namespacing

Útil ao conectar múltiplos serviços ou instâncias do Zammad a um único
servidor Elasticsearch (para evitar colisões de nomes durante a indexação).

```sh
zammad run rails r "Setting.set('es_index', Socket.gethostname.downcase + '_zammad')"
```

### File-attachment indexing rules

O Zammad suporta pesquisa em anexos de arquivo, o que significa que o
Elasticsearch precisa indexá-los também. Limitar essa indexação pode ajudar
a preservar recursos do sistema.

Arquivos com essas extensões não serão indexados:

```sh
zammad run rails r "Setting.set('es_attachment_ignore',\
[ '.png', '.jpg', '.jpeg', '.mpeg', '.mpg', '.mov', '.bin', '.exe', '.box', '.mbox' ] )"
```

Arquivos maiores que este tamanho (em MB) não serão indexados:

```sh
zammad run rails r "Setting.set('es_attachment_max_size_in_mb', 50)"
```

### Asciifold

Por padrão, o [recurso Asciifold do
Elasticsearch](https://www.elastic.co/docs/reference/text-analysis/analysis-asciifolding-tokenfilter){target=_blank}
está habilitado. Isso pode ser útil se você lida com texto que inclui
diacríticos e/ou trema.

Caso você precise de uma pesquisa mais exata, pode desativá-lo via [console
Rails](/pt_BR/reference/rails-commands#disable-asciifold).

## Solução de problemas

::: tip
Solução de problemas sem sucesso ou problema não descrito?

Se você não conseguir resolver seu problema usando as etapas de solução de problemas
fornecidas, ou não encontrar seu problema específico descrito aqui, sinta-se à vontade para
[perguntar à comunidade](https://community.zammad.org){target=_blank} para assistência
técnica.
:::

### Data missing from the web-UI / search data missing or incomplete

Um problema comumente relatado é a falta de dados na interface web. Isso
pode ser tickets, artigos, usuários ou qualquer outra coisa [indexada pelo
Elasticsearch](/pt_BR/reference/es-indexed-attributes), e pode ser causado
por índices ausentes ou incompletos.

Se você está enfrentando esse problema e instalou o Elasticsearch de acordo
com o nosso [guia de instalação](/pt_BR/tutorials/install-elasticsearch),
siga estas etapas para garantir que o Elasticsearch esteja funcionando
corretamente.

#### Step 1: Verify Elasticsearch is running

```sh
sudo systemctl status elasticsearch
```

Isso deve exibir algo como o seguinte; certifique-se de que diga `Active:
active (running)`:

```sh
● elasticsearch.service - Elasticsearch
   Loaded: loaded (/lib/systemd/system/elasticsearch.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2021-07-20 09:38:21 UTC; 1h 4min ago
   Docs: https://www.elastic.co
   Main PID: 1790 (java)
```

Caso contrário, tente reiniciá-lo e verifique novamente:

```sh
sudo systemctl restart elasticsearch
```

::: warning
Se isso falhar, sua instalação do Elasticsearch provavelmente está corrompida.
Tente limpar completamente e reinstalar o Elasticsearch de acordo com o
nosso [guia de instalação](/pt_BR/tutorials/install-elasticsearch).
:::

#### Step 2: Verify Zammad can access Elasticsearch and rebuild the indexes

Force o Zammad a descartar e reconstruir os índices do Elasticsearch,
opcionalmente com um número específico de núcleos de CPU a usar para a
reindexação (exemplo `[8]`):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

Isso deve começar a reconstruir os índices e exibir seu progresso:

```sh
Dropping indexes... done.
Deleting pipeline... done.
Creating indexes... done.
Creating pipeline... done.
Reloading data...
   - Chat::Session...
      done in 0 seconds.
   - Cti::Log...
      done in 0 seconds.

[...]
```

Dependendo do desempenho do sistema e da quantidade de dados, isso pode
levar algum tempo para concluir. Deixe essa tarefa terminar completamente e
aguarde até que ela volte ao console.

Se isso falhar ou gerar um erro, pode haver algo mais errado com sua
instalação. Certifique-se de ter seguido o procedimento completo de
configuração e integração do Elasticsearch, de acordo com nosso [guia de
instalação](/pt_BR/tutorials/install-elasticsearch).

::: tip
Em muitas situações onde você não obtém sucesso com as etapas acima,
você pode querer verificar o arquivo de log do Elasticsearch:
`/var/log/elasticsearch/elasticsearch.log`.
:::

Depois de concluir essas etapas, você deve ter verificado que sua instalação
do Elasticsearch está em execução e reconstruído os índices.
