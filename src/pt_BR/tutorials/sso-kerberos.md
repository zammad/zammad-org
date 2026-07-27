---
order: 13
title: 'Single sign-on with Kerberos'
---

# Single sign-on for Kerberos <Badge type="warning" text="on-premise only"/>

Este guia discutirá como configurar o login único usando o Microsoft Active
Directory.

## Conceptual overview

Como qualquer outra aplicação web por aí, o Zammad tem sua própria lógica
para cadastrar usuários, armazenar suas senhas, autenticá-los e gerenciar
suas sessões.

Se o seu departamento de TI mantém seu próprio repositório de identidade de
usuário (como o Active Directory), o suporte a SSO do Zammad permite
aproveitar esse sistema de autenticação existente, para que qualquer pessoa
com uma conta na sua intranet local 1) tenha automaticamente uma conta no
Zammad e 2) consiga fazer login com um único clique.

::: tip
Se você não tem essa infraestrutura de TI, mas ainda assim quer login de um clique,
pode usar alternativas como Github, Google, Facebook e outras.
:::

## How does it work?

Uma vez ativado, o login único ativa um endpoint em
`https://your.zammad.host/auth/sso`. Quando o servidor Zammad recebe uma
solicitação GET nesse endpoint com um nome de usuário válido em **qualquer
uma das seguintes** entidades, ele cria uma nova sessão para esse usuário:

- um cabeçalho de solicitação `X-Forwarded-User`
- uma variável de ambiente de servidor web `REMOTE_USER`
- uma variável de ambiente de servidor web `HTTP_REMOTE_USER`

::: info
**Espera. O SSO permite fazer login apenas com um nome de usuário?**

Em princípio, sim.

**Como isso está ok?**

Neste guia, configuramos nosso servidor web (Apache) para interceptar todas as
solicitações ao endpoint `/auth/sso`. Em vez de encaminhá-las para o
Zammad, o Apache inicia um processo de login de três lados (_autenticação
Kerberos_) entre ele mesmo, o usuário e o servidor do Active
Directory.

Se o Active Directory não reconhecer o usuário ou sua senha,
o Zammad nunca vê a solicitação, e a sessão nunca é criada.

**O que tudo isso significa?**

Significa que há muitas formas de configurar o SSO — você não precisa
seguir este guia ou até usar o Active Directory ou Kerberos — mas se
você não sabe o que está fazendo, vai acabar com uma _enorme_
brecha de segurança.
:::

## Começando

::: tip
**Ocupado demais para lidar com isso sozinho?**

Nós cuidamos disso para você. Nossos especialistas oferecem workshops personalizados
para colocar sua equipe em funcionamento rapidamente e com confiança.
[Basta nos mandar uma mensagem](https://zammad.com/contact){target=_blank}!
:::

Você precisará de:

- um ambiente Microsoft Active Directory com
  - acesso root
  - suporte para criptografia AES de 256 bits
- um host do Zammad com
  - acesso root
  - um nome de domínio totalmente qualificado (FQDN)
- alguma familiaridade com administração de sistemas (por exemplo,
  configuração do Apache)

Para melhores resultados, configure a integração LDAP para garantir que
suas contas do Active Directory e do Zammad estejam sempre sincronizadas. Você
pode encontrá-la na interface de administração do Zammad em
_Settings > Security > Third-party Applications_.

## Step 1: Configure active directory

No esquema de autenticação Kerberos, o **servidor de autenticação** (Active
Directory) precisa manter segredos compartilhados com o **serviço**
(Zammad). Para tornar isso possível, precisamos registrar um **nome de
principal de serviço** (SPN) para o Zammad no Active Directory.

::: info
Essas instruções foram confirmadas no Windows Server 2016.
:::

### 1a. Criar uma conta de serviço

Você pode usar uma conta de serviço existente, se tiver uma. Privilégios de
administrador não são necessários; uma conta de usuário normal serve.

![Captura de tela das configurações de conta de serviço do Active
Directory](/screenshots/tutorials/sso-kerberos/active-directory-service-account-settings.png)

### 1b. Reset password

Redefina a senha da conta de serviço após ativar "This account supports
Kerberos AES 256 bit encryption".

### 1c. Registrar um SPN para o Zammad

Substitua os seguintes placeholders nos comandos abaixo:

- `<zammad-host>`: FQDN do Zammad
- `<service-acct>`: nome de login da conta de serviço
- `<password>`: senha da conta de serviço (a opção `/pass *` comprovadamente
  não funciona)
- `<domain>`: domínio do Windows
- `<master-domain-controller>`: IP/FQDN do controlador de domínio mestre

Os comandos abaixo solicitarão a senha do usuário:

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

### 1d. Anote a chave secreta e o número de versão

A saída do comando acima contém dados importantes para o Passo 2e abaixo:

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

Na última linha, anote:

- a chave secreta entre parênteses no final (**0x5ee827...**)
- o número de versão da chave secreta precedido por `vno` (**3**)

## Step 2: Remove NGINX, set up Apache + Kerberos

Em seguida, o host do Zammad precisa ser configurado para suportar Kerberos
(e aceitar credenciais de autenticação fornecidas pelo servidor do Active
Directory).

Na maioria dos casos, você teria que recompilar o NGINX a partir do
código-fonte com um módulo extra para habilitar o suporte a Kerberos. Para
contornar isso, vamos usar o Apache, que oferece suporte a Kerberos através
de um módulo plugin em vez disso.

::: info
Todos os comandos nesta seção devem ser executados como root (ou com `sudo`).
:::

### 2a. Turn off NGINX

::: warning
Isso deixará sua instância do Zammad **offline** até que o Apache esteja totalmente
configurado e em execução.
:::

Desligue o Nginx:

```sh
sudo systemctl stop nginx
```

Mantenha-o desligado após a reinicialização:

```sh
sudo systemctl disable nginx
```

Se você quiser minimizar o tempo de inatividade, pode guardar esta etapa
para o final; apenas tenha em mente que o Apache não iniciará se a porta que
ele deseja escutar estiver sendo usada pelo NGINX.

Se você não conseguir concluir este tutorial por qualquer motivo, basta
desligar o Apache e restaurar o NGINX:

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

### 2b. Pre-configure Apache

Esta documentação espera uma configuração do Apache já funcional. Você deve
dar uma olhada no [guia de configuração de servidor
web](/pt_BR/tutorials/webserver-config) antes de continuar.

### 2c. Install further Apache dependencies

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

### 2d. Enable Apache modules

O SSO requer módulos que não são ativados por padrão. Por padrão, você pode
usar `a2enmod` para isso.

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

=== via configuration file (CentOS)

adicione/descomente as instruções `LoadModule` apropriadas na sua
configuração do Apache:

```apache
# /etc/httpd/conf/httpd.conf

LoadModule auth_kerb_module /usr/lib/apache2/modules/mod_auth_kerb.so
LoadModule rewrite_module modules/mod_rewrite.so
```

:::

### 2e. Configurar o Kerberos

A configuração do realm Kerberos é como você informa ao servidor Zammad como
alcançar o _controlador de domínio_ (servidor Active Directory).

Substitua os seguintes placeholders na configuração de exemplo abaixo:

- `<domain>`: domínio do Windows
- `<domain-controller>`: IP/FQDN(s) do controlador de domínio
- `<master-domain-controller>`: IP/FQDN do controlador de domínio mestre
  (não pode ser somente leitura, mas pode ser o mesmo que
  `<domain-controller>`)

```ini
# /etc/krb5.conf

[libdefaults]
   default_realm = <DOMAIN>

   default_tkt_enctypes = aes256-cts-hmac-sha1-96
   default_tgs_enctypes = aes256-cts-hmac-sha1-96
   permitted_enctypes = aes256-cts-hmac-sha1-96

   kdc_timesync = 1
   ccache_type = 4
   forwardable = false
   proxiable = false
   fcc-mit-ticketflags = false

[realms]
         # multiple KDCs ok (one `kdc = ...` definition per line)
         <DOMAIN> = {
                  kdc = <domain-controller>
                  admin_server = <master-domain-controller>
                  default_domain = <domain>

                  # below is only for GSSAPI
                  auth_to_local = RULE:[1:$1@$0](.*@<domain>)s/@<domain>$//
                  auth_to_local = DEFAULT
         }

[domain_realm]
         .<domain> = <DOMAIN>
         <domain> = <DOMAIN>
```

### 2f. Generate keytab

O Apache precisa de uma _keytab_ (tabela de chaves) Kerberos para gerenciar
seus segredos compartilhados com o controlador de domínio.

Substitua os seguintes placeholders nos comandos abaixo:

- `<zammad-host>`: FQDN do Zammad
- `<domain>`: domínio do Windows
- `<secret-key>`: chave secreta (**omita o** `0x` **inicial**)
- `<vno>`: número de versão da chave secreta

A chave secreta e o número de versão foram encontrados em `sso-register-spn`
(Passo 1d) acima.

Entre no ktutil:

```sh
ktutil
```

Adicione a keytab:

```sh
ktutil: addent -key -p HTTP/<zammad-host>@<DOMAIN> -k <vno> -e aes256-cts
Key for HTTP/<zammad-host>@<domain> (hex): <secret-key>
```

Confirme que a entrada foi adicionada com sucesso:

```sh
ktutil: list
slot KVNO Principal
---- ---- ---------------------------------------------------------------
   1    3 HTTP/<zammad-host>@<DOMAIN>
```

Grave a keytab no disco:

```sh
ktutil: wkt /root/zammad.keytab
```

Saia do ktutil:

```sh
ktutil: quit
```

Depois, coloque a keytab no diretório de configuração do Apache e defina as
permissões apropriadas:

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

### 2g. Configurar o Apache

Adicione a seguinte diretiva ao final do arquivo de configuração do virtual
host, para criar seu endpoint Kerberos SSO em `/auth/sso`:

Substitua os seguintes placeholders no comando abaixo:

- `<zammad-host>`: FQDN do Zammad
- `<domain>`: domínio do Windows

::: tabs

=== Debian & Ubuntu

``` apache
# /etc/apache2/sites-available/zammad.conf

<LocationMatch "/auth/sso">
   SSLRequireSSL
   AuthType GSSAPI
   AuthName "Your Zammad"
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

A configuração para CentOS e OpenSUSE abaixo contém duas
linhas `Krb5KeyTab`! Mantenha apenas a que você precisa.

``` apache
# /etc/apache2/sites-available/zammad.conf

<LocationMatch "/auth/sso">
   SSLRequireSSL
   AuthType Kerberos
   AuthName "Your Zammad"
   KrbMethodNegotiate On
   KrbVerifyKDC On
   KrbMethodK5Passwd On
   KrbAuthRealms <DOMAIN>
   KrbLocalUserMapping on                 # strips @REALM suffix from REMOTE_USER variable
   KrbServiceName HTTP/<zammad-host>@<DOMAIN>
   Krb5KeyTab /etc/apache2/zammad.keytab  # Ubuntu, Debian, & openSUSE
   Krb5KeyTab /etc/httpd/zammad.keytab    # CentOS
   require valid-user

   RewriteEngine On
   RewriteCond %{LA-U:REMOTE_USER} (.+)
   RewriteRule . - [E=RU:%1,NS]
   RequestHeader set X-Forwarded-User "%{RU}e" env=RU
</LocationMatch>
```

:::

### 2g. Restart Apache to apply changes

```sh
sudo systemctl restart apache2
```

## Passo 3: ativar o SSO no Zammad

Em seguida, ative "Authentication via SSO" no Painel de Administração do Zammad, em
_Settings > Security > Third-party Applications_

::: tip
Em versões mais antigas do Zammad, visite `https://your.zammad.host/auth/sso`
para fazer login.
:::

## Step 4: Configure client system (Windows only)

Para a experiência completa de SSO (ou seja, para login de um clique sem
senha), os usuários do Zammad devem:

1. estar na intranet local do servidor do Active Directory; e
2. modificar suas configurações de rede para que o host do Zammad seja
   tratado como um servidor de intranet local.

Sem essa etapa, os usuários devem inserir suas credenciais do Active
Directory durante o SSO.

:::: tabs

=== IE / Edge / Chromium

::: tip
Essa configuração pode ser gerenciada centralmente em toda a intranet usando
um **objeto de política de grupo** (GPO).
:::

1. Adicione o FQDN do seu Zammad em Internet Options, em _Security > Local
   Intranet > Sites > Advanced_.
2. Selecione "Require server verification (https:) for all sites in this
   zone".
3. Em _Security level for this zone > Custom level... > Settings
   \> User Authentication > Logon_, selecione "Automatic logon only in
   Intranet Zone".

=== Firefox

::: info
Essa opção não pode ser gerenciada centralmente, pois é definida no
navegador, e não nas Configurações do Windows.
:::

1. Digite `about:config` na barra de endereços. Clique em **Accept the risk and
   continue**.
2. Procure pela opção `network.negotiate-auth.trusted-uris`.
3. Dê um duplo clique para editar, então adicione o FQDN do seu Zammad.
4. Reinicie o Firefox para aplicar suas alterações.

::::

## Solução de problemas

- Todos os FQDNs/nomes de host relevantes estão acessíveis a partir do seu
  Active Directory e servidores Zammad (incluindo um a partir do outro)?
- Os relógios do sistema do seu Active Directory e servidores Zammad estão
  sincronizados dentro de cinco minutos um do outro? O Kerberos é um
  protocolo sensível ao tempo!

### Errors in Apache logs

::: tip
**Tente aumentar temporariamente o nível de log do Apache.**

Adicione `LogLevel debug` à sua configuração de virtual host, depois reinicie
o serviço para aplicar as alterações.
:::

#### An unsupported mechanism was requested

Sua conta de serviço do Active Directory tem **criptografia AES de 256
bits** habilitada?

Se por algum motivo seu servidor não suportar criptografia AES de 256 bits,
o LDAP Wiki tem [mais informações sobre tipos de criptografia
Kerberos](https://ldapwiki.com/wiki/MsDS-SupportedEncryptionTypes){target=_blank}.

#### Failed to verify krb5 credentials: Key version is not available

Você usou o **número de versão** (`vno`) exato fornecido pelo `ktpass`
ao `gerar sua keytab <sso-generate-keytab>`?

Tente gerá-la novamente, só para ter certeza.

#### Unspecified GSS failure. Minor code may provide more information (, no key table entry found for HTTP/FQDN@DOMAIN)

O **nome de serviço** que você forneceu ao `setspn` corresponde exatamente ao
que você usou ao `gerar sua keytab <sso-generate-keytab>`?

Tente gerá-la novamente, só para ter certeza.

#### No key table entry found for HTTP/FQDN@DOMAIN

A configuração `KrbServiceName` do seu virtual host corresponde exatamente
ao **nome de serviço** que você forneceu ao `setspn`?

Esta configuração diferencia maiúsculas de minúsculas.

#### Warning: Received token seems to be NTLM, which isn't supported by the Kerberos module. Check your IE configuration

Seu host do Zammad está acessível por um FQDN? Este erro pode indicar que
você configurou seu host do Zammad como um endereço IP numérico em vez
disso.

#### Cannot decrypt ticket for HTTP/FQDN@DOMAIN

Você se certificou de alterar a senha na sua conta de serviço do Active
Directory _depois de habilitar a criptografia AES de 256 bits?_

E você se certificou de registrar o SPN (com `ktpass`) e gerar sua keytab
(com `ktutil`) _depois de alterar sua senha?_

Tente executar `kinit -k -t <path to keytab> HTTP/<zammad-host>@<DOMAIN>`.
Se nenhuma saída for retornada, está tudo certo - se você ver "kinit:
Preauthentication failed while getting initial credentials", suas
credenciais fornecidas estavam erradas, ou você usou `/pass *` durante o comando
ktpass.

#### Failed when verifying KDC" and "failed to verify krb5 credentials: Decrypt integrity check failed

Certifique-se de que `KrbServiceName` é o ServiceName correto, fornecido via
setspn.

Certifique-se de que seu Active Directory suporta o método de criptografia
configurado.

Se tudo acima estiver correto e o restante do FAQ também estiver garantido,
certifique-se de que seu cliente não esteja armazenando os resultados em
cache. `klist purge` limpa o cache do cliente - uma reinicialização do
cliente também funcionaria.
