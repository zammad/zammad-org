---
order: 2
title: 'Повежи и конфигуриши Elasticsearch'
---

# Повежи и конфигуриши Elasticsearch

<!--@include: @/sr/modules/zammad-services-hint.md-->

Овај водич показује како да повежете Zammad са Elasticsearch-ом.

## Први кораци са Zammad-ом

### Поставите Elasticsearch URL

Поставите адресу Elasticsearch сервера; прилагодите је вашем сценарију.

```sh
zammad run rails r "Setting.set('es_url', 'https://localhost:9200')"
```

### Одељак са значком <Badge type="warning" text="прилагођен текст" />

```sh
zammad run rails r "Setting.set('es_user', 'elastic')"
```

Замените `<password>` оном које сте добили током инсталације Elasticsearch-а. У случају да вам треба нова
лозинка, покрените `/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic`.

```sh
zammad run rails r "Setting.set('es_password', '<password>')"
```

### Миграција на Zammad

#### Add it via Rails console

У случају да инсталирате нови Zammad и нисте већ прошли кроз чаробњак за
почетак, додајте сертификат преко конзоле:

```sh
sudo cat /etc/elasticsearch/certs/http_ca.crt | zammad run rails r "SSLCertificate.create!(certificate: STDIN.read)"
```

#### Додајте преко корисничког интерфејса

У случају да већ имате покренут и конфигурисан Zammad, сертификат можете додати у административним подешавањима Zammad-а
(_Подешавања > Безбедност > SSL сертификати_) као алтернативу. Да бисте приказали и копирали аутоматски генерисани сертификат са
Elasticsearch-а, покрените:

```sh
sudo cat /etc/elasticsearch/certs/http_ca.crt
```

Да бисте га додали у Zammad, отпремите фајл сертификата или налепите садржај
у дијалогу. Уверите се да копирате/налепите и делимитере (нпр. `-----BEGIN
CERTIFICATE-----`).

### Креирај/Обнови индекс претраге

Без навођења језгара процесора која ће се користити:

```sh
zammad run rake zammad:searchindex:rebuild
```

Са навођењем језгара процесора која ће се користити (пример 8):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

## Опционална подешавања

Сакупили смо нека корисна подешавања која бисте могли желети да
примените. За додатне информације погледајте [Elastic
документацију](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html){target=_blank}.

### Именски простор индекса

Корисно приликом повезивања више сервиса или Zammad инстанци на један
Elasticsearch сервер (да би се спречило сударање имена током индексирања).

```sh
zammad run rails r "Setting.set('es_index', Socket.gethostname.downcase + '_zammad')"
```

### Правила индексирања фајл-прилога

Zammad подржава претрагу у фајл-прилогима, што значи да их Elasticsearch
такође мора индексирати. Ограничавање таквог индексирања може помоћи да се
сачувају системски ресурси.

Фајлови са овим екстензијама неће бити индексирани:

```sh
zammad run rails r "Setting.set('es_attachment_ignore',\
[ '.png', '.jpg', '.jpeg', '.mpeg', '.mpg', '.mov', '.bin', '.exe', '.box', '.mbox' ] )"
```

Фајлови већи од ове величине (у MB) неће бити индексирани:

```sh
zammad run rails r "Setting.set('es_attachment_max_size_in_mb', 50)"
```

### Asciifold

Подразумевано, [функција Asciifold у
Elasticsearch-у](https://www.elastic.co/docs/reference/text-analysis/analysis-asciifolding-tokenfilter){target=_blank}
је укључена. Ово може бити корисно ако радите са текстом који садржи
дијакитике и/или умлаутове.

In case you need a more exact search, you can turn it off:

```sh
zammad run rails r "Setting.set('es_asciifolding', false)"
```

### SSL verification

You can disable SSL verification, which is not recommended. Default is
`true`.

```sh
zammad run rails r "Setting.set('es_ssl_verify', false)"
```

If you want to use custom certificates, you can find information about how to use
them in Zammad's admin settings
(_Settings > Security > SSL Certificates_).

## Решавање проблема

::: tip
Неуспешно решавање проблема или неразматрани случај?

Ако не можете да решите свој проблем користећи наведене кораке за отклањање грешака
или не пронађете опис свог специфичног случаја овде, слободно се
[јавите заједници](https://community.zammad.org){target=_blank} ради техничке
помоћи.
:::

### Недостајући подаци у Web интерфејсу / Претраживање: Подаци недостају или су непотпуни

Чест проблем је недостатак података у Web интерфејсу. То могу бити тикети,
чланци, корисници или било шта друго [индексирано од стране
Elasticsearch-а](/en/reference/es-indexed-attributes), а може бити
узроковано недостатком или непотпуношћу индекса.

Ако се суочавате са овим проблемом и инсталирали сте Elasticsearch према
нашем [водичу за инсталацију](/en/tutorials/install-elasticsearch), молимо
вас да пратите ове кораке како бисте се уверили да Elasticsearch ради
исправно.

#### Корак 1: Проверите да ли је Elasticsearch укључен (у раду)

```sh
systemctl статус elasticsearch
```

Ово би требало да испише нешто слично доњем примеру, проверите да ли пише
`Active: active (running)`:

```sh
● elasticsearch.service - Elasticsearch
   Учитано: учитано (/lib/systemd/system/elasticsearch.service; омогућено; подразумевано произвођача: омогућено)
   Активно: активно (покренуто) од уторак 2021-07-20 09:38:21 UTC; пре 1h 4min
   Документација: https://www.elastic.co
   Главни PID: 1790 (јава)
```

У супротном, покушајте да га рестартујете и проверите поново:

```sh
systemctl рестарт elasticsearch
```

::: warning
Ако ово не успе, вероватно је ваш Elasticsearch инсталација оштећена.
Покушајте да потпуно уклоните и поново инсталирате Elasticsearch према
нашем [водичу за инсталацију](/en/tutorials/install-elasticsearch).
:::

#### Корак 2: Проверите да ли Zammad може приступити Elasticsearch-у и поново изградити индексе

Присилно натерајте Zammad да избрише и поново изгради Elasticsearch индексе,
опционо са одређеним бројем CPU језгара за поновно индексирање (пример
`[8]`):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

Ово би требало да покрене поновну градњу индекса и испише њихов напредак:

```sh
Брисање индекса... готово.
Брисање пипелине-а... готово.
Креирање индекса... готово.
Креирање пипелине-а... готово.
Поновно учитавање података...
   - Chat::Session...
      готово за 0 секунди.
   - Cti::Log...
      готово за 0 секунди.

[...]
```

У зависности од перформанси система и количине података, ово може
потрајати. Молимо вас да дозволите овом задатку да се комплетно заврши и
сачекате док се не вратите на конзолу.

Ако ово не успе или избаци грешку, нешто друго је вероватно лоше подешено у
вашој инсталацији. Уверите се да сте пратили комплетну процедуру подешавања
и интеграције Elasticsearch-а према нашем [водичу за
инсталацију](/en/tutorials/install-elasticsearch).

::: tip
У многим ситуацијама када не успете са горе наведеним корацима,
могли бисте да проверите Elasticsearch дневник (лог):
`/var/log/elasticsearch/elasticsearch.log`.
:::

Након завршетка ових корака, требало би да сте потврдили да вам је
Elasticsearch инсталиран и покренут, као и да су индекси поново изграђени.
