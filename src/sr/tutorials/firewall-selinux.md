---
order: 5
title: 'Firewall & SELinux'
---

# Firewall & SELinux

This is just a collection of snippets which might be useful for you. Feel
free to skip parts and/or adapt it to your needs.

## Firewall

::: info
The following commands only work on Ubuntu, Debian and CentOS. If you use a
different distribution, please have a look at their documentation.
:::

```bash
sudo chcon -Rv --type=httpd_sys_content_t /opt/zammad/public/
```
```bash
sudo setsebool httpd_can_network_connect on -P
```
```bash
sudo semanage fcontext -a -t httpd_sys_content_t /opt/zammad/public/
```
```bash
sudo restorecon -Rv /opt/zammad/public/
```
```bash
sudo chmod -R a+r /opt/zammad/public/
```

## SELinux

Ensure to open ports ``80`` and ``443`` (TCP & UDP) beside of the ports you
need. Below you can find a few examples for different distributions. If you
are using a different distribution, please have a look at their
documentation.

Please note that the examples below only cover the distribution’s default
firewall. It may not cover your case.

::::tabs

===Ubuntu
```bash
$ sudo ufw allow 80
```
```bash
$ sudo ufw allow 443
```
```bash
$ sudo ufw reload
```

===Debian

::: info
We’re covering ``nftables`` in this part - ``iptables`` is discouraged
starting from Debian 10 (Buster). Our example uses the ``input`` chain, yours
may be a different one!
:::

Add the following lines to ``/etc/nftables.conf`` or your specific rule file.
Ensure to add these lines to your input-chain.

```bash
sudo tcp dport { http, https } accept
sudo udp dport { http, https } accept
```
The result can look like the following. Keep in mind that your environment
could require different / more rules.

```bash
#!/usr/local/sbin/nft -f
flush ruleset

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
```bash
sudo systemctl reload nftables
```

===CenOS, RHEL, OpenSUSE, SLES

```bash
sudo firewall-cmd --zone=public --add-service=http --permanent
```

```bash
sudo firewall-cmd --zone=public --add-service=https --permanent
```

```bash
sudo firewall-cmd --reload
```

::::