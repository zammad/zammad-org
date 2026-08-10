---
order: 3
---

# Конфигурација web сервера

<!--@include: @/sr/modules/zammad-services-hint.md-->

Подесите свој веб сервер да буде обрнути прокси за Zammad апликативни
сервер. Овај водич покрива добављање SSL сертификата, прилагођавање примера
подешавања за Nginx и Apache 2 и поновно учитавање веб сервера да би се
промене примениле.

Примере датотека подешавања за свој веб сервер можете наћи у `contrib/`
директоријуму своје Zammad инсталације. Постоје две датотеке примера по веб
серверу: `zammad.conf` (обичан HTTP) и `zammad_ssl.conf` (HTTPS). Датотека
без SSL-а је намењена само локалном тестирању и не сме се користити у
производном окружењу. Током инсталације Zammad-а путем пакета, пакет
аутоматски копира `zammad.conf` без SSL-а у директоријум подешавања вашег
веб сервера. За производну употребу, замените је са `zammad_ssl.conf` и
пратите кораке на овој страни.

::: info
**Корисници Docker Compose-а / Kubernetes-а:**

Прескочите ову страну. Подесите порт веб сервера, назив сервера и шему преко
`NGINX_*` и `ZAMMAD_RAILSSERVER_*` променљивих на
[страни са променљивама окружења](/en/reference/environment-variables).
:::

## Набавите SSL сертификат

Zammad захтева HTTPS у производном окружењу. Употребите једну од опција
испод да добавите сертификат пре него што наставите са подешавањем веб
сервера.

### Комерцијални орган за издавање сертификата

Купите годишњи сертификат од било ког поузданог јавног CA. Неколико
уобичајених опција су
[Sectigo](https://sectigo.com/ssl-certificates-tls){target=_blank},
[GlobalSign](https://www.globalsign.com/en/managed-ssl){target=_blank} или
[DigiCert](https://www.digicert.com/tls-ssl/){target=_blank}. Инсталирајте
добијени сертификат, кључ и ланац на свој сервер као што бисте то урадили за
било који HTTPS сервис, а затим наставите са подешавањем веб сервера испод.

### Let's Encrypt

Let's Encrypt издаје бесплатне сертификате које је могуће аутоматски
обнављати. Обично се користе два клијента.

::: tabs

=== Certbot

Certbot је најшире коришћен ACME клијент. Пратите изворна
[упутства за инсталацију Certbot-а](https://certbot.eff.org/instructions){target=_blank},
изаберите своју дистрибуцију и одговарајући прикључак за веб сервер у
бирачу и завршите инсталацију. Након инсталације, затражите сертификат
тако што ћете заменити `<webserver>` са `nginx` или `apache` и
`zammad.example.com` својим поддоменом:

```sh
sudo certbot --<webserver> -d zammad.example.com
```

Certbot ће издати сертификат, питати да ли да преусмери HTTP на HTTPS
(изаберите `[1] not redirect` ако планирате да користите пример Zammad
подешавања, које већ обрађује преусмеравање, у супротном изаберите
`[2] redirect`) и организовати аутоматско обнављање када сертификату
остане мање од 30 дана важности.

=== acme.sh

[acme.sh](https://github.com/acmesh-official/acme.sh){target=_blank} је
лаган ACME клијент заснован на љусци и алтернатива Certbot-у, али
подразумевано више не користи Let's Encrypt. Поставите подразумевани CA на Let's
Encrypt пре издавања сертификата:

```sh
acme.sh --set-default-ca --server letsencrypt
```

Издајте сертификат тако што ћете заменити `<webserver-plugin>` са `nginx`,
`apache` или `standalone` и `zammad.example.com` својим поддоменом:

```sh
acme.sh --issue --<webserver-plugin> -d zammad.example.com
```

Инсталирајте сертификат у директоријум по свом избору (нпр.
`/etc/ssl/private/`) и поново учитајте веб сервер после сваког обнављања.
Замените `<webserver-service>` у команди испод одговарајућим
називом systemd сервиса (`nginx`, `apache2` или `httpd`):

```sh
acme.sh --install-cert -d zammad.example.com \
    --cert-file      /etc/ssl/private/zammad.example.com.pem  \
    --key-file       /etc/ssl/private/zammad.example.com.key  \
    --fullchain-file /etc/ssl/private/zammad.example.com.full.pem \
    --reloadcmd     "sudo systemctl force-reload <webserver-service>"
```

Погледајте
[документацију acme.sh](https://github.com/acmesh-official/acme.sh/wiki/How-to-issue-a-cert){target=_blank}
за додатне случајеве употребе.

:::

## Прилагођавање конфигурације web сервера

,

:::: tabs

=== Nginx (default)

**Постављање примера подешавања**

Копирајте пример SSL подешавања у директоријум подешавања вашег Nginx-а:

```sh
sudo cp /opt/zammad/contrib/nginx/zammad_ssl.conf \
    /etc/nginx/sites-available/zammad.conf
```

Најчешћи Nginx директоријуми подешавања:

- `/etc/nginx/conf.d/`
- `/etc/nginx/vhosts.d/`
- `/etc/nginx/sites-available/`

**Прилагодите назив сервера и путање сертификата**

Прилагодите управо копирану датотеку текстуалним уређивачем по свом избору (нпр.
vi или nano). Пронађите обе `server_name` директиве (једну у HTTP
блоку сервера на порту 80, једну у HTTPS блоку сервера на порту 443)
и прилагодите `example.com` поддомену који сте изабрали за своју
Zammad инстанцу.

Сада ћете морати да прилагодите путању и називе датотека својих SSL
сертификата које сте добили у претходним корацима. Прилагодите следеће
директиве својој поставци:

- `ssl_certificate` (ваш SSL сертификат)
- `ssl_certificate_key` (тајни кључ сертификата)
- `ssl_trusted_certificate` (јавни CA сертификат)

Да бисте побољшали HTTPS безбедност, подесите и датотеку Diffie-Hellman
параметара и усмерите `ssl_dhparam` на њу:

```sh
sudo openssl dhparam -out /etc/ssl/dhparam.pem 4096
```

**Поновно учитавање и провера**

Проверите подешавање:

```sh
sudo nginx -t
```

Поново учитајте Nginx:

```sh
sudo systemctl reload nginx
```

=== Apache 2

**Укључите неопходне модуле**

Zammad захтева модуле који нису подразумевано укључени. На Ubuntu-у,
Debian-у и openSUSE-у користите `a2enmod`:

```sh
sudo a2enmod proxy proxy_html proxy_http proxy_wstunnel headers ssl
```

За подршку за HTTP/2 укључите и:

```sh
sudo a2enmod h2 proxy_http2 mpm_event
```

На CentOS-у / RHEL-у уместо тога додајте одговарајуће `LoadModule` линије у
`/etc/httpd/conf/httpd.conf`:

```apache
LoadModule headers_module modules/mod_headers.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_html_module modules/mod_proxy_html.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so
```

Поново покрените Apache након укључивања модула:

```sh
sudo systemctl restart apache2
```

**Постављање примера подешавања**

Копирајте пример SSL подешавања у директоријум подешавања вашег Apache-а:

```sh
sudo cp /opt/zammad/contrib/apache2/zammad_ssl.conf \
    /etc/apache2/sites-available/zammad.conf
```

Најчешћи Apache директоријуми подешавања:

- `/etc/apache2/conf.d/`
- `/etc/httpd/vhosts.d/`
- `/etc/apache2/sites-available/`

Инсталација путем пакета покушава да копира ову датотеку за вас. Не
преименујте је.

**Прилагодите назив сервера и путање сертификата**

Прилагодите управо копирану датотеку текстуалним уређивачем по свом избору (нпр.
vi или nano). Пронађите било коју `ServerName` директиву и прилагодите `example.com`
поддомену који сте изабрали за своју Zammad инстанцу. Прва
`ServerName` (у HTTP VirtualHost-у) подразумевано је `example.com`, а
друга (у HTTPS VirtualHost-у) `localhost`.

Сада ћете морати да прилагодите путању и називе датотека својих SSL
сертификата које сте добили у претходним корацима. Прилагодите следеће
директиве својој поставци:

- `SSLCertificateFile` (ваш SSL сертификат)
- `SSLCertificateKeyFile` (тајни кључ сертификата)
- `SSLCertificateChainFile` (јавни CA сертификат)

Да бисте побољшали HTTPS безбедност, подесите и датотеку Diffie-Hellman
параметара и усмерите `SSLOpenSSLConfCmd DHParameters` на њу:

```sh
sudo openssl dhparam -out /etc/ssl/dhparam.pem 4096
```

**Укључите сајт**

На Ubuntu-у, Debian-у и openSUSE-у:

```sh
sudo a2ensite zammad
```

На CentOS-у / RHEL-у:

```sh
sudo ln -s /etc/httpd/sites-available/zammad_ssl.conf /etc/httpd/sites-enabled/
```

Проверите да ли је `IncludeOptional sites-enabled/*.conf` присутно у
`/etc/apache2/apache2.conf` (Ubuntu, Debian, openSUSE) или
`/etc/httpd/conf/httpd.conf` (CentOS / RHEL).

**Поновно учитавање и провера**

Поново учитајте Apache и проверите подешавање:

```sh
sudo systemctl reload apache2
```

=== Локално тестирање или други прокси сервери

Zammad-ова главна апликација слуша на порту `3000`, а WebSocket
сервер на порту `6042`. Ако постављате сопствени обрнути прокси испред
Zammad-а, преусмерите оба.

Ако су подразумевани портови у конфликту са другим апликацијама на вашем серверу, погледајте
[страну са променљивама окружења](/en/reference/environment-variables) да
их промените.

::: warning
Не излажите Zammad директно интернету. Zammad пружа само
обичан HTTP и био би доступан без аутентификације.
:::

::::

,

Сада посетите свој подешени Zammad домен у прегледачу да бисте дошли до
Zammad интерфејса. Ако уопште не видите Zammad-овог чаробњака за подешавање
или Zammad интерфејс, погледајте [одељак Решавање
проблема](#troubleshooting) испод.

## Решавање проблема

### Подразумевана почетна страна уместо Zammad-а

Ако дођете до подразумеване почетне стране веб сервера уместо до Zammad-а,
вашу `zammad.conf` можда преиначује друга датотека подешавања. Проверите
vhost директоријум за `000-default.conf` или `default.conf` и искључите је.

### DNS се не разрешава

Ако се поддомен не разрешава, још једном проверите DNS записе за свој домен
и сачекајте да се прошире. Замените `zammad.example.com` у следећој команди
својим подешеним Zammad доменом и проверите да ли домен упућује на прави
сервер:

```sh
host zammad.example.com
```

### Грешке CSRF токена

Ако корисници не могу да се пријаве због грешака CSRF токена, ваш ланац веб
сервера можда не прослеђује Zammad-у оригиналну врсту конекције. Реците
проксију директно да је конекција HTTPS.

Nginx
: У подешавању свог виртуелног хоста пронађите
  `proxy_set_header X-Forwarded-Proto` и замените `$scheme` са
  `https`.

Apache 2
: У подешавању свог виртуелног хоста, непосредно пре прве
  `ProxyPass` директиве, убаците:

  ```apache
  RequestHeader set X_FORWARDED_PROTO 'https'
  RequestHeader set X-Forwarded-Ssl on
  ```
