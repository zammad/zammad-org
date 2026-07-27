---
title: Backup & restore (Docker)
order: 6
---

# Backup & restore (Docker)

This section shows some basics about the backup and restore process for a Docker Compose based deployment of Zammad.

If you are familiar with volume based backup and restore procedures in Docker, and perhaps already use a different
method or tool, then you can keep using it. A backup would typically mean shutting down the stack to ensure all
in-memory files get written to disk, then backing up the volume contents, and then starting the stack again. When using
such method, you can consider using the [disable-backup-service scenario](/en/reference/docker-compose-scenarios) so
that the built-in backup and restore mechanism of Zammad is not activated.

The rest of this page describes the built-in backup and restore mechanism of Zammad's Docker Compose stack.

If you're familiar with Docker, the sections below include the information you'll need. The
[Docker file handling](/en/tutorials/docker-file-handling) page covers some examples about how to handle the
backup files and to copy it into a Docker volume to restore it.

## Backup

By default, a backup is created at 3 o'clock each night. The backup is stored in the volume of the **zammad-backup**
container under `/var/tmp/zammad`. To trigger a one-time backup manually, use one of the commands below, depending
on your deployment method.

::: tabs key:docker-portainer

=== Docker Compose

In your Docker Compose directory, run:

```sh
docker compose run --rm --env BACKUP_ONCE=true zammad-backup
```

=== Portainer

Open the [console via Portainer's GUI](/en/get-started/installation/docker#how-to-run-commands-in-the-stack) for the
**zammad-backup** container with the standard entrypoint `/bin/bash` and run:

```sh
BACKUP_ONCE=true bin/docker-entrypoint zammad-backup
```

:::

## Restore

1. Start the new stack at least once so a Zammad database is available.
2. Stop the stack.
3. In case you restore to a production stack with activated file system storage, you should purge the content of the
   directory `/opt/zammad/storage/` inside the volume. The restore process only adds/overwrites files there, no cleanup
   will take place.
4. Copy or move the backup files to `/var/tmp/zammad/restore/` inside the volume of the **zammad-backup** container. Be
   aware that the restore process always uses the latest backup according to the timestamp of the file name. Only
   backups from package and Docker installations are supported by this built-in backup method. Don't provide the
   `latest_zammad_*.gz` files because they link to an unknown location for the restore process.
5. Start the stack. The restore process is triggered in the `zammad-backup` service if the `restore` directory is
   detected and the backup files are in place. As a part of this process, the Rails cache will be cleared.
   All other containers wait for the restore to finish before they resume their normal operations.
6. After the restore process has finished, the `restore` directory got renamed. You can safely delete it now.
7. Rebuild the Elasticsearch index. You can use Zammad while the rebuild is running, but search performance is
   degraded and some data may be temporarily unavailable in search results. Use one of the commands below, depending
   on your deployment method.

::: tabs key:docker-portainer

=== Docker Compose

Without specifying CPU cores:

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild
```

With specifying CPU cores to use (example 8):

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild[8]
```

=== Portainer

Open the [console via Portainer's GUI](/en/get-started/installation/docker#how-to-run-commands-in-the-stack) with the
standard entrypoint `/bin/bash` and run:

Without specifying CPU cores to use:

```sh
bundle exec rake zammad:searchindex:rebuild
```

With specifying CPU cores to use (example 8):

```sh
bundle exec rake zammad:searchindex:rebuild[8]
```

:::
