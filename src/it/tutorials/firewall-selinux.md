---
order: 12
title: 'Firewall e SELinux'
---

# Firewall e SELinux

Questa è solo una raccolta di snippet che potrebbero esserti utili. Salta
pure le parti.

## SELinux

::: info
I seguenti comandi funzionano solo su Ubuntu, Debian e CentOS. Se usi una
distribuzione diversa.
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

Assicurati di aprire le porte `80` e `443` (TCP e UDP) oltre alle porte di
cui hai bisogno.

Tieni presente che gli esempi seguenti coprono solo il firewall predefinito
della distribuzione.

:::: tabs

===Ubuntu

```sh
sudo ufw allow 80
```

```sh
sudo ufw allow 443
```

```sh
sudo ufw relo

::: info
Trattiamo `nftables` in questa parte - `iptables` è sconsigliato
a partire da Debian 10.
:::

Aggiungi le seguenti righe a `/etc/nftables.conf` o al tuo specifico file di regole.
Assicurati di aggiungere.

::::
