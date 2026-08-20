---
order: 3
title: 'Variáveis de ambiente'
---

# Variáveis de ambiente

Encontre as variáveis de ambiente mais importantes abaixo, com valores padrão (como <Badge type="tip" text="badge" />), quando
aplicável. As variáveis para instalações via Docker e pacote podem ser diferentes em alguns casos. Você pode encontrar
outro selo anexado aos nomes das variáveis com o seguinte significado:

- Disponível apenas para instalações via Docker: ::d::
- Disponível apenas para instalações via pacote: ::p::
- Disponível para ambas as variantes de instalação: sem selo

::: tip

Se você quiser usar um arquivo `.env` em implantações do Docker Compose, pode usar o arquivo `.env.dist` fornecido e copiá-lo
para `.env`. Dessa forma, ele será detectado automaticamente pelo Docker Compose e não será sobrescrito durante as atualizações.

:::

## Diversos

`GPG_PATH` ::p::
: define o caminho da sua instalação do GPG. Necessário apenas se você quiser usar versões diferentes do PGP ou se sua instalação
  do PGP for diferente da instalação padrão.

`RAILS_LOG_TO_STDOUT` ::p::
: essa configuração pode ser sobrescrita durante a atualização em instalações via pacote. Use `enabled` para ativar essa opção apenas
  até a próxima atualização. Use `true` para ativá-la permanentemente.

`ZAMMAD_SAFE_MODE` ::p::
: tenha cuidado ao executar comandos do Zammad em sistemas de produção no modo seguro. Embora possa permitir uma saída de emergência para
  certos comandos, há o risco de interromper as operações normais do Zammad.

`ZAMMAD_BIND_IP` ::p:: <Badge type="tip" text="127.0.0.1" />
: o endereço IP ao qual o servidor web está vinculado.

`S3_URL` ::p::
: permite fornecer a configuração do seu provedor de armazenamento S3. Exemplo de valor:
  `https://key:secret@s3.eu-central-1.amazonaws.com/zammad-storage-bucket?region=eu-central-1&force_path_style=true`

## Zammad

`VERSION` ::d:: <Badge type="tip" text="current stable version of Zammad" />
: permite personalizar a tag da imagem do Zammad. Exemplo: `6.3.1-54`. Essa versão padrão pode ser aumentada quando você
  atualizar sua stack Docker do Zammad. Consulte o
  [arquivo env de exemplo](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist){target=_blank}
  para mais detalhes sobre essa variável.

`AUTOWIZARD_JSON` ::d::
: essa variável permite fornecer dados de configuração inicial para sua instância. O Autowizard JSON está fora do escopo
  desta documentação; no entanto,
  [este arquivo de exemplo](https://github.com/zammad/zammad/blob/stable/contrib/auto_wizard_example.json){target=_blank}
  deve ajudar.

`ZAMMAD_HTTP_TYPE` : defina o tipo de HTTP para sua instância. Os valores
possíveis são `http` e `https`.

`ZAMMAD_FQDN` : defina o FQDN para sua instância.

`RAILS_TRUSTED_PROXIES` <Badge type="tip" text="127.0.0.1,::1" />
: essa configuração é importante para a detecção correta de endereços IP de cliente e recursos baseados nisso, como limitação
  de taxa (rate limiting).

  Por padrão, o Zammad confia apenas em proxies localhost. Quaisquer servidores proxy adicionais precisam ser adicionados aqui,
  por endereço IP (se estático) ou por nome de host. Nomes de host são resolvidos durante a inicialização do Zammad, então um reinício é
  necessário sempre que o endereço IP de um servidor proxy mudar.

  Observe que, no contexto Docker, o Zammad pode ver o endereço IP do gateway da rede em vez do endereço IP real do servidor
  proxy, se ele estiver em outra rede.

`ZAMMAD_MANAGE_SESSIONS_JOBS_WORKERS` <Badge type="tip" text="0" />
: permite bifurcar (fork) o processo que despacha os jobs de sessão para seus workers em um processo filho. Valor permitido para
  ativá-lo: `1`.

`ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS` <Badge type="tip" text="0" />
: esse worker lida com as solicitações de IA do Zammad e busca as respostas do provedor de IA configurado. Essa variável
  permite especificar o número de workers a serem executados simultaneamente. `0` significa que uma thread no processo principal é usada, `1`
  significa que um worker separado é criado, etc. O número máximo de workers é `16`. Veja também
  `ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS_THREADS`.

  Usuários de IA auto-hospedada devem ter cuidado ao aumentá-lo; seu serviço de IA pode entrar em colapso. Para usuários de serviço de nuvem de IA
  com uma instância grande do Zammad, pode fazer sentido aumentá-lo para ter algum tipo de paralelização.

`ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS_THREADS` <Badge type="tip" text="5" />
: quantas threads devem ser processadas por um **único** worker de IA (se você executar mais de um processo worker, o valor é
  multiplicado). Isso pode acelerar o processamento de IA, mas esteja ciente de que um worker Ruby só pode abranger 1 núcleo de qualquer forma.
  O número máximo de threads é `16`.

`ZAMMAD_PROCESS_DELAYED_COMMUNICATION_INBOUND_JOBS_WORKERS` <Badge type="tip" text="0" />
: permite a busca simultânea de canais de comunicação de entrada. Útil se você tiver muitos canais e/ou caixas de correio adicionados.
  `0` significa que uma thread no processo principal é usada, `1` significa que um worker separado é criado, etc. O número máximo de
  workers é `16`.

`ZAMMAD_PROCESS_DELAYED_COMMUNICATION_INBOUND_JOBS_WORKER_THREADS` <Badge type="tip" text="1" />
: threads usadas para buscar canais de comunicação de entrada. Quantas threads devem ser processadas por um **único** worker de jobs de
  entrada (se você executar mais de um processo worker, o valor é multiplicado). O número máximo de threads é `16`.

`MEMCACHE_SERVERS` <Badge type="tip" text="Docker: zammad-memcached:11211" /> <Badge type="tip" text="Package: unset" />
: forneça sua própria instância do Memcached ao Zammad, se você já tiver uma. O fallback para instalação via pacote é
  `/opt/zammad/tmp/cache*`.

`REDIS_URL` <Badge type="tip" text="Docker: redis://zammad-redis:6379" /> <Badge type="tip" text="Package: unset" />
: forneça sua própria instância do Redis, se você já tiver uma. O fallback para instalação via pacote é
  `/opt/zammad/tmp/websocket_*`. Veja [Variáveis do Redis](/pt_BR/reference/redis) para uma configuração Sentinel.

## Elasticsearch

`ELASTICSEARCH_ENABLED` ::d:: <Badge type="tip" text="true" />
: definir essa variável como false permitirá que você execute o Zammad sem o Elasticsearch. Observe que recomendamos fortemente
  **contra** fazer isso.

`ELASTICSEARCH_HOST` ::d:: <Badge type="tip" text="zammad-elasticsearch" />
: forneça um nome de host ou endereço para seu cluster externo do Elasticsearch.

`ELASTICSEARCH_PORT` ::d:: <Badge type="tip" text="9200" />
: forneça uma porta diferente para o Elasticsearch, se necessário.

`ELASTICSEARCH_SCHEMA` ::d:: <Badge type="tip" text="http" />
: altere para `https` se seu cluster do Elasticsearch estiver configurado para usar SSL.

`ELASTICSEARCH_NAMESPACE` ::d:: <Badge type="tip" text="zammad" />
: com esse namespace, todos os índices relacionados ao Zammad serão criados. Altere isso se você estiver usando clusters externos.

`ELASTICSEARCH_REINDEX` ::d::
: o índice de pesquisa é reconstruído automaticamente quando nenhum índice pode ser detectado. Se você precisar reconstruir o índice
  de pesquisa manualmente, defina essa variável como `true` ou execute o comando de reindexação manualmente via Docker.

`ELASTICSEARCH_SSL_VERIFY` ::d:: <Badge type="tip" text="true" />
: permite que os scripts do Compose ignorem certificados SSL autoassinados para sua instalação do Elasticsearch, se
  necessário.

`ELASTICSEARCH_HEAP_SIZE` ::d:: <Badge type="tip" text="1G" />
: defina a memória disponível para o Elasticsearch. Se você tiver problemas com o ES e seu desempenho, deve aumentar esse
  valor para um tamanho razoável.

## PostgreSQL

::: tip
As variáveis para instalação via Docker e via pacote são parcialmente diferentes. Verifique o selo de limitação e certifique-se de escolher
a correta. As duas variáveis no final da lista são válidas para ambos os tipos de instalação.
:::

`POSTGRESQL_HOST` ::p:: <Badge type="tip" text="zammad-postgresql" />
: nome de host ou endereço IP do seu servidor PostgreSQL. Caso você use um endereço IPv6, envolva o endereço em colchetes
  (por exemplo, `[2001:db8::2]`).

`POSTGRESQL_PORT` ::p:: <Badge type="tip" text="5432" />
: ajuste a porta do seu servidor PostgreSQL.

`POSTGRESQL_USER` ::p:: <Badge type="tip" text="zammad" />
: o usuário do banco de dados do Zammad.

`POSTGRESQL_PASS` ::p:: <Badge type="tip" text="zammad" />
: a senha do usuário do banco de dados do Zammad.

`POSTGRESQL_DB` ::p:: <Badge type="tip" text="zammad_production" />
: o banco de dados do Zammad a ser usado.

`POSTGRES_HOST` ::d:: <Badge type="tip" text="zammad-postgresql" />
: nome de host ou endereço IP do seu servidor PostgreSQL. Caso você use um endereço IPv6, envolva o endereço em colchetes
(por exemplo, `[2001:db8::2]`).

`POSTGRES_PORT` ::d:: <Badge type="tip" text="5432" />
: ajuste a porta do seu servidor PostgreSQL.

`POSTGRES_USER` ::d:: <Badge type="tip" text="zammad" />
: o usuário do banco de dados do Zammad.

`POSTGRES_PASS` ::d:: <Badge type="tip" text="zammad" />
: a senha do usuário do banco de dados do Zammad.

`POSTGRES_DB` ::d:: <Badge type="tip" text="zammad_production" />
: o banco de dados do Zammad a ser usado.

`POSTGRESQL_OPTIONS` <Badge type="tip" text="?pool=50" />
: parâmetros adicionais do PostgreSQL a serem anexados à URI do banco de dados.

`POSTGRESQL_DB_CREATE` <Badge type="tip" text="true" />
: por padrão, o Zammad cria o banco de dados necessário. Em servidores de banco de dados já existentes, esse padrão pode ser
  problemático.

## Nginx

`NGINX_EXPOSE_PORT` ::d:: <Badge type="tip" text="8080" />
: a porta a ser exposta para acessar a stack do Zammad de fora. Altere isso para outro valor se você já tiver
  um serviço existente escutando nessa porta.

`NGINX_PORT` ::d:: <Badge type="tip" text="8080" />
: a porta interna na qual o serviço Nginx vai escutar.

`NGINX_SERVER_NAME` ::d:: <Badge type="tip" text="_" />
: por padrão, o container Nginx do Zammad responderá a todas as solicitações. Você pode fornecer seu IP/FQDN se quiser.

`NGINX_SERVER_SCHEME` ::d:: <Badge type="tip" text="$scheme" />
: se o container Nginx do Zammad **não for** o servidor upstream (ou seja, você está usando outro proxy na frente do Nginx),
  `$scheme` pode estar incorreto. Você pode definir o esquema correto, `http` ou `https`, se necessário. Defina isso se enfrentar um
  erro `CSRF Token Verification Failed`.

`NGINX_CLIENT_MAX_BODY_SIZE` ::d:: : defina o tamanho máximo de dados que um
cliente pode enviar ao servidor.

`ZAMMAD_RAILSSERVER_HOST` ::d:: <Badge type="tip" text="zammad-railsserver" />
: nome de host do container do servidor Rails.

`ZAMMAD_RAILSSERVER_PORT` ::d:: <Badge type="tip" text="3000" />
: porta do servidor Rails do Zammad.

`ZAMMAD_RAILS_PORT` ::p:: <Badge type="tip" text="3000" />
: porta do servidor Rails do Zammad.

`ZAMMAD_WEBSOCKET_HOST` ::d:: <Badge type="tip" text="zammad-websocket" />
: nome de host do servidor WebSocket do Zammad.

`ZAMMAD_WEBSOCKET_PORT` ::d:: <Badge type="tip" text="6042" />
: porta do servidor WebSocket do Zammad.

## Ajuste de desempenho

Cada uma das configurações abaixo vem com suas próprias contrapartidas. Não
há valores recomendados aqui; a configuração ideal depende dos recursos do
seu sistema e da carga típica da aplicação.

Prossiga com cautela; ao ajustar qualquer uma dessas configurações, há um
ponto a partir do qual o desempenho começará a se deteriorar em vez de
melhorar, ou outros problemas começarão a surgir.

As configurações abaixo podem consumir todas as conexões de banco de dados
disponíveis. Consulte [Configurar servidor de banco de
dados](config-db-server) para mais informações.

`ZAMMAD_WEB_CONCURRENCY`
: permite gerar `n` workers para permitir mais conexões simultâneas para a interface web do Zammad. Caso você tenha aplicado
  [limites de recursos de hardware do Docker](docker-compose-scenarios#limit-resources), a configuração de CPU do zammad-railsserver
  deve corresponder ao valor dessa variável.

`ZAMMAD_PROCESS_SESSION_JOBS_WORKERS`
: quantos processos do worker de sessão executar por vez. Aumentar esse valor pode acelerar jobs em segundo plano (como
  o agendador) quando muitos usuários estão no Zammad ao mesmo tempo. No entanto, não é útil ajustar essa configuração se você tem
  menos de 40 usuários ativos por vez. Aumentar a quantidade desses processos pode consumir muitos recursos!

  Caso você tenha aplicado [limites de recursos de hardware do Docker](docker-compose-scenarios#limit-resources), a configuração de CPU do zammad-scheduler
  deve corresponder à soma de todas as variáveis de configuração de worker.

`ZAMMAD_PROCESS_SCHEDULED_JOBS_WORKERS`
: permite gerar `1` worker independente de jobs agendados para aliviar a pressão do worker em segundo plano do Zammad. Número
  máximo de workers: `1`.

  Caso você tenha aplicado [limites de recursos de hardware do Docker](docker-compose-scenarios#limit-resources), a configuração de CPU do zammad-scheduler
  deve corresponder à soma de todas as variáveis de configuração de worker.

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKERS`
: permite gerar `n` processos worker para aliviar a pressão do worker em segundo plano do Zammad. `0` significa que uma thread no
  processo principal é usada, `1` significa que um worker separado é criado, etc. O número máximo de workers é `16`.

  Caso você tenha aplicado [limites de recursos de hardware do Docker](docker-compose-scenarios#limit-resources), a configuração de CPU do zammad-scheduler
  deve corresponder à soma de todas as variáveis de configuração de worker.

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKER_THREADS`
: threads usadas por **um** processo worker de jobs atrasados (se você tiver mais de um processo worker, é multiplicado pela
  quantidade deles). O número máximo de threads é `16`.

## Configurações do cliente HTTP

Configurações globais de timeout HTTP. Essas variáveis controlam o
comportamento de timeout padrão para o cliente HTTP interno do Zammad ao se
conectar a serviços externos (por exemplo, provedores OAuth, webhooks ou
integrações).

`ZAMMAD_HTTP_OPEN_TIMEOUT` <Badge type="tip" text="30" />
: define o tempo máximo em segundos para aguardar o estabelecimento de uma conexão
  com um servidor remoto (por exemplo, se você tiver uma conexão lenta).

`ZAMMAD_HTTP_READ_TIMEOUT` <Badge type="tip" text="60" />
: define o tempo máximo em segundos para aguardar uma resposta após o estabelecimento de uma conexão (por exemplo, se você tiver
  uma conexão lenta ou tempos de resposta lentos do lado externo).

`ZAMMAD_HTTP_TOTAL_TIMEOUT` <Badge type="tip" text="60" />
: define o tempo total máximo em segundos para a solicitação HTTP completa, englobando o estabelecimento de conexão e
  a leitura da resposta. Este é um teto rígido adicional acima de `ZAMMAD_HTTP_OPEN_TIMEOUT` e
  `ZAMMAD_HTTP_READ_TIMEOUT`.

## Como definir variáveis de ambiente

Depende de como você instalou o Zammad (pacote, Docker). Defina-a via
comando `zammad config`, como você pode ver abaixo, use o método do seu
sistema para definir variáveis via linha de comando (por exemplo, `export
VARIABLE=value`), coloque um arquivo `.env` no diretório, ou até use uma
interface gráfica como o Portainer para defini-las em uma instalação Docker.

Exemplos para instalações via pacote:

Definir OPTION como "value":

``` sh
zammad config:set OPTION=value
```

Obter OPTION:

``` sh
zammad config:get OPTION
```

Remover OPTION:

``` sh
zammad config:unset OPTION
```

Reinicie o Zammad após alterar as configurações:

``` sh
sudo systemctl restart zammad
```
