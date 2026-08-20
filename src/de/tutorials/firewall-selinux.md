---
order: 12
title: 'Firewall & SELinux'
---

# Firewall & SELinux

Dies ist nur eine Sammlung von Beispielen, die für Sie nützlich sein
könnten. Es steht Ihnen frei, Teile auszulassen und/oder sie an Ihre
Bedürfnisse anzupassen.

## SELinux

::: info
Die folgenden Befehle funktionieren nur unter Ubuntu, Debian und CentOS. Wenn Sie eine
andere Distribution verwenden, werfen Sie bitte einen Blick in deren Dokumentation.
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

Stellen Sie sicher, dass Sie neben den Ports, die Sie benötigen, auch die
Ports `80` und `443` (TCP & UDP) öffnen. Unten finden Sie einige Beispiele
für verschiedene Distributionen. Wenn Sie eine andere Distribution
verwenden, werfen Sie bitte einen Blick in deren Dokumentation.

Bitte beachten Sie, dass die folgenden Beispiele nur die Standard-Firewall
der Distributionen abdecken. Sie passen möglicherweise nicht zu Ihrem
Szenario ab.

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
Wir behandeln `nftables` in diesem Teil - von `iptables` wird
seit Debian 10 (Buster) abgeraten. Unser Beispiel verwendet die `input`-chain, Ihre
kann eine andere sein!
:::

Fügen Sie folgende Zeilen zu `/etc/nftables.conf` oder zu ihrer Regel-Datei hinzu.
Stellen Sie sicher, dass Sie diese Zeilen zu Ihrer input-chain Datei hinzufügen.

```sh
sudo tcp dport { http, https } accept
```

```sh
sudo udp dport { http, https } accept
```

Das Ergebnis kann wie folgt aussehen. Beachten Sie, dass Ihre Umgebung
andere/zusätzliche Regeln benötigen kann.

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

Laden Sie die Regeln:

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
