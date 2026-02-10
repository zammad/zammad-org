---
order: 9
title: 'Redis Variablen'
---

# Redis Variablen

Zammad benötigt Redis, um zu funktionieren. Während der Paketinstallation
wird es automatisch installiert, sofern nicht bereits eine
Redis-Installation auf dem Host vorhanden ist. Im Docker Compose Stack ist
ein Redis Service enthalten. Beide Szenarien funktionieren standardmäßig und
sollten keine Anpassungen erfordern, es sei denn, Ihr Setup weicht davon ab
oder Sie möchten explizit Anpassungen vornehmen.

## Standard Setup

For a Redis standard deployment, you can provide one variable:
`REDIS_URL`. This variable can include IP/URL, a port, a username and
password. Examples:

- `redis://redis.example.com:1234`
- `redis://user:password@redis.example.com`

## Sentinel Setup

The variables in the table don't have default values set. In case you want
to connect Zammad to a Redis Sentinel cluster, only `REDIS_SENTINELS`
variable is mandatory, the others are optional.

 Variable | Beschreibung |
-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
 `REDIS_SENTINELS` | Erforderlich bei Verwendung eines Sentinel-Setups; IPs/URLs durch Komma getrennt; optionaler Port. Beispiele: `sentinel1.example.com:26380`, `sentinel2.example.com` |
 `REDIS_SENTINEL_NAME` | Name des Sentinel-Setups; Fallback auf `mymaster`, wenn nicht angegeben |
 `REDIS_SENTINEL_USERNAME` | Benutzername für Sentinel |
 `REDIS_SENTINEL_PASSWORD` | Passwort für Sentinel |
 `REDIS_USERNAME` | Benutzername für Redis |
 `REDIS_PASSWORD` | Passwort für Redis |
