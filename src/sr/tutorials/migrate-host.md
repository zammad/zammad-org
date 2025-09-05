---
order: 12
title: 'Migrate Zammad to New Host'
---

# Migrate Zammad to New Host

This is just a description of basic steps to perform a migration to a new
host. Your environment may be different so you should consider this as a
reference point only. If anything goes wrong, please consult the [Zammad
Community](https://community.zammad.org/c/trouble-running-zammad-this-is-your-place/5){target=_blank}
or consider [paid support
options](https://zammad.com/en/services/professional-services){target=_blank}.

The steps described on this page are an addition to the [backup and restore
guide](/en/tutorials/backup-restore). They're not meant to stand alone -
we'll link and note this in the relevant parts.

::: tip
Migrating from Zammad SaaS? Skip to
[Step 7](#step-7-transfer-your-backup-files). For restoration, you've
received an attachment dump!
:::

## Step 1: Note Down Your Environmental Adjustments

If you have set any environment variables or similar, make sure to backup
them.

## Step 2: Install Zammad on the Destination Host

For the easiest restoration path possible, please install the same version
like your origin instance. You could also consider updating the old instance
before migrating. The following guide assumes that you have the same version
of Zammad on your old and new host.

## Step 3: Activate Maintenance Mode

This ends all agent and customer sessions. Activate it in Zammad's admin
interface under _System > Maintenance_.

## Step 4: Disable Your Communication Channels

The restore script starts Zammad automatically, this may help to avoid data
loss and inconsistencies.

## Корак 5: Зауставите и искључите Zammad

Make sure that no data will be changed _before_ backing up.

```sh
sudo systemctl disable zammad
```

```sh
sudo systemctl stop zammad
```

## Step 6: Backup

Follow the [backup guide](/en/tutorials/backup-restore#) to create your
backup.

Remember if you've created a full filesystem dump or only backed up your
data. This will be important for the restoration.

If you want to go the easiest way, consider only dumping your data.

## Step 7: Transfer Your Backup Files

Save your backup files in a directory and provide the path to the `config`
file. Under [backup
configuration](/en/tutorials/backup-restore#backup-configuration) you can
find how to adjust the config file to your needs.

## Step 8: Restore Your Backup

Follow the [restoration guide](/en/tutorials/backup-restore#restore-backups)
up to and including "Run the Restore" to restore the backup on the new host.

Make sure to stop Zammad after the restoration has finished.

## Step 9: Run Required Maintenance Tasks After Restoring

After successful restoration, please continue below depending if you've only
backed up your data or have a full filesystem dump.

### Data Dump

#### Step 9.1: Clear the cache

```sh
zammad run rails r "Rails.cache.clear"
```

### Full Filesystem Dump

::: info
This step is only needed, if one of the following points is met:

- The source and destination Zammad versions are not the same
- The Zammad installation is not a source code installation
- The Zammad backup is not an export from our hosted setup

Full dumps for source code installations are not covered, however,
basically the same below applies to you: You have to ensure that the
environments and application files are overwritten with the new /
correct version.

Zammad files are distribution and version specific!
:::

#### Step 9.1: Uninstall and Reinstall Zammad Without Resolving Dependencies

::: tabs

=== Debian & Ubuntu

```sh
sudo dpkg -r --force-depends zammad
```

```sh
sudo apt install zammad
```

=== OpenSUSE

``` sh
sudo zypper remove -R zammad
```

```sh
sudo zypper install zammad
```

:::

::: tip
You're unsure if above is really required and a mere reinstall would be
enough? If you run a dedicated install command on for Zammad and receive
the following, you absolutely have to run above to fix your
installation.

``` sh
root@zammad:/# apt-get update && apt install zammad
  Reading package lists... Done
  Building dependency tree
  Reading state information... Done
  zammad is already the newest version (x.x.x-xxxxxx.xxxxxx.xxx).
  0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
```

:::

#### Step 9.2: Clear the Cache

```sh
zammad run rails r "Rails.cache.clear"
```

#### Step 9.3: Ensure Zammad is Running

``` sh
sudo systemctl status zammad
```

If Zammad is not running, run:

```sh
sudo systemctl start zammad
```

:::tip
Migrated from Zammad SaaS or switching provider?

Please make sure that your email notification channel and
FQDN configuration is correct.
:::

## Step 10: Apply Missing Environmental Settings

If you've set any environmental settings please re-apply your settings now.
You backed them up in [Step
1](#step-1-note-down-your-environmental-adjustments).

If not already done, please [install
Elasticsearch](/en/tutorials/install-elasticsearch) now and perform the
steps to [connect to and configure
Elasticsearch](/en/tutorials/connect-config-elasticsearch) after
installation.

## Step 11: Re-enable Channels and Deactivate Maintenance Mode

Set the previous deactivated channels back to active if you're sure
everything was successful. At this point Zammad will start to _change data_!

After verifying the functionality of your channels, allow your agents and
customers to log in again by disabling the maintenance mode.
