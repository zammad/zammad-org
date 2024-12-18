---
order: 3
title: 'Webserver Configuration'
---

# Webserver Configuration

<!--@include: @/de/modules/zammad-services-hint.md-->

This guide is only relevant for package installations. During the
installation, Zammad tries to automatically install a configuration file to
your nginx.  You can find example configuration files for your webserver in
the ``contrib/`` directory of your Zammad installation.

In case this out-of-the-box approach doesn't work for you, you can find some
hints for your configuration. You can use either Nginx or Apache 2 (only
referred to as Apache in the following text).

## Get a SSL Certificate

You have to use a named configuration which is not configured by default. To
fix this, open the ``zammad.conf`` in your webserver's config directory and
replace the ``server_name localhost`` (Nginx) or ``ServerName localhost``
(Apache)  with your Zammad domain.

The config directories are usually:

- Nginx: ``/etc/nginx/conf.d/``, ``/etc/nginx/vhosts.d/``,
  ``/etc/nginx/sites-available/``
- Apache: ``/etc/apache2/conf.d/``, ``/etc/httpd/vhosts.d/``,
  ``/etc/apache2/sites-available/``

### Let's Encrypt

There are two common tools to get certificates, to which your find a basic
configuration below: [certbot](https://certbot.eff.org/instructions) and
[acme.sh](https://github.com/acmesh-official/acme.sh/wiki). Have a look at
their documentation for further configuration details and other examples.

:::tabs

===certbot

If not happened automatically, you have to install the nginx or apache plugin
for certbot: ``python3-certbot-nginx`` or ``python3-certbot-apache``

During the first certbot run it will request additional information once.
Replace ``<webserver>`` in below command by either ``apache``, ``httpd`` or
``nginx`` to match your setup.

```sh
certbot --<webserver> -d zammad.example.com
```

Certbot will now attempt to issue a certificate for you. If successful,
certbot will ask you if you want to ``[1] not redirect`` or ``[2] redirect``
automatically. You can choose to not redirect if you plan to use the sample
configuration of Zammad.

From now on, certbot will automatically renew your installed certificates if
they’re valid for 30 days or less.

===acme.sh

Change the default certificate authority to Let's encrypt:

```sh
acme.sh --set-default-ca  --server letsencrypt
```

Issue your certificate and replace ``<webserver>`` in the following command
with either ``apache`` or ``nginx`` or ``standalone`` for other webserver.

```sh
acme.sh --issue --<webserver> -d zammad.example.com
```

It is not recommended to use the stored certificates directly. You should
install the certificate to a directory of your choice instead as you can see
in the next command below. We’re using ``/etc/ssl/private/`` in this case,
but you can use any directory you like.

Replace ``<webserver>`` with ``apache2``, ``httpd`` or ``nginx``.

```sh
acme.sh --install-cert -d zammad.example.com \
    --cert-file      /etc/ssl/private/zammad.example.com.pem  \
    --key-file       /etc/ssl/private/zammad.example.com.key  \
    --fullchain-file /etc/ssl/private/zammad.example.com.full.pem \
    --reloadcmd     "systemctl force-reload <webserver>"
```

From now on, acme.sh will automatically renew your installed certificates if
they’re valid for 30 days or less.

:::

### Commercial CA

If you prefer to use certificates from a different official Certificate
Authority (CA) than Let's Encrypt, you can do so as well. Just get your
certificate bundle, install it according to their documentation and continue
with adjusting the webserver configuration.

## Adjusting the Webserver Configuration

:::warning
Make sure to never use HTTP connections - we encourage you to use HTTPS!
:::

### Nginx

#### Step 1 - Get a Current Config File

Copy & overwrite the default ``zammad.conf``. Adjust your Nginx config
directory according to your setup:

```sh
cp /opt/zammad/contrib/nginx/zammad_ssl.conf /etc/nginx/sites-available/zammad.conf
```

#### Step 2 - Adjust the Config File

Adjust the just copied file with a text editor of your choice (e.g. vi or
nano).

Locate any ``server_name`` directive and adjust ``example.com`` to the
domain of your Zammad instance.

Now you'll need to adjust the path and file names for your ssl certificates
you obtained. Adjust the following directives to match your setup:

- ``ssl_certificate`` (your ssl certificate)
- ``ssl_certificate_key`` (the certificates private key)
- ``ssl_trusted_certificate`` (the public CA certificate)

If you don't have a ``dhparam.pem`` file yet, you can easily adapt the
example below to generate this file. You can find the correct path in your
webserver config. Search for ``ssl_dhparam``.

```sh
openssl dhparam -out <path>/dhparam.pem 4096

```
#### Step 3 - Adjust HTTPS Configuration

Our default configuration aims for a broad support of end user devices. This
may not fit your needs. Mozilla has a great [ssl-config
generator](https://ssl-config.mozilla.org/) that should help you to meet
your requirements!

#### Step 4 - Save & Reload

Reload your nginx with ``systemctl reload nginx`` to apply your
configuration changes.

After that, you should be greeted by our getting started wizard.  Go on with
the [first steps in Zammad](/en/tutorials/first-steps).

### Apache

#### Step 1 - Enable Module

Zammad requires a module (``a2enmod``) which is not enabled by
default. CentOS users have to adjust a config file because this module is
not available there.

```sh
a2enmod proxy proxy_html proxy_http proxy_wstunnel headers ssl
```
```sh
systemctl restart apache2
```

:::details Config for CentOS
Add/uncomment the appropriate ``LoadModule`` statements in your Apache config
in ``/etc/httpd/conf/httpd.conf``:
```
LoadModule headers_module modules/mod_headers.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_html_module modules/mod_proxy_html.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so
```
Restart your webserver after saving the configuration.

:::

#### Step 2 - Get a Current Config File

The package installation copied a ``zammad.conf`` file to your webserver
config directory. Check if it is present and do not rename this file!

Adjust your Apache config directory according to your setup:

```sh
ls /etc/apache2/sites-available
```

#### Step 3 - Adjust the Config File

Adjust the just copied file with a text editor of your choice (e.g. vi or
nano).

Locate any ``ServerName`` directive and adjust ``example.com`` to the domain
of your Zammad instance.

Now you'll need to adjust the path and file names for your ssl certificates
you obtained. Adjust the following directives to match your setup:

- ``SSLCertificateFile`` (your ssl certificate)
- ``SSLCertificateKeyFile``(the certificates private key)
- ``SSLCertificateChainFile`` (the public CA certificate)

If you don't have a ``dhparam.pem`` file yet, you can easily adapt the
example below to generate this file. You can find the correct path in your
webserver config. Search for ``SSLOpenSSLConfCmd DHParameters``.

```sh
openssl dhparam -out <path>/dhparam.pem 4096

```

#### Step 4 - Adjust HTTPS Configuration

Our default configuration aims for a broad support of end user devices. This
may not fit your needs. Mozilla has a great [ssl-config
generator](https://ssl-config.mozilla.org/) that should help you to meet
your requirements!

#### Step 5 - Enable the Site

This step mostly depends on your selected folders and should only affect
``sites-available`` folders.

:::tabs

=== Ubuntu, Debian, OpenSUSE

Make sure the following line is present in your Apache config
(``/etc/apache2/apache2.conf``):
```
IncludeOptional sites-enabled/*.conf
```

Enable it:
```sh
a2ensite zammad
```

=== CentOS

Make sure the following line is present in your Apache config
(``/etc/httpd/conf/httpd.conf``):
```
IncludeOptional sites-enabled/*.conf
```

Enable it:
```sh
ln -s /etc/httpd/sites-available/zammad_ssl.conf /etc/httpd/sites-enabled/
```

:::

#### Step 6 - Save & Reload

Reload your apache with ``systemctl reload apache2`` to apply your
configuration changes.

After that, you should be greeted by our getting started wizard.  Go on with
the [first steps in Zammad](/en/tutorials/first-steps).

