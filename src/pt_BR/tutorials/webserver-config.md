---
order: 3
---

# Configuração do servidor web

<!--@include: @/en/modules/zammad-services-hint.md-->

Configure seu servidor web para fazer proxy reverso do servidor de aplicação
do Zammad. Este guia cobre obter um certificado SSL, ajustar a configuração
de exemplo para Nginx e Apache 2, e recarregar o servidor web para aplicar
as alterações.

Você pode encontrar arquivos de configuração de exemplo para o seu servidor
web dentro do diretório `contrib/` da sua instalação do Zammad. Há dois
arquivos de exemplo por servidor web: `zammad.conf` (HTTP simples) e
`zammad_ssl.conf` (HTTPS). O arquivo sem SSL é destinado apenas a testes
locais e não deve ser usado em produção. Durante uma instalação via pacote
do Zammad, o pacote copia automaticamente o `zammad.conf` sem SSL para o
diretório de configuração do seu servidor web. Para uso em produção,
substitua-o pelo `zammad_ssl.conf` e siga as etapas nesta página.

::: info
**Usuários do Docker Compose/Kubernetes:**

Pule esta página. Configure a porta, nome de host e esquema do servidor web via as
variáveis `NGINX_*` e `ZAMMAD_RAILSSERVER_*` na
[página de variáveis de ambiente](/pt_BR/reference/environment-variables).
:::

## Obter um certificado SSL

O Zammad requer HTTPS em produção. Use uma das opções abaixo para obter um
certificado antes de continuar com a configuração do servidor web.

### Autoridade certificadora comercial

Compre um certificado anual de qualquer CA pública confiável. Algumas opções
comuns são
[Sectigo](https://sectigo.com/ssl-certificates-tls){target=_blank},
[GlobalSign](https://www.globalsign.com/en/managed-ssl){target=_blank} ou
[DigiCert](https://www.digicert.com/tls-ssl/){target=_blank}. Instale o
certificado, chave e cadeia resultantes no seu servidor, como faria para
qualquer serviço HTTPS, e depois continue com a configuração do servidor web
abaixo.

### Let's Encrypt

O Let's Encrypt emite certificados gratuitos e renováveis
automaticamente. Dois clientes são comumente usados.

::: tabs

=== Certbot

O Certbot é o cliente ACME mais amplamente usado. Siga as
[instruções de instalação do Certbot](https://certbot.eff.org/instructions){target=_blank},
selecione sua distribuição e o plugin de servidor web correspondente no
seletor, e conclua a instalação. Uma vez instalado, solicite um certificado
substituindo `<webserver>` por `nginx` ou `apache` e
`zammad.example.com` pelo seu subdomínio:

```sh
sudo certbot --<webserver> -d zammad.example.com
```

O Certbot emitirá o certificado, perguntará se deseja redirecionar HTTP para HTTPS
(escolha `[1] not redirect` se você planeja usar a configuração de exemplo do
Zammad, que já lida com o redirecionamento; caso contrário, escolha
`[2] redirect`) e organizará a renovação automática assim que o certificado tiver
menos de 30 dias de validade restantes.

=== acme.sh

[acme.sh](https://github.com/acmesh-official/acme.sh){target=_blank} é
um cliente ACME leve, baseado em shell, e uma alternativa ao Certbot, mas
não usa mais o Let's Encrypt por padrão. Defina a CA padrão como Let's
Encrypt antes de emitir um certificado:

```sh
acme.sh --set-default-ca --server letsencrypt
```

Emita o certificado substituindo `<webserver-plugin>` por `nginx`,
`apache` ou `standalone` e `zammad.example.com` pelo seu subdomínio:

```sh
acme.sh --issue --<webserver-plugin> -d zammad.example.com
```

Instale o certificado em um diretório de sua escolha (por exemplo,
`/etc/ssl/private/`) e recarregue o servidor web após cada renovação.
Substitua `<webserver-service>` no comando abaixo pelo nome do serviço
systemd correspondente (`nginx`, `apache2` ou `httpd`):

```sh
acme.sh --install-cert -d zammad.example.com \
    --cert-file      /etc/ssl/private/zammad.example.com.pem  \
    --key-file       /etc/ssl/private/zammad.example.com.key  \
    --fullchain-file /etc/ssl/private/zammad.example.com.full.pem \
    --reloadcmd     "sudo systemctl force-reload <webserver-service>"
```

Veja a
[documentação do acme.sh](https://github.com/acmesh-official/acme.sh/wiki/How-to-issue-a-cert){target=_blank}
para mais casos de uso.

:::

## Ajustar a configuração do servidor web

<!-- markdownlint-disable MD036 -->

:::: tabs

=== Nginx (default)

**Coloque a configuração de exemplo no lugar**

Copie a configuração de exemplo SSL para o diretório de configuração do Nginx:

```sh
sudo cp /opt/zammad/contrib/nginx/zammad_ssl.conf \
    /etc/nginx/sites-available/zammad.conf
```

Diretórios de configuração comuns do Nginx:

- `/etc/nginx/conf.d/`
- `/etc/nginx/vhosts.d/`
- `/etc/nginx/sites-available/`

**Ajuste o nome do servidor e os caminhos dos certificados**

Ajuste o arquivo recém-copiado com um editor de texto de sua escolha (por exemplo,
vi ou nano). Localize ambas as diretivas `server_name` (uma no bloco
de servidor HTTP na porta 80, outra no bloco de servidor HTTPS na porta 443)
e ajuste `example.com` para o subdomínio que você escolheu para sua
instância do Zammad.

Agora você precisará ajustar o caminho e os nomes de arquivo dos seus
certificados SSL obtidos nas etapas anteriores. Ajuste as seguintes
diretivas para corresponder à sua configuração:

- `ssl_certificate` (seu certificado SSL)
- `ssl_certificate_key` (a chave privada do certificado)
- `ssl_trusted_certificate` (o certificado público da CA)

Para melhorar a segurança HTTPS, configure também um arquivo de parâmetro
Diffie-Hellman e aponte `ssl_dhparam` para ele:

```sh
sudo openssl dhparam -out /etc/ssl/dhparam.pem 4096
```

**Recarregue e verifique**

Verifique a configuração:

```sh
sudo nginx -t
```

Recarregue o Nginx:

```sh
sudo systemctl reload nginx
```

=== Apache 2

**Ative os módulos necessários**

O Zammad requer módulos que não são ativados por padrão. No Ubuntu,
Debian e openSUSE, use `a2enmod`:

```sh
sudo a2enmod proxy proxy_html proxy_http proxy_wstunnel headers ssl
```

Para suporte a HTTP/2, ative também:

```sh
sudo a2enmod h2 proxy_http2 mpm_event
```

No CentOS/RHEL, adicione as linhas `LoadModule` correspondentes a
`/etc/httpd/conf/httpd.conf` em vez disso:

```apache
LoadModule headers_module modules/mod_headers.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_html_module modules/mod_proxy_html.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so
```

Reinicie o Apache após ativar os módulos:

```sh
sudo systemctl restart apache2
```

**Coloque a configuração de exemplo no lugar**

Copie a configuração de exemplo SSL para o diretório de configuração do Apache:

```sh
sudo cp /opt/zammad/contrib/apache2/zammad_ssl.conf \
    /etc/apache2/sites-available/zammad.conf
```

Diretórios de configuração comuns do Apache:

- `/etc/apache2/conf.d/`
- `/etc/httpd/vhosts.d/`
- `/etc/apache2/sites-available/`

A instalação via pacote tenta copiar esse arquivo para você. Não
o renomeie.

**Ajuste o nome do servidor e os caminhos dos certificados**

Ajuste o arquivo recém-copiado com um editor de texto de sua escolha (por exemplo,
vi ou nano). Localize qualquer diretiva `ServerName` e ajuste `example.com`
para o subdomínio que você escolheu para sua instância do Zammad. O primeiro
`ServerName` (no VirtualHost HTTP) usa `example.com` por padrão, e
o segundo (no VirtualHost HTTPS) usa `localhost`.

Agora você precisará ajustar o caminho e os nomes de arquivo dos seus
certificados SSL obtidos nas etapas anteriores. Ajuste as seguintes
diretivas para corresponder à sua configuração:

- `SSLCertificateFile` (seu certificado SSL)
- `SSLCertificateKeyFile` (a chave privada do certificado)
- `SSLCertificateChainFile` (o certificado público da CA)

Para melhorar a segurança HTTPS, configure também um arquivo de parâmetro
Diffie-Hellman e aponte `SSLOpenSSLConfCmd DHParameters` para ele:

```sh
sudo openssl dhparam -out /etc/ssl/dhparam.pem 4096
```

**Ative o site**

No Ubuntu, Debian e openSUSE:

```sh
sudo a2ensite zammad
```

No CentOS/RHEL:

```sh
sudo ln -s /etc/httpd/sites-available/zammad_ssl.conf /etc/httpd/sites-enabled/
```

Certifique-se de que `IncludeOptional sites-enabled/*.conf` está presente em
`/etc/apache2/apache2.conf` (Ubuntu, Debian, openSUSE) ou
`/etc/httpd/conf/httpd.conf` (CentOS/RHEL).

**Recarregue e verifique**

Recarregue o Apache e verifique a configuração:

```sh
sudo systemctl reload apache2
```

=== Local testing or other proxy servers

A aplicação principal do Zammad escuta na porta `3000`, e o servidor
WebSocket, na porta `6042`. Se você colocar seu próprio proxy reverso na frente do
Zammad, encaminhe ambas.

Se as portas padrão entrarem em conflito com outras aplicações no seu host, veja
a [página de variáveis de ambiente](/pt_BR/reference/environment-variables) para
alterá-las.

::: warning
Não exponha o Zammad diretamente à internet. O Zammad fornece
apenas HTTP simples e ficaria acessível sem autenticação.
:::

::::

<!-- markdownlint-enable MD036 -->

Agora visite o domínio configurado do Zammad em um navegador para acessar a
interface do Zammad. Se você não vir o assistente de configuração do Zammad
nem a interface do Zammad, verifique a [seção de solução de
problemas](#troubleshooting) abaixo.

## Solução de problemas

### Página de destino padrão em vez do Zammad

Se você chegar à página de destino padrão do servidor web em vez do Zammad,
seu `zammad.conf` pode estar sendo sobreposto por outro arquivo de
configuração. Verifique o diretório vhost por `000-default.conf` ou
`default.conf` e desative-o.

### DNS não resolvendo

Se o subdomínio não resolver, verifique novamente os registros DNS do seu
domínio e aguarde a propagação. Substitua o `zammad.example.com` no comando
a seguir pelo domínio configurado do seu Zammad e verifique se o domínio
aponta para o servidor correto:

```sh
host zammad.example.com
```

### Erros de token CSRF

Se os usuários não conseguirem fazer login devido a erros de token CSRF, a
cadeia do seu servidor web pode não estar passando o tipo de conexão
original para o Zammad. Diga diretamente ao proxy que a conexão é HTTPS.

Nginx
: dentro da sua configuração de virtual host, localize
  `proxy_set_header X-Forwarded-Proto` e substitua `$scheme` por
  `https`.

Apache 2
: dentro da sua configuração de virtual host, logo acima da primeira
  diretiva `ProxyPass`, insira:

  ```apache
  RequestHeader set X_FORWARDED_PROTO 'https'
  RequestHeader set X-Forwarded-Ssl on
  ```
