---
title: Memory allocator
order: 9
---

# Memory allocator

Package installations use [jemalloc](https://jemalloc.net/){target=_blank} as memory allocator for all Zammad Ruby
processes, as recommended by Rails. This reduces memory usage and fragmentation. The package postinstall script
preloads the jemalloc library automatically if it's present on your system. This happens on every package installation
and upgrade.

Docker installations have jemalloc enabled by default (baked into the image). To opt out, override the environment
variable with an empty value (e.g. `LD_PRELOAD=""` in your compose or env file).

## Availability

- Debian and Ubuntu: libjemalloc2 is installed automatically as package dependency.
- CentOS and RHEL: jemalloc is installed automatically from the EPEL repository (already a Zammad dependency).
- SLES: jemalloc is **not** installed automatically (available via SUSE Package Hub or SLE modules). If you install it
  manually with `zypper install jemalloc`, Zammad activates it automatically on the next package installation or
  upgrade.

## Opt-out and opt-in

To opt out of using jemalloc:

```sh
zammad config:set ZAMMAD_USE_JEMALLOC=no
```

This takes effect on the next package installation or upgrade. The postinstall script then removes the `LD_PRELOAD`
variable entirely, so a pre-existing system value is respected. For immediate effect:

```sh
zammad config:unset LD_PRELOAD
```

```sh
sudo systemctl restart zammad
```

To opt back in, unset the variable again (any value other than `no` re-enables jemalloc on the next package
installation or upgrade):

```sh
zammad config:unset ZAMMAD_USE_JEMALLOC
```

To verify whether jemalloc is active, run:

```sh
zammad run ruby -e 'puts File.read("/proc/self/maps").match?(/jemalloc/) ? "jemalloc active" : "jemalloc NOT active"'
```
