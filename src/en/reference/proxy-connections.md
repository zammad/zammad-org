---
title: Proxy and connections
order: 10
---

# Proxy and connections

## Proxy

This section covers the proxy configuration via environment variables. As an alternative, the proxy configuration is
also possible via Zammad UI. You can find more information about that in the network section of the admin documentation.

|                                             | GUI configuration | Environment variable       |
|---------------------------------------------|-------------------|----------------------------|
| Host OS access required                     | No                | Yes                        |
| Automatically excluded loopback addresses   | Yes               | No                         |
| Configuration check                         | Yes               | Manually via test script   |
| Exceptions                                  | Yes               | No                         |

The following environment variables can be used to configure proxy settings. Adjust the values according to your
environment.

`HTTP_PROXY`
: Variable for HTTP traffic. Set it to the address of your proxy server, including the port. Does not work in Docker
  context. Example:

  ```sh
  export HTTP_PROXY="http://127.0.0.1:8080"
  ```

`HTTPS_PROXY`
: Variable for HTTPS traffic. Set it to the address of your proxy server, including the port. Does not work in Docker
  context. Example:

  ```sh
  export HTTPS_PROXY="http://127.0.0.1:8080"
  ```

`NO_PROXY`
: Variable for addresses that should be accessed directly and without proxy. Expects a comma separated list of addresses
  and supports wildcards. Use a leading `.` as wildcard for subdomains, e.g. `.example.com` would match
  example.com and all of its subdomains. Make sure to include loopback addresses to exclude them from being routed via
  proxy. Example:

  ```sh
  export NO_PROXY="localhost,127.0.0.1,.example.com"
  ```

`ES_JAVA_OPTS`
: Variable for setting a proxy for Elasticsearch. By default, Elasticsearch does not communicate to external systems
  during the operation. However, there can be cases where this is needed. Example:

  ```sh
  export ES_JAVA_OPTS="-Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=8080 -Dhttps.proxyHost=127.0.0.1 -Dhttps.proxyPort=8080"
  ```

::: tip
Depending on your environment, you might want to use the lower case variants of the variables as well. If in doubt, set
both variants by additionally specifying them with the values of the upper case variants, for example:

```sh
export http_proxy=$HTTP_PROXY
```

:::

## External connections

During installation and operation of Zammad, some connections to online services are required. Depending on your
installation method and Zammad configuration, a connection to the following services is made (maybe also helpful for
firewall configuration):

| Address                      | Comment                                               |
|------------------------------|-------------------------------------------------------|
| dl.packager.io               | Download of OS package (package installation)         |
| go.packager.io               | As above; new package hosting service                 |
| geo.zammad.com               | Used for geo data                                     |
| google.com                   | Download of feast days for the calendar               |
| index.rubygems.org           | Download of gems for ruby                             |
| registry.npmjs.org           | Download of js dependencies                           |

You can use a script to check the connection state of your system. It tries to connect to the services mentioned above
and shows the result. If every connection was successful, it displays a checkmark for each contacted service. Run it
either by fetching it from the Zammad repository or by executing the local version on your Zammad machine.

**Fetch script from remote:**

```sh
curl -fsSL https://raw.githubusercontent.com/zammad/zammad/refs/heads/stable/contrib/packager.io/test_download_dependencies_connection.sh | sh
```

**Use local script:**

```sh
/opt/zammad/contrib/packager.io/test_download_dependencies_connection.sh
```

## Web push notifications

Zammad can notify agents about their tickets on mobile devices. These notifications are delivered as web push messages
of the device's browser. On Android, a supported browser and the installed mobile view can both receive them. On
iPhone and iPad, the mobile view has to be added to the home screen first. How to set them up on a device is described
in the [mobile view documentation](/en/documentation/use/guides/mobile-view).

The messages are sent by the background worker of Zammad over HTTPS (port 443) to the push service of the browser
vendor. A firewall that restricts outgoing traffic has to allow the following addresses, including their subdomains:

| Address                     | Comment                                               |
|-----------------------------|-------------------------------------------------------|
| fcm.googleapis.com          | Web push for Chrome and other Chromium-based browsers |
| jmt17.google.com            | Alternative address of the Google push service        |
| notify.windows.com          | Web push for Microsoft Edge                           |
| push.services.mozilla.com   | Web push for Mozilla Firefox                          |
| web.push.apple.com          | Web push for Safari on iPhone, iPad and Mac           |

The proxy configuration described above applies to these connections as well, including the no-proxy list of the GUI
configuration and the `NO_PROXY` environment variable.

Zammad only accepts device subscriptions of the push services listed above. A browser that uses another push service
cannot enable push notifications.

There is nothing to configure in Zammad. The key pair used to sign the messages (VAPID) is generated once per
installation and is not meant to be changed: all existing device subscriptions become invalid if it changes.

The push service of the browser vendor delivers the messages, not Zammad. Depending on the device, delivery can take a
while, for example when battery optimization delays it on Android devices. A message that cannot be delivered right
away is kept by the push service for up to one day. On iPhone and iPad, several messages about the same ticket stay as
separate notifications, while other platforms replace the previous one.
