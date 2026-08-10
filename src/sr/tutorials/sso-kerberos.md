---
order: 13
title: 'Јединствена пријава са Керберосом'
---

# Одељак са значком <Badge type="warning" text="прилагођен текст" />

Овај водич ће објаснити како поставити јединствену пријаву коришћењем
Microsoft Active Directoryja.

## Преглед функција

Као и свака друга веб апликација, Zammad има сопствену логику за
регистрацију корисника, чување лозинки, аутентификацију и управљање
сесијама.

Ако ваше IT одељење одржава сопствено складиште идентитета корисника (попут
Active Directoryja), SSO подршка у Zammad-у омогућава искоришћавање тог
постојећег система аутентификације, тако да свако ко има налог на вашој
локалној интранету 1) аутоматски ће имати налог у Zammad-у и 2) моћи ће да
се пријави једним кликом.

::: tip
Ако немате ову IT инфраструктуру, али желите пријаву једним кликом,
могуће је користити алтернативе као што су GitHub, Google, Facebook и друге.
:::

## Како то уствари функционише?

Након активирања, јединствена пријава омогућава ендпоинт на
`https://your.zammad.host/auth/sso`. Када Zammad сервер прими GET захтев на
овом ендпоинту са валидним корисничким именом у **било ком** од следећих
поља, креира нову сесију за тог корисника:

- `X-Forwarded-User` заглавље захтева
- променљива окружења веб сервера `REMOTE_USER`
- променљива окружења веб сервера `HTTP_REMOTE_USER`

::: info
**Чек. SSO омогућава пријаву само корисничким именом?**

У принципу, да.

**Како је то у реду?**

У овом водичу конфигурисали смо веб сервер (Apache) да прекине све
захтеве ка `/auth/sso` ендпоинту. Уместо да их проследи на
Zammad, Apache иницира процес пријаве са три стране (_Kerberos
аутентификација_) између себе, корисника и сервера Active
Directoryja.

Ако Active Directory не препозна корисника или његову лозинку,
Zammad никада не види захтев и сесија се никада не креира.

**Шта све ово значи?**

То значи да постоји много начина како можете поставити SSO—не морате
пратити овај водич нити користити Active Directory или Kerberos—али ако
не знате шта радите, на крају ћете имати _огроман_
пропуст у безбедности.
:::

## Први кораци

::: tip
**Превише сте заузети да то урадите сами?**

Ту смо за вас. Наши стручњаци нуде прилагођене радионице које ће ваш тим брзо покренути и оснажити.
[Јавите нам се](https://zammad.com/contact){target=_blank}!
:::

Требаће вам:

- Microsoft Active Directory окружење са
  - роот приступ
  - подршка за AES енкрипцију на 256 бита
- Додајте Zammad репозиториј
  - роот приступ
  - комплетно квалификовано име домена (FQDN)
- одређено познавање администрације система (нпр. конфигурација Апацха)

За најбоље резултате подесите LDAP интеграцију како бисте осигурали да су ваши Active Directory и Zammad налози увек синхронизовани. Можете је пронаћи у админ интерфејсу Zammad-а под
_Settings > Security > Third-party Applications_.

## Корак 1: Клонирање GitHub репозиторија

У Kerberos шеми аутентификације, **сервер за аутентификацију** (Active
Directory) мора да одржава заједничке тајне са **услугом** (Zammad). Да би
се то омогућило, на Active Directory-u морамо регистровати **сервице
принципал наме** (SPN) за Zammad.

::: info
Ове упуте су потврђене на Windows Серверу 2016.
:::

### 1a. Креирајте сервисни налог

Можете искористити постојећи сервисни налог ако га имате. Администратор
овлашћења нису потребна; обичан кориснички налог је довољан.

![Skrinsot podešavanja servisnog naloga u Active
Directory-u](/screenshots/tutorials/sso-kerberos/active-directory-service-account-settings.png)

### 1b. Ресетуј лозинку

Ресетујте лозинку сервисног налога након укључивања опције "Овај налог
подржава Kerberos AES 256 бит енкрипцију".

### 1c. Региструјте SPN за Zammad

Замените следеће плацехолдер-е у командама испод:

- `<zammad-host>`: Zammad FQDN
- `<service-acct>`: Корисничко име за пријаву сервисног налога
- `<password>`: Лозинка сервисног налога (Опција `/pass *` се показала као
  нефункционална)
- `<domain>`: Windows домен
- `<master-domain-controller>`: IP/FQD master доменског контролера

Команде испод ће тражити лозинку корисника:

```sh
setspn -s HTTP/<zammad-host> <service-acct>
```

```sh
ktpass /princ HTTP/<zammad-host>@<DOMAIN> \
        /mapuser <service-acct> \
        /crypto AES256-SHA1 \
        /ptype KRB5_NT_PRINCIPAL \
        /pass <password> -SetPass +DumpSalt \
        /target <master-domain-controller> \
        /out zammad.keytab
```

### 1d. Забележите тајни кључ и верзионски број

Излаз горње команде садржи важне податке за Корак 2e испод:

```sh
Using legacy password setting method
Failed to set property 'servicePrincipalName' to 'HTTP/<zammad-host>' on Dn 'CN=Zammad Service,DC=<domain>,DC=<tld>': 0x13.
WARNING: Unable to set SPN mapping data.
If <service-acct> already has an SPN mapping installed for HTTP/<zammad-host>, this is no cause for concern.
Building salt with principalname HTTP/<zammad-host> and domain <domain> (encryption type 18)...
Hashing password with salt "<domain><service-acct>".
Key created.
Output keytab to zammad.keytab:
Keytab version: 0x502
keysize 67 <service-acct>@<domain> ptype 1 (KRB5_NT_PRINCIPAL) vno 3 etype 0x12 (AES256-SHA1) keylength 32 (0x5ee827c30c736dd4095c9cbe146eabc216415b1ddb134db6aabd61be8fdf7fb1) # [!code focus]
```

На последњој линији, обратите пажњу на:

- тајни кључ у загради на крају (**0x5ee827...**)
- верзионски број тајног кључа који претходи `vno` (**3**)

## Корак 2: Уклоните NGINX, подесите Apache + Kerberos

Затим, хост за Zammad мора бити конфигурисан да подржава Kerberos (и да
прихвати аутентификационе креденцијале које пружа Active Directory сервер).

У већини случајева морали бисте прецомпајлирати NGINX из изворног кода са
додатним модулом да омогућите подршку за Kerberos. Да бисмо заобишли овај
проблем, користићемо Apache, који нуди подршку за Kerberos путем плугин
модула.

::: info
Све команде у овом одељку морају се извршити као роот (или са `sudo`).
:::

### 2a. Искључите NGINX

::: warning
Ово ће довести вашу Zammad инстанцу **оффлине** док се Apache у потпуности не конфигурише и не покрене.
:::

Искључите Nginx:

```sh
systemctl стоп nginx
```

Задржите искљученим након поновног покретања:

```sh
$ systemctl дисабле nginx
```

Ако желите да смањите време неактивности, овај корак можете оставити за
крај; само имајте на уму да се Apache неће покренути ако порт који жели да
користи већ користи NGINX.

Ако из било ког разлога не можете да довршите овај водич, једноставно
искључите Apache и поново активирајте NGINX:

::: details

```sh
sudo systemctl stop apache2
```

```sh
sudo systemctl disable apache2
```

```sh
sudo systemctl enable nginx
```

```sh
sudo systemctl start nginx
```

:::

### 2b. Предконфигурација Apache-а

Ова документација подразумева већ функционалну Apache конфигурацију. Пре
наставка, погледајте водич за [конфигурацију web
сервера](/en/tutorials/webserver-config).

### 2c. Инсталирајте додатне зависности за Apache

::: tabs

=== Debian & Ubuntu

```sh
sudo apt update
```

```sh
sudo apt install krb5-user libapache2-mod-auth-gssapi
```

=== CentOS

```sh
sudo yum install krb5-workstation mod_auth_kerb
```

=== OpenSUSE

```sh
sudo zypper ref
```

```sh
sudo zypper install krb5-client apache2-mod_auth_kerb
```

:::

### 2d. Омогућите Apache модуле

SSO захтева модуле који нису омогућени подразумевано. Подразумевано можете
искористити `a2enmod` за ту сврху.

::: tabs

=== a2enmod (Debian & Ubuntu)

```sh
a2enmod auth_gssapi rewrite
```

```sh
sudo systemctl restart apache2
```

=== a2enmod (OpenSUSE)

```sh
a2enmod auth_kerb rewrite
```

```sh
sudo systemctl restart apache2
```

=== виа цонфигуратион филе (CentOS)

Додајте или укључите одговарајуће `LoadModule` директиве у вашој Apache конфигурацији:

```apache
# /etc/httpd/conf/httpd.conf

LoadModule auth_kerb_module /usr/lib/apache2/modules/mod_auth_kerb.so
LoadModule rewrite_module modules/mod_rewrite.so
```

:::

### 2e. Конфигуришите Kerberos

Конфигурација Kerberos домене одређује начин на који ће Zammad сервер
комуницирати са _контролером домене_ (сервером Active Directory).

Замените следеће плацехолдер-е у примеру конфигурације испод:

- `<domain>`: Windows домен
- `<domain-controller>`: IP/FQDN(и) контролера домене
- `<master-domain-controller>`: IP/FQDN главног контролера домене (не сме
  бити само за читање, али може бити исти као `<domain-controller>`)

```ini
# /etc/krb5.conf

[либдефаултс]
   дефаулт_реалм = <DOMAIN>

   default_tkt_enctypes = aes256-цтс-хмац-sha1-96
   default_tgs_enctypes = aes256-цтс-хмац-sha1-96
   permitted_enctypes = aes256-цтс-хмац-sha1-96

   kdc_timesync = 1
   ccache_type = 4
   forwardable = фалсе
   proxiable = фалсе
   фцц-мит-тицкетфлагс = фалсе

[реалмс]
         # више КДЦ дозвољено (једна `kdc = ...` дефиниција по линији)
         <DOMAIN> = {
                  кдц = <domain-controller>
                  админ_сервер = <master-domain-controller>
                  дефаулт_домаин = <domain>

                  # испод важи само за GSSAPI
                  аутх_то_лоцал = RULE:[1:$1@$0](.*@<domain>)с/@<domain>$//
                  аутх_то_лоцал = DEFAULT
         }

[домаин_реалм]
         .<domain> = <DOMAIN>
         <domain> = <DOMAIN>
```

### 2f. Генеришите keytab

Apache-у је потребан Kerberos _keytab_ (табела кључева) за управљање
заједничким тајнама са контролером домене.

Замените следеће плацехолдер-е у командама испод:

- `<zammad-host>`: Zammad FQDN
- `<domain>`: Windows домен
- `<secret-key>`: Тајни кључ (**изоставите почетно** `0x`)
- `<vno>`: Верзија тајног кључа

Тајни кључ и број верзије пронађени су у `sso-register-spn` (Корак 1d)
изнад.

Унесите команду ктутил:

```sh
ktutil
```

Додајте keytab:

```sh
ktutil: addent -key -p HTTP/<zammad-host>@<DOMAIN> -k <vno> -e aes256-cts
Key for HTTP/<zammad-host>@<domain> (hex): <secret-key>
```

Потврдите да је унос успешно додат:

```sh
ktutil: list
slot KVNO Principal
---- ---- ---------------------------------------------------------------
   1    3 HTTP/<zammad-host>@<DOMAIN>
```

Запишите keytab на диск:

```sh
ktutil: wkt /root/zammad.keytab
```

Напустите ктутил:

```sh
ktutil: quit
```

Затим, поставите keytab у директоријум за конфигурацију Apache-а и подесите
одговарајућа права:

::: tabs

=== Debian, Ubuntu, OpenSUSE

```sh
sudo mv /root/zammad.keytab /etc/apache2/
```

```sh
sudo chown root:www-data /etc/apache2/zammad.keytab
```

```sh
sudo chmod 640 /etc/apache2/zammad.keytab
```

=== CentOS

```sh
sudo mv /root/zammad.keytab /etc/httpd/
```

```sh
sudo chown root:apache /etc/httpd/zammad.keytab
```

```sh
sudo chmod 640 /etc/httpd/zammad.keytab
```

:::

### 2g. Конфигуришите Apache

Додајте следећу директиву на крај датотеке конфигурације виртуелног домена
да бисте креирали своју Kerberos SSO крајњу тачку на `/auth/sso`:

Замените следеће плацехолдер-е у конфигурацији испод:

- `<zammad-host>`: Zammad FQDN
- `<domain>`: Windows домен

::: tabs

=== Debian & Ubuntu

``` apache
# /etc/apache2/sites-available/zammad.conf

<LocationMatch "/auth/sso">
   SSLRequireSSL
   AuthType GSSAPI
   AuthName "Vaš Zammad"
   GssapiBasicAuth On
   GssapiCredStore keytab:/etc/apache2/zammad.keytab
   GssapiLocalName On
   require valid-user

   RewriteEngine On
   RewriteCond %{LA-U:REMOTE_USER} (.+)
   RewriteRule . - [E=RU:%1,NS]
   RequestHeader set X-Forwarded-User "%{RU}e" env=RU
</LocationMatch>
```

=== CentOS & OpenSUSE

Концепција за CentOS и опенСУСЕ испод садржи две
`Krb5KeyTab` линије! Задржите само ону коју вам треба.

``` apache
# /etc/apache2/sites-available/zammad.conf

<LocationMatch "/auth/sso">
   SSLRequireSSL
   AuthType Kerberos
   AuthName "Vaš Zammad"
   KrbMethodNegotiate On
   KrbVerifyKDC On
   KrbMethodK5Passwd On
   KrbAuthRealms <DOMAIN>
   KrbLocalUserMapping on                 # uklanja @REALM sufiks iz promenljive REMOTE_USER
   KrbServiceName HTTP/<zammad-host>@<DOMAIN>
   Krb5KeyTab /etc/apache2/zammad.keytab  # Ubuntu, Debian i openSUSE
   Krb5KeyTab /etc/httpd/zammad.keytab    # CentOS
   require valid-user

   RewriteEngine On
   RewriteCond %{LA-U:REMOTE_USER} (.+)
   RewriteRule . - [E=RU:%1,NS]
   RequestHeader set X-Forwarded-User "%{RU}e" env=RU
</LocationMatch>
```

:::

### 2g. Рестартујте Apache да примените промене

```sh
systemctl рестарт apache2
```

## Корак 3: Укључите SSO пријаву за Zammad

Затим, омогућите "Аутентификацију путем SSO" у Администраторском панелу Zammad-а под
_Сетиње > Безбедност > Апликације трећих страна_

::: tip
На старијим верзијама Zammad-а посетите `https://vaš.zammad.host/auth/sso`
да се пријавите.
:::

## Корак 4: Конфигуришите клијентски систем (само за Windows)

За потпуно искуство SSO (односно, пријаву једним кликом без лозинке),
корисници Zammad-а морају:

1. бити на локалном интранету сервера Active Directory; и
2. изменити своја мрежна подешавања за домаћина Zammad-а да би се третирао
   као сервер локалног интранета.

Без овог корака, корисници морају унети своја креденцијала Active Directory
током SSO.

:::: tabs

=== IE / Edge / Chromium

::: tip
Ово подешавање се може централно управљати на целом интранету користећи
**објекат групне политике** (GPO).
:::

1. У Опцијама интернета додајте FQDN свог Zammad-а под _Безбедност > Локални
   интранет > Сајтови > Напредно_.
2. Означите "Захтевај проверу сервера (хттпс:) за све сајтове у овој
   зони".
3. У оквиру _Ниво безбедности за ову зону > Прилагођени ниво... > Подешавања
   \> Корисничка аутентификација > Пријава_, изаберите "Аутоматска пријава само у
   зони интранета".

=== Firefox

::: info
Ова опција се не може централно управљати јер се подешава у
претраживачу, а не у Windows Подешавањима.
:::

1. У адресну траку унесите `about:config`. Кликните **Прихваташ ризик и
   настављам**.
2. Пронађите опцију `network.negotiate-auth.trusted-uris`.
3. Двапут кликните за уређивање и додајте FQDN свог Zammad-а.
4. Рестартујте Firefox да примените промене.

::::

## Решавање проблема

- Да ли су сви релевантни FQDN/хостнаме-и доступни са сервера Active
  Directory и Zammad (укључујући међусобно)?
- Да ли су системски сатови сервера Active Directory и Zammad синхронизовани
  у оквиру пет минута један од другог? Kerberos је протокол осетљив на
  време!

### Грешке у Apache логовима

::: tip
**Покушајте привремено повисити ниво логовања Apache-а.**

Додајте `LogLevel debug` у конфигурацију виртуелног домена, затим рестартујте
сервис да примените промене.
:::

#### Затражен је неподржан механизам

Да ли ваш сервисни налог Active Directory има омогућено **Kerberos AES
енкрипцију од 256 бита**?

Ако из неког разлога ваш сервер не подржава AES енкрипцију од 256 бита, LDAP
Wiki пружа [више информација о типовима Kerberos
енкрипције](https://ldapwiki.com/wiki/MsDS-SupportedEncryptionTypes){target=_blank}.

#### Неуспешна провера krb5 креденцијала: Верзија кључа није доступна

Да ли сте користили тачан **број верзије** (`vno`) који је пружио `ktpass`
приликом `generisanja vašeg keytab-a <sso-generate-keytab>`?

Покушајте да га поново генеришете, само да будете сигурни.

#### Непозната грешка GSS-а. Мањи код може пружити више информација (, Није пронађен унос у табели кључева за HTTP/FQDN@DOMAIN)

Да ли се **назив сервиса** који сте унели у `setspn` тачно поклапа са оним
који сте користили приликом `generisanja vašeg keytab-a <sso-generate-keytab>`?

Покушајте да га поново генеришете, само да будете сигурни.

#### Запис у keytab-u за HTTP/FQDN@DOMAIN није пронађен

Да ли подешавање `KrbServiceName` ваше конфигурације виртуелног домаћина
тачно одговара **називу сервиса** који сте унели у `setspn`?

Подешавање је осетљиво на велика и мала слова.

#### Упозорење: примљени токен вероватно је NTLM, који није подржан од стране Kerberos модула. Проверите своју IE конфигурацију

Да ли је ваш Zammad хост доступан путем FQDN-a? Ова грешка може указивати на
то да сте уместо тога конфигурисали Zammad хост као нумеричку IP адресу.

#### Није могуће дешифровати тикет за HTTP/FQDN@DOMAIN

Да ли сте се побринули да промените лозинку на свом корисничком налогу
сервиса у Active Directory-u _након омогућавања AES енкрипције од 256
бита?_?

И да ли сте се побринули да региструјете SPN (са `ktpass`) и генеришете свој
keytab (са `ktutil`) _након промене лозинке?_?

Покушајте да покренете `kinit -k -t <putanja do keytaba> HTTP/<zammad-host>@<DOMAIN>`.
Ако нема излаза, све је у реду - ако видите "кинит:
Неуспешна провера аутентификације при дохватању почетних акредитива" ваши
унесени подаци су нетачни или сте користили `/pass *` током ктпасс
команде.

#### Није успела провера KDC-а" и "није успела провера krb5 акредитива: Није успела провера интегритета дешифровања

Проверите да ли је `KrbServiceName` тачан ServiceName достављен путем
сетспн.

Проверите да ли ваш Active Directory подржава конфигурисану методу
енкрипције.

Ако је све горе наведено тачно и сва остала питања у FAQ-u су решена,
побрините се да ваш клијент не кешира резултате. `klist purge` брише кеш
клијента - рестартовање клијента би такође помогло.
