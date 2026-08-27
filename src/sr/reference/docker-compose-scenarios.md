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
  - Ограничите хардверске ресурсе стацк-а

You can find the files in the [Zammad Docker Compose
repository](https://github.com/zammad/zammad-docker-compose){{target=_blank}}.

## Уопштено

::: tabs

=== Portainer

Пратите [општи приручник за deployment](/en/get-started/installation/docker) и примените следеће промене.

Испод поља "Compose патх" кликните на дугме `Add file`. Ово отвара секцију "Additional патхс" где можете
дефинисати сценарио који желите да користите. Додајте `scenarios/{scenario you want to use}.yml` и замените задњи део у
`{}` заградама именом једног од фајлова сценарија. Можете чак и комбиновати сценарије додавањем додатних путања.

![Portainer konfiguracija dodatnih putanja](/screenshots/get-started/installation/portainer-additional-paths.png)

=== Docker Compose

Пратите прва 2 корака из [општег приручника за deployment](/en/get-started/installation/docker). За покретање стацк-а са
једним или више додатних сценарија, користите следећу команду уместо корака 3 у клонираном фолдеру repo-зиторијума:

``` sh
docker compose -f docker-compose.yml -f scenarios/{scenario you want to use}.yml up -d
```

Замените део унутар `{}` заграда именом фајла једног од сценарија. Можете чак и комбиновати сценарије
додавањем додатних фајлова у складу са горе наведеним примером.

:::

## Омогућавање доступности стека путем HTTPS-а

Ако постављате Zammad за производну употребу, потребно га је заштитити
коришћењем HTTPS конекције. Постоје различити сценарији за постизање овога.

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
