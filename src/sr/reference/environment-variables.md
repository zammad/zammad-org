---
order: 3
title: 'Променљиве окружења'
---

# Променљиве окружења

Најважније променљиве окружења са подразумеваним вредностима (као <Badge type="tip" text="badge" />), ако су
применљиве, налазе се испод. Променљиве за Docker инсталације и оне засноване на пакетима могу се разликовати у неким случајевима. Поред имена променљивих можете пронаћи
још један бадге са следећим значењем:

- Инсталација пакета
- Доступно само за инсталације пакета: ::p::
- Доступно за обе варијанте инсталације: без ознаке

::: tip

Уколико желите да користите `.env` датотеку, можете икористити приложену `.env.dist` датотеку и ископирати је у `.env`. На тај начин биће
аутоматски препозната од стране Docker Compose и преживеће ажурирања.

:::

## Разно

`GPG_PATH` ::p::
: Дефинише путању ваше GPG инсталације. Потребно је само ако желите да користите различите верзије PGP-а или ако се ваша PGP
  инсталација разликује од стандардне инсталације.

`RAILS_LOG_TO_STDOUT` ::p::
: Овај постав се може преписати током ажурирања код инсталација пакета. Користите `enabled` да укључите ову опцију само
  до следећег ажурирања. Користите `true` да је укључите трајно.

`ZAMMAD_SAFE_MODE` ::p::
: Будите опрезни приликом покретања Zammad команди на продукцијским системима у сигурносном режиму. Иако може омогућити опцију за заобилажење ограничења за
  одређене команде, постоји могућност да ометá редовне Zammad операције.

`ZAMMAD_BIND_IP` ::p:: <Badge type="tip" text="127.0.0.1" />
: IP адреса на коју је везан web сервер.

`S3_URL` ::p::
: Омогућава вам да наведете конфигурацију вашег S3 провајдера за складиштење. Пример за вредност:
  `https://key:secret@s3.eu-central-1.amazonaws.com/zammad-storage-bucket?region=eu-central-1&force_path_style=true`

## Zammad

`VERSION` ::d:: <Badge type="tip" text="trenutna stabilna verzija Zammada" />
: Омогућава прилагођавање ознаке слике Zammad-а. Пример: `6.3.1-54`. Ова подразумевана верзија се може повећати приликом
  ажурирања вашег Zammad Docker стека. Погледајте
  [пример енв фајла](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist) за више детаља о овој
  променљивој.

`AUTOWIZARD_JSON` ::d::
: Ова променљива вам омогућава да наведете почетне податке за конфигурацију ваше инстанце. JSON Autowizard-a није у домену
  ове документације, међутим
  [овај пример фајла](https://github.com/zammad/zammad/blob/stable/contrib/auto_wizard_example.json) би требало да вам помогне.

`ZAMMAD_HTTP_TYPE` : Одредите тип HTTP-а за вашу инстанцу. Могуће вредности
су `http` и `https`.

`ZAMMAD_FQDN` : Одредите FQDN за вашу инстанцу.

`RAILS_TRUSTED_PROXIES` <Badge type="tip" text="127.0.0.1,::1" />
: Овај постав је важан за исправно откривање IP адреса клијената и функција које на томе заснивају рад, попут ограничавања
  брзине.

  Подразумевано, Zammad верује само локалним proxy серверима. Додатне proxy сервере треба овде додати,
  по IP адреси (ако је статичка) или по хост имену. Host имена се резолују приликом покретања Zammad-а, па је
  потребно поновно покретање када се IP адреса proxy сервера промени.

  Имајте на уму да у Docker контексту Zammad може видети IP адресу мрежног   gateway-a уместо стварне IP адресе proxy сервера
  ако се налази у другој мрежи.

`ZAMMAD_MANAGE_SESSIONS_JOBS_WORKERS` <Badge type="tip" text="0" />
: Омогућава одвајање задатка који дистрибуира сесијске послове на своје раднике у подпроцес. Дозвољена вредност за
  укључивање: `1`.

`ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS` <Badge type="tip" text="0" />
: Овај радник обрађује AI захтеве Zammad-а и дохвата одговоре од конфигурисаног AI провајдера. Ова променљива
  вам омогућава да наведете број радника који ће се покренути истовремено. `0` значи да се користи нит у главном процесу, `1`
  значи да се покреће посебан радник, итд. Максималан број радника је `16`. Погледајте такође
  `ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS_THREADS`.

  Корисници самостално хостованих AI система треба да буду опрезни са повећавањем ове вредности, ваш AI сервис може се срушити. За кориснике AI цлоуд сервиса
  са великом Zammad инстанцом, може бити смислено повећати број радника ради одређеног облика паралелизације.

`ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS_THREADS` <Badge type="tip" text="5" />
: Колико нити треба да обради **један** AI радник (ако покрећете више процеса радника, ова вредност се
  множи). Ово може убрзати обраду AI захтева, али имајте на уму да Ruby радник увек користи само 1 језгро.
  Максималан број нити је `16`.

`ZAMMAD_PROCESS_DELAYED_COMMUNICATION_INBOUND_JOBS_WORKERS` <Badge type="tip" text="0" />
: Омогућава истовремено дохватање улазних комуникационих канала. Корисно ако сте додали много канала и/или сандучића.
  `0` значи да се користи нит у главном процесу, `1` значи да се покреће посебан радник, итд. Максималан број
  радника је `16`.

`ZAMMAD_PROCESS_DELAYED_COMMUNICATION_INBOUND_JOBS_WORKER_THREADS` <Badge type="tip" text="1" />
: Нити које се користе за дохватање улазних комуникационих канала. Колико нити треба да обради **један** радник за
  улазне задатке (ако покрећете више процеса радника, ова вредност се множи). Максималан број нити је `16`.

`MEMCACHE_SERVERS` <Badge type="tip" text="Docker: zammad-memcached:11211" /> <Badge type="tip" text="Package: unset" />
: Наведите своју Memcached инстанцу за Zammad ако већ поседујете једну. Подразумевана резервна путања за
  инсталацију пакета је `/opt/zammad/tmp/cache*`.

`REDIS_URL` <Badge type="tip" text="Docker: redis://zammad-redis:6379" /> <Badge type="tip" text="Package: unset" />
: Наведите своју Redis инстанцу ако већ поседујете једну. Подразумевана резервна путања за
  инсталацију пакета је `/opt/zammad/tmp/websocket_*`. Погледајте [Redis променљиве](/en/reference/redis) за конфигурацију Sentinel-а.

## Elasticsearch

`ELASTICSEARCH_ENABLED` ::d:: <Badge type="tip" text="true" />
: Постављањем ове променљиве на `false` омогућићете покретање Zammad-а без Elasticsearch-а. Имајте на уму да вам топло
  саветујемо **да то не чините**.

`ELASTICSEARCH_HOST` ::d:: <Badge type="tip" text="zammad-elasticsearch" />
: Наведите хост име или адресу за ваш спољни Elasticsearch кластер.

`ELASTICSEARCH_PORT` ::d:: <Badge type="tip" text="9200" />
: Наведите другачији порт за Elasticsearch ако је потребно.

`ELASTICSEARCH_SCHEMA` ::d:: <Badge type="tip" text="http" />
: Промените на `https` ако је ваш Elasticsearch кластер конфигурисан да користи SSL.

`ELASTICSEARCH_NAMESPACE` ::d:: <Badge type="tip" text="zammad" />
: Овим именим простором биће креирани сви индекси везани за Zammad. Промените ово ако користите спољне кластере.

`ELASTICSEARCH_REINDEX` ::d::
: Претраживачки индекс се аутоматски поново гради када не може да детектује постојање индекса. Ако је потребно ручно поновно
  генерисање претраге, поставите ову променљиву на `true` или покрените команду за reindex преко Docker-а ручно.

`ELASTICSEARCH_SSL_VERIFY` ::d:: <Badge type="tip" text="true" />
: Омогућава да скрипте Docker Compose игноришу самопотписане SSL сертификате за вашу Elasticsearch инсталацију ако
  је потребно.

`ELASTICSEARCH_HEAP_SIZE` ::d:: <Badge type="tip" text="1G" />
: Одредите доступну меморију за Elasticsearch. Ако имате проблема са ES-ом или његовим перформансама, повећајте ову
  вредност на разумну величину.

## PostgreSQL

::: tip
Променљиве за Docker и инсталацију пакета су делимично различите. Проверите ознаку ограничења и обавезно одаберите
праве. Обе наведене променљиве на крају листе важе за оба типа инсталације.
:::

`POSTGRESQL_HOST` ::p:: <Badge type="tip" text="zammad-postgresql" />
: Host име или IP адреса вашег PostgreSQL сервера. У случају да користите IPv6 адресу, затворите је у угласте
  заграде (нпр. `[2001:db8::2]`).

`POSTGRESQL_PORT` ::p:: <Badge type="tip" text="5432" />
: Прилагодите порт вашег PostgreSQL сервера.

`POSTGRESQL_USER` ::p:: <Badge type="tip" text="zammad" />
: Корисник базе података за Zammad.

`POSTGRESQL_PASS` ::p:: <Badge type="tip" text="zammad" />
: Лозинка корисника базе података за Zammad.

`POSTGRESQL_DB` ::p:: <Badge type="tip" text="zammad_production" />
: База података која ће се користити за Zammad.

`POSTGRES_HOST` ::d:: <Badge type="tip" text="zammad-postgresql" />
: Host име или IP адреса вашег PostgreSQL сервера. У случају да користите IPv6 адресу, затворите је у угласте
заграде (нпр. `[2001:db8::2]`).

`POSTGRES_PORT` ::d:: <Badge type="tip" text="5432" />
: Прилагодите порт вашег PostgreSQL сервера.

`POSTGRES_USER` ::d:: <Badge type="tip" text="zammad" />
: Корисник базе података за Zammad.

`POSTGRES_PASS` ::d:: <Badge type="tip" text="zammad" />
: Лозинка корисника базе података за Zammad.

`POSTGRES_DB` ::d:: <Badge type="tip" text="zammad_production" />
: База података која ће се користити за Zammad.

`POSTGRESQL_OPTIONS` <Badge type="tip" text="?pool=50" />
: Додатни параметри за PostgreSQL које треба додати на крају URI-ја базе података.

`POSTGRESQL_DB_CREATE` <Badge type="tip" text="true" />
: Подразумевано, Zammad креира потребну базу података. На већ постојећим серверима база података, подразумевана вредност може
  бити проблематична.

## Nginx

`NGINX_EXPOSE_PORT` ::d:: <Badge type="tip" text="8080" />
: Порт који ће бити отворен за приступ Zammad стеку споља. Промените на другу вредност ако већ постоји
  сервис који користи овај порт.

`NGINX_PORT` ::d:: <Badge type="tip" text="8080" />
: Интерни порт који ће користити Nginx сервис.

`NGINX_SERVER_NAME` ::d:: <Badge type="tip" text="_" />
: Подразумевано, контејнер Nginxa за Zammad ће одговарати на све захтеве. Можете навести своју IP / FQDN адресу по жељи.

`NGINX_SERVER_SCHEME` ::d:: <Badge type="tip" text="$scheme" />
: If the Nginx container for Zammad **is not** the upstream server (aka you're using another proxy in front of Nginx)
  `$scheme` may be wrong. You can set the correct scheme `http` or `https` if needed. Set this if you face a
  `CSRF Token Verification Failed` error.

`NGINX_CLIENT_MAX_BODY_SIZE` ::d:: : Одредите максималну величину података
које клијент може послати серверу.

`ZAMMAD_RAILSSERVER_HOST` ::d:: <Badge type="tip" text="zammad-railsserver" />
: Host име контејнера Rails сервера.

`ZAMMAD_RAILSSERVER_PORT` ::d:: <Badge type="tip" text="3000" />
: Port сервиса Rails на Zammad-у.

`ZAMMAD_RAILS_PORT` ::p:: <Badge type="tip" text="3000" />
: Port сервиса Rails на Zammad-у.

`ZAMMAD_WEBSOCKET_HOST` ::d:: <Badge type="tip" text="zammad-websocket" />
: Име хоста web сокет сервера за Zammad.

`ZAMMAD_WEBSOCKET_PORT` ::d:: <Badge type="tip" text="6042" />
: Port web сокет сервера за Zammad.

## Подешавање перформанси

Свака од доњих поставки има своје компромисе. Овде нема препоручених
вредности; оптимална конфигурација зависи од ресурса вашег система и
типичног оптерећења апликације.

Поступајте опрезно; приликом подешавања било које од ових поставки, постоји
тачка након које перформансе почињу да опадају уместо да се побољшавају, или
могу настати други проблеми.

Доње поставке могу потрошити све доступне конекције са базом
података. Размотрите [Конфигурацију базе података](config-db-server) за више
информација.

`ZAMMAD_WEB_CONCURRENCY`
: Омогућава покретање `n` workers-a за више истовремених конекција на Zammad веб интерфејсу. Ако примењујете
  [ограничења хардверских ресурса Docker-а](docker-compose-scenarios#limit-resources), CPU поставка заммад-раилссервер-а
  треба да одговара вредности ове променљиве.

`ZAMMAD_PROCESS_SESSION_JOBS_WORKERS`
: Колико процеса сессион workers-a се покреће истовремено. Повећање ове вредности може убрзати позадинске задатке (као
  што је сцхедулер) када је много корисника истовремено на Zammad-у. Међутим, нема смисла подешавати ову поставку ако имате
  мање од 40 активних корисника истовремено. Повећање броја ових процеса може потрошити много ресурса!

  Ако примењујете [ограничења хардверских ресурса Docker-а](docker-compose-scenarios#limit-resources), CPU поставка заммад-сцхедулер-а
  треба да одговара збиру свих променљивих поставки workers-a.

`ZAMMAD_PROCESS_SCHEDULED_JOBS_WORKERS`
: Омогућава покретање `1` независног workers-a за заказане задатке како би се смањило оптерећење позадинског workers-a Zammad-а. Максималан
  број workers-a: `1`.

  Ако примењујете [ограничења хардверских ресурса Docker-а](docker-compose-scenarios#limit-resources), CPU поставка заммад-сцхедулер-а
  треба да одговара збиру свих променљивих поставки workers-a.

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKERS`
: Омогућава покретање `n` workers процеса како би се смањило оптерећење позадинског workers-a Zammad-а. `0` значи да се користи нит у
  главном процесу, `1` значи да се покреће посебан worker, итд. Максималан број workers-a је `16`.

  Ако примењујете [ограничења хардверских ресурса Docker-а](docker-compose-scenarios#limit-resources), CPU поставка заммад-сцхедулер-а
  треба да одговара збиру свих променљивих поставки workers-a.

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKER_THREADS`
: Нити које користи **један** workers процес за одложене задатке (ако имате више workers процеса, ово се множи са
  њиховим бројем). Максималан број нити је `16`.

## Подешавање профила

Глобалне поставке HTTP тимеоут-а. Ове променљиве контролишу подразумевано
понашање тимеоут-а за Zammad-ов интерни HTTP клијент приликом повезивања на
спољне сервисе (нпр. OAuth провајдере, webhookove или интеграције).

`ZAMMAD_HTTP_OPEN_TIMEOUT` <Badge type="tip" text="30" />
: Дефинише максимално време у секундама чекања да се конекција
  успостави са удаљеним сервером (нпр. ако имате спору конекцију).

`ZAMMAD_HTTP_READ_TIMEOUT` <Badge type="tip" text="60" />
: Дефинише максимално време у секундама чекања одговора након што је конекција успостављена (нпр. ако имате
  спору конекцију или споре временске одзиве на спољној страни).

`ZAMMAD_HTTP_TOTAL_TIMEOUT` <Badge type="tip" text="60" />
: Дефинише максимално укупно време у секундама за комплетни HTTP захтев, укључујући успостављање конекције и
  читање одговора. Ово је додатна апсолутна граница преко ``ZAMMAD_HTTP_OPEN_TIMEOUT`` и
  ``ZAMMAD_HTTP_READ_TIMEOUT``.

## Променљиве окружења

Зависи од начина инсталације Zammad-а (пакет, Docker). Поставите га путем
`zammad config` команде како је приказано испод, користите системски начин
подешавања променљивих преко командне линије (нпр. `export VARIABLE=value)`,
поставите `.env` фајл у директоријум или чак употребите GUI као што је
Portainer за дефинисање овога код Docker инсталације.

Инсталација пакета

Подесите OPTION на "вредност":

``` sh
zammad config:set OPTION=value
```

Дохвати OPTION:

``` sh
zammad config:get OPTION
```

Поништи OPTION:

``` sh
zammad config:unset OPTION
```

Рестартујте Zammad након промене поставки:

``` sh
systemctl старт заммад
```
