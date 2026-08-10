---
order: 12
title: 'Firewall & SELinux'
---

# Firewall & SELinux

Ово је само збирка исечака који би вам могли бити од користи. Слободно
прескочите делове и/или прилагодите их својим потребама.

## SELinux

::: info
Следеће команде раде само на Ubuntu-у, Debian-у и CentOS-у. Ако користите
различиту дистрибуцију, молимо погледајте њихову документацију.
:::

```sh
sudo chcon -Rv --type=httpd_sys_content_t /opt/zammad/public/
```

```sh
sudo setsebool httpd_can_network_connect on -P
```

```sh
sudo semanage fcontext -a -t httpd_sys_content_t /opt/zammad/public/
```

```sh
sudo restorecon -Rv /opt/zammad/public/
```

```sh
sudo chmod -R a+r /opt/zammad/public/
```

## Firewall

Уверите се да сте отворили порте `80` и `443` (TCP & UDP) поред портова које
вам требају. Испод можете пронаћи неколико примера за различите
дистрибуције. Ако користите другу дистрибуцију, погледајте њихову
документацију.

Напомена: Примери испод покривају само подразумевани firewall
дистрибуције. Можда не покрива ваш случај.

:::: tabs

===Ubuntu

```sh
sudo ufw allow 80
```

```sh
sudo ufw allow 443
```

```sh
sudo ufw reload
```

===Debian

::: info
У овом делу обрађујемо `nftables` - `iptables` се не препоручује
почев од Debian 10 (Buster). Наш пример користи ланац `input`, ваш
може бити другачији!
:::

Додајте следеће линије у `/etc/nftables.conf` или ваш специфични фајл са правилима.
Побрините се да додате ове линије у свој инпут-цхаин.

```sh
sudo tcp dport { http, https } accept
```

```sh
sudo udp dport { http, https } accept
```

Резултат може изгледати као што је приказано испод. Имајте на уму да ваше окружење
може захтевати другачија / више правила.

```sh
table inet filter {
   chain input {
      type filter hook input priority 0; policy drop;
      ct state established,related accept
      tcp dport ssh log accept
      tcp dport { http, https } accept
      udp dport { http, https } accept
   }

   chain forward {
      type filter hook forward priority 0; policy accept;
   }

   chain output {
      type filter hook output priority 0; policy accept;
   }
}
```

Да бисте учитали правила, покрените:

```sh
sudo systemctl reload nftables
```

===CenOS, RHEL, OpenSUSE, SLES

```sh
sudo firewall-cmd --zone=public --add-service=http --permanent
```

```sh
sudo firewall-cmd --zone=public --add-service=https --permanent
```

```sh
sudo firewall-cmd --reload
```

::::
