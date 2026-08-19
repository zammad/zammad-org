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

Add the following lines to `/etc/nftables.conf` or your specific rule file.
Ensure to add these lines to your input-chain.

```sh
sudo tcp dport { http, https } accept
```

```sh
sudo udp dport { http, https } accept
```

The result can look like the following. Keep in mind that your environment
could require different / more rules.

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

To load the rules, run:

```sh
sudo systemctl reload nftables
```

===CentOS, RHEL, OpenSUSE, SLES

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
