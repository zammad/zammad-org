---
order: 4
title: 'Sichern & Wiederherstellen'
---

# Sichern & Wiederherstellen

Zammad ships scripts in package installations for backup & restore which you
can use.

:::warning
These scripts do not come with any warranty and may not work in your specific
use case. This depends on the configuration and installation type of your
instance.

You should always regularly test and review the functionality! If the script
functionality or scope is not working for your cases, feel free to copy these
to a independent location and adjust the scripts as needed.
:::

There are some limitations you should know:

- These scripts won't work in container based installations.
- They only work for PostgreSQL installations.
- The backup is always a full dump (no incremental backup).
- Partial backup and restore (e.g. only specific data like tickets,users) is
  not possible.
- Switching database system is not possible.
- System settings (like environment variables) are not backed up.
- Restore to an older Zammad version is not possible.
- Do not restore backup files from custom scripts with the provided scripts
  by Zammad. This might cause problems.

## Quick Start

The scripts are located in `/opt/zammad/contrib/backup`. The following files
are relevant:

- Backup configuration file: `config.dist`
- Script for backing up your data: `zammad_backup.sh`
- Script for restoring your data: `zammad_restore.sh`

To execute a backup based on the default configuration, follow the steps
below:

1. Copy the `config.dist` file to `config`.
1. Change default parameters in the config file if needed. See [Backup
   Configuration](#backup-config-parametersbackup-config-parameters) for
   details.
1. Stop Zammad `systemctl stop zammad`
1. Execute `/opt/zammad/contrib/backup/zammad_backup.sh` (as `root` or
   `zammad` user)

## Backup Configuration

You can find details about the configuration parameters with default values
below.

`BACKUP_DIR` <Badge type="info" text="/var/tmp/zammad_backup"/>
: Location where the script writes the backup files to. The directory will be
  created if it does not exist. Make sure you have enough space because the
  script writes full dumps.

`HOLD_DAYS` <Badge type="info" text="10"/>
: Define how many days the backup script should keep old backups. This value
  contains a 60 minutes grace period (e.g. 10 days plus 1 hour) for safety
  reasons. Old backups are removed before creating the a new backup.

  Examples:
  - `1` will keep backups of the last 25 hours
  - `-1` will remove all available backups (except the new one)

`FULL_FS_DUMP` <Badge type="info" text="yes"/>
: - `yes`: the backup includes also application files.
  - `no`: the backup includes only user data.

  In any case, it includes the Zammad database and the attachments, if you
  stored them in the file system. If you are in doubt, set this to no.

``DEBUG`` <Badge type="info" text="no"/>
: Setting this option to `yes` will output useful debug messages.
  :::warning
  This option potentially returns sensitive information to standard output! Do
  not use this option in production environments or ensure to turn it off after
  testing.
  :::

## Restore Backups

### Important Information

Please read the following information carefully before starting to restore
your data.

- This section is **not** about **migrating from one host to another**. You
  can find instructions about this topic in the [next
  section](#migrate-to-a-new-host).
- This guide expects a fully installed Zammad version
- It also expects you to restore Zammad on the same host and Zammad version
- The restore process stops & restarts Zammad. Therefore you have to run the
  restore script with appropriate permissions (e.g. as root).
- PostgreSQL based installations will drop and re-create the database!
- At least twice the backed up Zammad instance size of free storage is
  required. If you have the dump only, factor 3 could be a good number.

:::tip
If your scenario is different as described above, please consult the
[Zammad Community](https://community.zammad.org/c/trouble-running-zammad-this-is-your-place/5) or consider
[paid support options](https://zammad.com/en/services/professional-services).
:::

### Copy Backup Files to a Fitting Location

Ensure that the user you're using for restoration is allowed to read the
backup files and to write to `/opt/zammad/`.

The Zammad backup consists of two files. They are named like this:

```
<timestamp>_zammad_db.psql.gz
<timestamp>_zammad_files.tar.gz
```
There are also two symlinks in your backup directory pointing to the newest
backup created:

```
latest_zammad_db.psql.gz
latest_zammad_files.tar.gz
```

Copy them to a fitting location which is accessible for the user who
executes the restore script.

### Configure Backup Script

For a new installation, this is required. At least you have to provide a
directory where your backups are stored. See [Backup
Configuration](#backup-configuration) for more information.

### Run the Restore

Be aware that restoring backups can overwrite your `database.yml`. You can
check that by looking into the `[...]_zammad_files.tar.gz` file. If there
is a `database.yml` in the directory *config > database*, ensure to save the
original version **before restoring**.

The restore works in two possible ways, depending on how interactive you
want to go:

::::tabs

=== Interactive restore (recommended)
Run the script:
```bash
/opt/zammad/contrib/backup/zammad_restore.sh
```
Provide the requested information to the script and wait for the restore
process to finish. Depending on the size of your backup and host performance,
this may take some time.

=== Non-interactive restore

:::warning
Only use the following option if you know what you're doing! The following
command will overwrite existing data without further prompts!
:::
When called with a timestamp argument (matching the backups filename),
Zammad will proceed immediately to restoring the specified backup.
```bash
/opt/zammad/contrib/backup/zammad_restore.sh 20170507121848
```
::::

The result should look like this:

```
# Zammad restore started - Fri Jan 21 17:54:13 CET 2022!

The restore will delete your current database!
Be sure to have a backup available!

Please ensure to have twice the storage of the uncompressed backup size!

Note that the restoration USUALLY requires root permissions as services are stopped!

Enter 'yes' if you want to proceed!
Restore?: yes
Enter file date to restore:
20220120124714
20220121175344
File date: 20220121175344
Enter db date to restore:
20220120124714
20220121175344
DB date: 20220121175344
# Stopping Zammad
# Checking requirements
# ... Dropping current database zammad
Dropped database 'zammad'
# ... Creating database zammad for owner zammad
CREATE DATABASE
# Restoring PostgreSQL DB
# Restoring Files
# Ensuring correct file permissions ...
# Clearing Cache ...
# Starting Zammad

# Zammad restored successfully - Fri Jan 21 17:54:34 CET 2022!
```

### Additional Steps

- If you've set any environmental settings, please re-apply them now.
- If not already done, [install
  Elasticsearch](/en/tutorials/install-elasticsearch) now.
- [Connect Elasticsearch with Zammad and rebuild its search
  index](/en/tutorials/connect-config-elasticsearch). The rebuild can safely
  run during your work, but will cause a degraded search performance and may
  lead to temporarily not found data.


