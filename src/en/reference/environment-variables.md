---
title: Environment Variables
order: 3
---

# Environment Variables

Find the most important environment variables below with default values, if applicable. The variables for Docker and
package based installations can be different in some cases. You can find a badge in the column **Limited** with the
following meaning:

- Only available for Docker installations: ::d::
- Only available for package installations: ::p::
- Available for both installation variants: without badge

::: tip

If you want to use a `.env` file in Docker Compose deployments, you can use the provided `.env.dist` file and copy it
to `.env`. That way it will be picked up by Docker Compose automatically and not overwritten during updates.

:::

## Miscellaneous

| Variable            | Limited | Default Value | Description                                                                                                                                                                                         |
| ------------------- | ------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GPG_PATH            | ::p::   | unset         | Defines the path of your GPG installation. Only needed if you want to use different versions of PGP or if your PGP installation differs from the standard installation.                             |
| RAILS_LOG_TO_STDOUT | ::p::   | unset         | This setting can be overwritten during update on package installations. Use `enabled` to turn this option on only until the next update. Use `true` to turn it on permanently.                      |
| ZAMMAD_SAFE_MODE    | ::p::   | unset         | Be careful when running Zammad commands on production systems in safe mode. While it may allow an escape hatch for certain commands, it has a potential to break regular Zammad operations.         |
| ZAMMAD_BIND_IP      | ::p::   | `127.0.0.1`   | The IP address that the web server is bound to.                                                                                                                                                     |
| S3_URL              | ::p::   | unset         | Allows you to provide your S3 storage provider configuration. Example for value: `https://key:secret@s3.eu-central-1.amazonaws.com/zammad-storage-bucket?region=eu-central-1&force_path_style=true` |

## Zammad

| Variable                                                                  | Limited | Default Value                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------- | ------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VERSION                                                                   | ::d::   | current stable version of Zammad                           | Allows customization of the Zammad image tag. Example: `6.3.1-54`. This default version may be increased when you update your Zammad Docker stack. Please see the [example env file](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist)_for more details on this variable.                                                                                                                                                                                                                                                                                    |
| AUTOWIZARD_JSON                                                           | ::d::   | unset                                                      | This variable allows you to provide initial configuration data for your instance. Autowizard JSON is out of scope of this documentation, however [this example file](https://github.com/zammad/zammad/blob/stable/contrib/auto_wizard_example.json) should help.                                                                                                                                                                                                                                                                                                                  |
| ZAMMAD_HTTP_TYPE                                                          |         | unset                                                      | Set the http type for your instance. Possible values are `http` and `https`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ZAMMAD_FQDN                                                               |         | unset                                                      | Set the FQDN for your instance.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| RAILS_TRUSTED_PROXIES                                                     |         | `127.0.0.1,::1`                                            | This setting is important for the correct detection of client IP addresses and features based on it, like rate limiting. By default, Zammad trusts localhost proxies only. Any additional proxy servers will have to be added here, by IP address (if static) or by host name. Host names are resolved during the start of Zammad, so that a restart is required whenever the IP address of a proxy server changes. Note that in Docker context, Zammad may see the network gateway IP address instead of the actual proxy server IP address, if it is placed in another network. |
| ZAMMAD_PROCESS_DELAYED_<br>AI_JOBS_WORKERS                                |         | unset                                                      | How many instances of AI workers to run simultaneously. AI workers handle Zammad's AI requests and fetch the responses from the configured AI provider. By default, one worker is running. Self hosted AI users should be careful in increasing it, your AI service might collapse. For AI cloud service users with a big Zammad instance, it could make sense to increase it to have some kind of parallelization. The maximum number of workers is `16`.                                                                                                                        |
| ZAMMAD_PROCESS_DELAYED_<br>AI_JOBS_WORKERS_<br>THREADS                    |         | `5`                                                        | How many threads should be processed by **one** AI worker (if you have more than one worker, it is multiplied by the amount of workers). This may speed up the AI processing, but be aware that a Ruby worker can only span across 1 core anyway. The maximum number of threads is `16`.                                                                                                                                                                                                                                                                                          |
| ZAMMAD_PROCESS_DELAYED_<br>COMMUNICATION_INBOUND_<br>JOBS_WORKERS         |         | unset                                                      | Allows concurrent fetching of inbound communication channels. Useful if you have many channels and/or mailboxes added. `0` means it runs in the main process, `1` means one additional process, etc. The maximum number of workers is `16`.                                                                                                                                                                                                                                                                                                                                       |
| ZAMMAD_PROCESS_DELAYED_<br>COMMUNICATION_INBOUND_<br>JOBS_WORKER_THREADS  |         | `1`                                                        | Threads used for fetching inbound communication channels. How many threads should be used by inbound jobs workers. The maximum number of threads is `16`.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| MEMCACHE_SERVERS                                                          |         | - Docker: `zammad-memcached:11211`<br> - Package: unset    | Provide your own Memcached instance to Zammad if you already have one. The package installation fallback is `/opt/zammad/tmp/cache*`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| REDIS_URL                                                                 |         | - Docker: `redis://zammad-redis:6379`<br> - Package: unset | Provide your own Redis instance if you already have one. The package installation fallback is `/opt/zammad/tmp/websocket_*`. See [Redis Variables](/en/reference/redis) for a Sentinel setup.                                                                                                                                                                                                                                                                                                                                                                                     |

## Elasticsearch

| Variable                 | Limited | Default Value          | Description                                                                                                                                                                                                   |
| ------------------------ | ------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ELASTICSEARCH_ENABLED    | ::d::   | `true`                 | Setting this variable to false will allow you to run your Zammad without Elasticsearch. Please note that we strongly advise **against** doing so.                                                             |
| ELASTICSEARCH_HOST       | ::d::   | `zammad-elasticsearch` | Provide a host name or address to your external Elasticsearch cluster.                                                                                                                                        |
| ELASTICSEARCH_PORT       | ::d::   | `9200`                 | Provide a different port for Elasticsearch if needed.                                                                                                                                                         |
| ELASTICSEARCH_SCHEMA     | ::d::   | `http`                 | By default, Elasticsearch is reachable via HTTP.                                                                                                                                                              |
| ELASTICSEARCH_NAMESPACE  | ::d::   | `zammad`               | With this name space all Zammad related indexes will be created. Change this if you're using external clusters.                                                                                               |
| ELASTICSEARCH_REINDEX    | ::d::   | unset                  | The searchindex automatically gets rebuilt when no index can be detected. If you need to rebuild the searchindex manually, either set this variable to `true` or run the reindex command via Docker manually. |
| ELASTICSEARCH_SSL_VERIFY | ::d::   | `true`                 | Allows you to let the Compose scripts ignore self signed SSL certificates for your Elasticsearch installation if needed.                                                                                      |
| ELASTICSEARCH_HEAP_SIZE  | ::d::   | `1G`                   | Set the available memory for Elasticsearch. If you face issues with ES and its performance, you should increase this value to a reasonable size.                                                              |

## PostgreSQL

| Variable             | Limited | Default Value       | Description                                                                                                               |
| -------------------- | ------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| POSTGRESQL_HOST      | ::d::   | `zammad-postgresql` | Host name of your PostgreSQL server. Use your own if you already have one.                                                |
| POSTGRESQL_PORT      | ::d::   | `5432`              | Adjust the Port of your PostgreSQL server.                                                                                |
| POSTGRESQL_USER      | ::d::   | `zammad`            | The database user for Zammad.                                                                                             |
| POSTGRESQL_PASS      | ::d::   | `zammad`            | The password of Zammad's database user.                                                                                   |
| POSTGRESQL_DB        | ::d::   | `zammad_production` | Zammad's database to use.                                                                                                 |
| POSTGRESQL_OPTIONS   | ::d::   | `?pool=50`          | Additional PostgreSQL params to be appended to the database URI.                                                          |
| POSTGRESQL_DB_CREATE | ::d::   | `true`              | By default, Zammad creates the required database. On already existing database servers, the default might be troublesome. |

## Nginx

| Variable                   | Limited | Default Value        | Description                                                                                                                                                                                                                                                             |
| -------------------------- | ------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NGINX_EXPOSE_PORT          | ::d::   | `8080`               | The port to be exposed for accessing the Zammad stack from outside. Change this to another value if you already have an existing service listening on this port.                                                                                                        |
| NGINX_PORT                 | ::d::   | `8080`               | The internal port the Nginx service will listen on.                                                                                                                                                                                                                     |
| NGINX_SERVER_NAME          | ::d::   | `_`                  | By default, the Nginx container of Zammad will respond to all request. You can provide your IP / FQDN if you want to.                                                                                                                                                   |
| NGINX_SERVER_SCHEME        | ::d::   | `\$scheme`           | If the Nginx container for Zammad **is not** the upstream server (aka you're using another proxy in front of Nginx) `$scheme` may be wrong. You can set the correct scheme `http` or `https` if needed. Set this if you face a `CSRF Token Verification Failed` error.  |
| NGINX_CLIENT_MAX_BODY_SIZE | ::d::   | unset                | Define the maximum size of data that a client can send to the server.                                                                                                                                                                                                   |
| ZAMMAD_RAILSSERVER_HOST    | ::d::   | `zammad-railsserver` | Host name of the Rails server container.                                                                                                                                                                                                                                |
| ZAMMAD_RAILSSERVER_PORT    | ::d::   | `3000`               | Port of Zammad's Rails server.                                                                                                                                                                                                                                          |
| ZAMMAD_RAILS_PORT          | ::p::   | `3000`               | Port of Zammad's Rails server.                                                                                                                                                                                                                                          |
| ZAMMAD_WEBSOCKET_HOST      | ::d::   | `zammad-websocket`   | Host name of Zammad's websocket server.                                                                                                                                                                                                                                 |
| ZAMMAD_WEBSOCKET_PORT      | ::d::   | `6042`               | Port of Zammad's websocket server.                                                                                                                                                                                                                                      |

## Performance Tuning

Each of below settings comes with its own tradeoffs. There are no recommended values here; the optimal configuration
depends on your system's resources and typical application load.

Proceed with caution; when adjusting any of these settings, there is a point at which performance will begin to degrade
rather than improve, or other problems will begin to emerge.

Below settings may consume all available database connections. Please consider the
[Configure Database Server](config-db-server) for more information.

| Variable                                  | Limited | Default Value | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------- | ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ZAMMAD_WEB_CONCURRENCY                    |         | unset         | Allows spawning `n` workers to allow more simultaneous connections for Zammad's web UI. In case you applied [Docker hardware resource limits](docker-compose-scenarios#limit-resources), the zammad-railsserver's CPU setting should match the value from this variable.                                                                                                                                                                                                                                                              |
| ZAMMAD_PROCESS_SESSION_<br>JOBS_WORKERS   |         | unset         | How many instances of the session worker to run at a time. Increasing this value can speed up background jobs (like the scheduler) when many users are on Zammad at once. However, it is not useful to adjust this setting if you have less than 40 active users at a time. Increasing the amount of workers can consume a lot of resources! In case you applied [Docker hardware resource limits](docker-compose-scenarios#limit-resources), the zammad-scheduler CPU setting should match the sum of all worker settings variables. |
| ZAMMAD_PROCESS_SCHEDULED_<br>JOBS_WORKERS |         | unset         | Allows spawning `1` independent scheduled jobs worker to release pressure from Zammad's background worker. Maximum number of workers: `1`. In case you applied [Docker hardware resource limits](docker-compose-scenarios#limit-resources), the zammad-scheduler CPU setting should match the sum of all worker settings variables.                                                                                                                                                                                                   |
| ZAMMAD_PROCESS_DELAYED_<br>JOBS_WORKERS   |         | unset         | Allows spawning `n` delayed jobs workers to release pressure from Zammad's background worker. In case you applied [Docker hardware resource limits](docker-compose-scenarios#limit-resources), the zammad-scheduler CPU setting should match the sum of all worker settings variables.                                                                                                                                                                                                                                                |

## How to Set Environment Variables

It depends on how you installed Zammad (package, Docker). Either set it via `zammad config` command as you can see
below, use your system's way of setting variables via command line (e.g. `export VARIABLE=value)`, place an `.env` file
in the directory or even use a GUI like Portainer to define them for a Docker installation.

Examples for package installations:

Set OPTION to "value":

``` sh
zammad config:set OPTION=value
```

Get OPTION:

``` sh
zammad config:get OPTION
```

Unset OPTION:

``` sh
zammad config:unset OPTION
```

Restart Zammad after changing settings:

``` sh
sudo systemctl restart zammad
```
