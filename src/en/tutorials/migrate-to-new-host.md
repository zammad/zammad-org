---
title: Migrate Zammad to a New Host
order: 99
---

<!-- Should be completely dropped because it is a mess. Because I already started, I kept it to not loose already done work  -->

# Migrate Zammad to a New Host

This is just a description of basic steps to perform a migration to a new host.
Your environment may be different so you should consider this as a reference
point only. If anything goes wrong, please consult the
[Zammad Community](https://community.zammad.org/c/trouble-running-zammad-this-is-your-place/5) or consider
[paid support options](https://zammad.com/en/services/professional-services).

:::tip
Migrating from Zammad SaaS? Skip to step 7. For restoration, you've received an
attachment dump!
:::

## Step 1: Check and Save your Environmental Adjustments

Note them down or backup your `.env` files.

## Step 2: Install Zammad on the Destination Host

For the easiest restoration path possible, please install the same version
like your origin instance. You could also consider updating the old instance
before migrating. Have a look at the installation instructions and follow the
steps.

## Step 3: Activate Maintenance Mode

Activate the maintenance mode in Zammad's admin interface under
*System > Maintenance*. This ends all agent and customer sessions.

## Step 4: Disable your Communication Channels

This makes sure that no data is lost during the process. Go to Zammad's admin
interface and disable all active communication channels.

## Step 5: Stop and Disable Zammad

```bash
systemctl disable zammad
systemctl stop zammad
```

## Step 6: Perform the Backup

Follow the [quick start guide](#quick-start) to create your backup.
Remember if you’ve created a full filesystem dump or only backed up your data.
This will be important for the restoration.

If you want to go the easiest way, consider only
[dumping your data](#backup-configuration).

## Step 7: Transfer your Backup Files

Save your backup files in a directory and provide the path to the `config`
file. See [backup configuration](#backup-configuration) how to adjust it.

## Step 8: Restore Your Backup

Follow the steps from the [Restore Backup](#restore-backups) section.

Make sure to stop Zammad after the restoration has finished:
```bash
systemctl stop zammad
```

## Step 9: Run Required Maintenance Tasks After Restoring

Depending if you only backed up your data or a full filesystem dump:

:::tabs

=== Data dump (recommended)
Clear cache:
```bash
zammad run rails r "Rails.cache.clear"
```

=== Full filesystem dump

::::warning
This step is only needed, if one of the following points is met:

- The source and destination Zammad versions are not the same
- The Zammad installation is not a source code installation
- The Zammad backup is not an export from our hosted setup

Zammad files are distribution and version specific!
::::

:::