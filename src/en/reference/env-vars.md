---
title: Environment Variables
order: 3
---

# Configuration via Environment Variables

Use these environment variables to configure Zammad's behavior at
runtime. You may want to have a look at the
[collection of rails commands](/en/reference/console) as well.

::: warning
Please note that environment variables may be named differently for
installations based on [Docker](/en/reference/docker-env-vars) and Kubernetes.
:::

Click to open details about how to set an environment variable:

:::details

It depends on how you installed Zammad (source, package, docker). Either set it via `zammad config` command as you can
see below, use your system's way of setting variables via command line (e.g. `export VARIABLE=value`), place an `.env`
file in the directory or even use a GUI like Portainer to define them for a docker installation.

Examples for package installations:

**Set OPTION to "value":**

```sh
zammad config:set OPTION=value

```

**Get OPTION:**

```sh
zammad config:get OPTION

```

**Unset OPTION:**

```sh
zammad config:unset OPTION

```

**Restart Zammad:**

```sh
systemctl restart zammad

```

:::

Default values are tagged with a <Badge type="info" text="badge"/>, if present.

## General Options

`GPG_PATH`
: Defines the path to the GPG installation. This is only needed if you
  installed Zammad from Source, if you want to use different versions of
  PGP on your machine or if your PGP installation differs from the
  standard installation.

`RAILS_LOG_TO_STDOUT`
: Print output directly to standard output instead of
  `/var/log/zammad/production.log`.

  This setting can be overwritten during update on package installations.
  Use `enabled` to turn this option on only until the next update. Use
  `true` to turn it on permanently.

`ZAMMAD_SAFE_MODE`
: Ignore availability of third-party services when running Zammad
  commands. Possible values: `1` or `true`

  ::: warning
  **Be careful** when running Zammad commands on production systems in
  safe mode.

  While it may allow an escape hatch for certain commands, it has a
  potential to break regular Zammad operations.
  :::

`ZAMMAD_HTTP_TYPE`
: Defines the HTTP protocol of your instance. Possible values: `http` or
  `https`

`ZAMMAD_FQDN`
: Defines the fully qualified domain name of the system.

## Network Options

::: tip
Remember to update your web server config to reflect any changes you
make here.
:::

`ZAMMAD_BIND_IP` <Badge type="info" text="127.0.0.1"/>
: The IP address that the web server is bound to.

`ZAMMAD_RAILS_PORT` <Badge type="info" text="3000"/>
: The port that the web server is exposed on.

`ZAMMAD_WEBSOCKET_PORT` <Badge type="info" text="6042"/>
: The port that the web socket server is exposed on.

## Performance Tuning

Each of below settings comes with its own tradeoffs. There are no "recommended
values" here; the optimal configuration will depend on your system's resources
and typical application load.

Below settings _may_ consume all available database connections. Please
consider to check your database server configuration.

::: danger
Proceed with caution and only if you know what you are doing!
The settings below may lead to a very high load of your system and/or disable
relevant parts of Zammad.
:::

To find out how many users are currently on Zammad, you can use the
rails command below:

```sh
zammad run rails r "p Sessions.list.uniq.count"
```

`WEB_CONCURRENCY`
: How many instances of the application server to keep open at a time.
  Increasing this can reduce loading times when too many users are on
  Zammad at once.

`ZAMMAD_PROCESS_SESSION_JOBS_WORKERS`
: How many instances of the session worker to run at a time.

  Increasing this can speed up background jobs (like the scheduler) when many users are on Zammad at once.

  It is not useful to adjust this setting if you have less than 40 active users at a time. Increasing the amount of
  workers can consume a lot of resources!

`ZAMMAD_PROCESS_SCHEDULED_JOBS_WORKERS`
: Allows spawning an independent process just for processing scheduled
  jobs like LDAP syncs. This can free up Zammad's background worker for
  other tasks when running tasks that take rather long.

  Maximum number of workers: `1`

  You can disable the processing of scheduled jobs by setting
  `ZAMMAD_PROCESS_SCHEDULED_JOBS_DISABLE` (not recommended!).

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKERS`
: How many processes should work on delayed jobs? Increasing this can improve issues with delayed jobs stacking up in
  your system. You may want to try to use `ZAMMAD_SESSION_JOBS_CONCURRENT` before though.

  Maximum number of workers: `16`

`ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS`
: How many instances of AI workers should run simultaneously. AI workers handle Zammad's AI requests and fetch the
  responses from the configured AI provider. By default, one worker is running.

  Self hosted AI users should be careful in increasing it. Depending on your hardware, it may cause your AI service to
  collapse.

  For AI cloud service users with a big Zammad instance, it could make sense to increase it to have some kind of
  parallelization.

  Maximum number of workers: `16`

`ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS_THREADS` <Badge type="info" text="5"/>
: How many threads should be processed by one AI worker (if you have more than one worker, it is multiplied by the
  amount of workers). This may speed up the AI processing, but be aware that a ruby worker can only span across 1 core
  anyway.

  Maximum number of threads: 16

## Additional Performance Adjustments

::: info
The options listed below allow you to distribute Zammad processes over
several application nodes. Even if that's not your goal, they may
provide great benefits on bigger installations.

Please note that distribution of processes on several nodes is out of
the scope of this documentation.
:::

`REDIS_URL`
: Store your web socket connection information within Redis.
  To do so, tell Zammad where to find your Redis instance:
  `redis://your.redis.server:6379`
  If not provided, Zammad falls back to file system
  (`/opt/zammad/tmp/websocket_*`).

`MEMCACHE_SERVERS`
: Store your application cache files within Memcached.
  To do so, tell Zammad where to find your Memcached instance:
  `your.memcached.server:11211`
  If not provided, Zammad falls back to file system
  (`/opt/zammad/tmp/cache*`).

  Memcached allows you to restrict the maximum size Zammad may store as
  cache. This comes in handy in terms of performance and keeping caching
  files small. `1 GB` should be a reasonable size.

## Storage Options

`S3_URL`
: Allows you to provide your S3 configuration.

  Format / example:

  ```sh
  https://key:secret@s3.eu-central-1.amazonaws.com/zammad-storage-bucket?region=eu-central-1&force_path_style=true
  ```
