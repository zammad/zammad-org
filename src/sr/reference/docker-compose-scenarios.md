---
order: 5
title: 'Радно Docker Compose окружење'
---

# Радно Docker Compose окружење

## Преглед

Ако \"ванила\" Zammad стацк не покрива ваш случај употребе, можете користити
један од унапред дефинисаних сценарија. Не препоручујемо мењање Compose
фајлова локално, јер ће тада бити тешко пратити упстреам промене за
стацк. Зато треба да користите методу изградње repo-зиторијума у Portainer-у
или да клонирате repo и редовно га ажурирате, када користите Docker Compose.

Следеће опције проксија приступа су подржане:

- [Омогућавање доступности стацк-а путем
  HTTPS-а](#making-the-stack-available-via-https)
  - Додајте Cloudflare туннел сервис у стацк
  - Додајте Nginx Proxy Manager (NPM) у стацк
  - Додајте спољну Docker мрежу у Nginx
- [Коришћење спољних сервиса](#using-external-services)
  - Elasticsearch инсталација
- [Омогућавање доступности сервиса
  споља](#making-services-externally-available)
  - Elasticsearch инсталација
  - Elasticsearch инсталација
- [Додатни сценарији](#additional-scenarios)
  - Онемогућите сервис за резервне копије
  - Додајте Ollama инстанцу у стацк
  - Add a LibreTranslate instance to the stack
  - Ограничите хардверске ресурсе стацк-а

You can find the files in the [Zammad Docker Compose
repository](https://github.com/zammad/zammad-docker-compose){{target=_blank}}.

## Уопштено

:::: tabs

=== Docker Compose

To use a scenario, list its compose file in the `COMPOSE_FILE` environment variable. Either create a `.env` file or
copy and rename the `.env.dist` in the cloned repository folder. The main compose file must be specified first,
followed by one or more scenarios, separated by a colon (`:`). The files are applied in the order given. Replace the
placeholder in curly brackets with the filename of the scenario you want to use.

**Example with two scenario placeholders:**

``` sh
COMPOSE_FILE=docker-compose.yml:scenarios/{scenario you want to use}.yml:scenarios/{another scenario you want to use}.yml
```

After specifying the scenarios, start the stack with `docker compose up -d`.

::: info

When using the `COMPOSE_FILE` variable, the `docker-compose.override.yml` is not automatically picked up. If you want
to use it, make sure to append it to the environment variable's list.

:::

=== Portainer

Follow the [general deployment guide](/en/get-started/installation/docker) and apply the following changes.

Below the "Compose path" field, click on the `Add file` button. This opens the "Additional paths" section where you
can specify the scenario you want to use. Add `scenarios/{scenario you want to use}.yml` and replace the last part in
`{}` brackets with the name of one of the scenario files. You can even combine the scenarios by adding additional paths.

![Portainer additional paths configuration](/screenshots/get-started/installation/portainer-additional-paths.png)

::::

## Омогућавање доступности стека путем HTTPS-а

Ако постављате Zammad за употребу у продукцији, потребно га је заштитити
коришћењем HTTPS конекције. Постоје различити сценарији за постизање овога:

### Додај Cloudflare Туннел

Ако желите да објавите Zammad на врло практичан начин, можете користити
[Cloudflare](https://www.cloudflare.com/) тунел.

- Користите фајл сценарија `scenarios/add-cloudflare-tunnel.yml` за
  deploysku инсталацију
- Додај поддомен већ постојећем домену у свом Cloudflare панелу
- Креирај тунел за овај поддомен и конфигурирај га да усмерава саобраћај ка
  zammad-nginx сервису са `http://zammad-nginx:8080`
- Унесите свој Cloudflare туннел токен у Zammad стацк користећи променљиву
  окружења `CLOUDFLARE_TUNNEL_TOKEN`

### Додај Nginx Proxy Manager

Веома чест начин постављања web сервиса је коришћење реверсе proxija који се
бави SSL терминацијом. Један од често коришћених алата је Nginx Proxy
Manager (NPM), који се може конфигурисати кроз интерфејс прилично
једноставно. Ако још немате реверсе proxy, ово вам може бити користан
сценарио. Ако већ имате покренут реверсе proxy, пређите на следећи одељак.

- Користите фајл сценарија `scenarios/add-nginx-proxy-manager.yml` за
  deploysku инсталацију
- Унесите свој FQDN за Zammad користећи променљиву окружења `ZAMMAD_FQDN`
- Конфигуришите свој DNS. Изабрани Zammad FQDN треба да показује на IP
  адресу NPM хоста
- Конфигуришите нови proxy хост у свом NPM-у и следите кораке да бисте
  добили SSL сертификат

### Додајте спољну Docker мрежу у Nginx

Ако већ имате реверсе proxy који се брине о SSL терминацији, овај сценарио
је користан. Он додаје спољну Docker мрежу на Zammad-ов укључени Nginx
сервис како би се могао приступити из реверсе proxija који није део мреже
Zammad стацк-а.

- Користите фајл сценарија `scenarios/add-external-network-to-nginx.yml` за
  deploysku инсталацију
- Унесите име своје спољне мреже користећи променљиву окружења
  `ZAMMAD_NGINX_EXTERNAL_NETWORK`

## Коришћење спољних сервиса

### Elasticsearch инсталација

Да ли већ имате покренуту Elasticsearch инстанцу и желите да је користите и
за Zammad? Тада можете онемогућити Elasticsearch сервис у Zammad стацк-у
како бисте уштедели ресурсе.

- Користите фајл сценарија `scenarios/disable-elasticsearch-service.yml` за
  deploysku инсталацију - ово ће искључити уграђени сервис за Elasticsearch
- Користите следеће променљиве окружења да унесете информације о конекцији
  на вашу постојећу Elasticsearch инстанцу:
  - `ELASTICSEARCH_SCHEMA`
  - `ELASTICSEARCH_HOST`
  - `ELASTICSEARCH_PORT`
  - `ELASTICSEARCH_USER`
  - `ELASTICSEARCH_PASS`

## Омогућавање спољне доступности сервиса

Ови сценарији су намењени за повезивање спољних апликација са Zammad
сервисима. У зависности од тога где је хостован ваш спољни сервис, можете
користити један од следећих сценарија.

::: danger

Када излажете Elasticsearch ван стацк-а, обавезно прво подесите променљиву `ELASTICSEARCH_PASS` на прилагођену вредност!
У супротном, ово представља велики безбедносни проблем јер Elasticsearch индекс садржи већину Zammad-ових података.

:::

::: tip

Ако желите да користите TLS, морате се повезати на Elasticsearch путем реверсе proxija.

:::

### Elasticsearch инсталација

Чест пример употребе је коришћење алата за извештавање/висуализацију као што
је Grafana на истом хосту у другом стацк-у. Пошто такви алати морају да
приступе Elasticsearch индексу, мрежа другог стацк-а мора бити додата у
Zammad-ов Elasticsearch контејнер.

- Користите фајл сценарија
  `scenarios/add-external-network-to-elasticsearch.yml` за deploysku
  инсталацију
- Унесите име своје спољне мреже користећи променљиву окружења
  `ZAMMAD_ELASTICSEARCH_EXTERNAL_NETWORK`

### Elasticsearch инсталација

У случају да желите да изложите Elasticsearch сервис Zammad стацк-а у мрежи,
можете доделити хост порт контејнеру. Ово је корисно ако требате да
приступите Elasticsearch контејнеру са другог хоста.

- Користите фајл сценарија `scenarios/add-hostport-to-elasticsearch.yml` за
  deploysku инсталацију
- Подразумевани порт за Elasticsearch је `9200`. Промените га на други порт
  користећи променљиву окружења `ELASTICSEARCH_EXPOSE_HTTP_PORT`

## Додатни сценарији

### Онемогућите сервис за резервне копије

У случају да желите другачије да управљате бацкуп-овима, можете онемогућити
уграђени бацкуп сервис у стацк-у како бисте уштедели ресурсе.

То можете урадити само коришћењем фајла сценарија
`scenarios/disable-backup-service.yml` за deploysku инсталацију.

### Додај Ollama

Можете подићи додатни [Ollama](https://ollama.com/) контејнер како бисте
користили AI функционалности Zammad-а на свом рачунару.

::: info
Ово је намењено за развој или тестирање, јер је покретање продукцијског LLM стацк-а комплексно.
:::

Да бисте deploysali Ollama контејнер унутар Zammad стацк-а, користите фајл
сценарија `scenarios/add-ollama.yml`. Овај прави Ollama контејнер који
аутоматски преузима и сервира `Llama3.2`, тако да је спреман за коришћење и
тестирање AI функција без додатне конфигурације.

Да бисте га користили у Zammad-у, додајте име сервиса и порт
(`http://ollama:11434`) у конфигурацију провидера.

### Add LibreTranslate

You can run an additional
[LibreTranslate](https://libretranslate.com/){target=_blank} container to
power Zammad's article translation on your own hardware. For details on the
integration itself, see the translation services section of the admin
documentation.

To deploy a LibreTranslate container inside the Zammad stack, use the
scenario file `scenarios/add-libretranslate.yml`. The service doesn't
publish any ports to the host; Zammad reaches it inside the stack network as
`http://libretranslate:5000`.

::: tip

The first start takes a while, as the container downloads the language models before the service becomes available.
The models are kept in a Docker volume, so they survive stack restarts.

:::

The scenario supports the following environment variables:

LT_LOAD_ONLY
: Comma-separated list of languages to load, e.g. `en,de,fr`. If unset, all language models are downloaded, which can
  take minutes on cold starts.

LT_UPDATE_MODELS
: Set to `true` to check for updated language models on every stack startup. Only models with a newer available
  version are redownloaded. Without it, the models are downloaded on the first start only.

LT_API_KEYS
: Set to `true` to enable API key support. Each key carries its own allowed requests per minute. To issue a key,
  start the service and run:

  ``` sh
  docker compose exec libretranslate ltmanage keys add 120
  ```

  The number is the allowed requests per minute for this key. The command prints the generated key, which is a UUID
  created by LibreTranslate itself. You can also provide your own key with the `--key` option instead.

LT_REQUIRE_API_KEY_SECRET
: Set to `true` to make API keys mandatory for all requests. Requires
  `LT_API_KEYS=true`.

::: info

LibreTranslate supports many more options. They are described in the
[official documentation](https://docs.libretranslate.com/){target=_blank}, which also lists the environment variables
the container accepts.

:::

Once the stack is up, configure the service in Zammad's admin settings (_System > Integrations > Translation services_):
point the URL to `http://libretranslate:5000` and provide an API key if your instance requires one.

### Ограничи ресурсе

Ако желите да ограничите хардверске ресурсе које Zammad стацк сме да
користи, користите сценариј `scenarios/apply-resource-limits.yml`. Тада се
примењују подразумеване вредности за коришћење CPU-а и меморије за сваки
контејнер у стацк-у. Ове подразумеване вредности можете пронаћи у
`.env.dist` фајлу. Унесите промењене променљиве које желите да користите као
променљиве окружења и deploysajte стацк.

### Остале намене

Ваш сценарио још није покривен? Слободно предложите своју намену. Планирамо
да додамо још уобичајених сценарија коришћења у стацк-у убудуће.

## Прилагођавање Zammad stack-а

Sometimes it's necessary to apply local changes to the Zammad Docker stack,
e.g. to include additional services. If you plan to do so, we recommend that
you do not change the `docker-compose.yml` file, but instead create a local
`docker-compose.override.yml` that includes all your modifications. Docker
Compose will [automatically load this file and merge its changes into your
stack](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/){target=_blank}.
The stack repository ships an inactive example file you can copy and adjust:

``` sh
cp docker-compose.override.yml.dist docker-compose.override.yml
```

Keep in mind that this file is for changing settings of the services that
`docker-compose.yml` already defines. Loading scenarios here is not
supported, use the `COMPOSE_FILE` variable in your `.env` file instead, as
described in the [general usage](#general-usage) section above. If you do,
append this file to that list as well: setting `COMPOSE_FILE` turns off the
automatic pickup of `docker-compose.override.yml`, so your changes here
would otherwise go unused without any warning.
