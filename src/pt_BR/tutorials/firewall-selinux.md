---
order: 12
title: 'Firewall e SELinux'
---

# Firewall e SELinux

Esta é apenas uma coleção de trechos que podem ser úteis para você. Sinta-se
à vontade para pular partes e/ou adaptá-las às suas necessidades.

## SELinux

::: info
Os seguintes comandos funcionam apenas no Ubuntu, Debian e CentOS. Se você usar uma
distribuição diferente, consulte a documentação dela.
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

Certifique-se de abrir as portas `80` e `443` (TCP e UDP), além das portas
que você precisa. Abaixo você encontra alguns exemplos para diferentes
distribuições. Se você estiver usando uma distribuição diferente, consulte a
documentação dela.

Observe que os exemplos abaixo cobrem apenas o firewall padrão da
distribuição. Pode não cobrir o seu caso.

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
Estamos cobrindo `nftables` nesta parte - o `iptables` é desencorajado
a partir do Debian 10 (Buster). Nosso exemplo usa a chain `input`, a sua pode
ser diferente!
:::

Adicione as seguintes linhas ao `/etc/nftables.conf` ou ao seu arquivo de regras específico.
Certifique-se de adicionar essas linhas à sua chain de entrada (input).

```sh
sudo tcp dport { http, https } accept
```

```sh
sudo udp dport { http, https } accept
```

O resultado pode se parecer com o seguinte. Tenha em mente que seu ambiente
pode exigir regras diferentes/adicionais.

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

Para carregar as regras, execute:

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
