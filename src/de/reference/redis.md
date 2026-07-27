---
order: 9
title: 'Redis variables'
---

# Redis variables

Zammad benötigt Redis, um zu funktionieren. Während der Paketinstallation
wird es automatisch installiert, sofern nicht bereits eine
Redis-Installation auf dem Host vorhanden ist. Im Docker Compose Stack ist
ein Redis Service enthalten. Beide Szenarien funktionieren standardmäßig und
sollten keine Anpassungen erfordern, es sei denn, Ihr Setup weicht davon ab
oder Sie möchten explizit Anpassungen vornehmen.

## Standard setup

Für eine Redis-Standardinstallation können Sie eine Variable angeben:
`REDIS_URL`. Diese Variable kann IP/URL, einen Port, einen Benutzernamen und
ein Passwort enthalten. Beispiele:

- `redis://redis.example.com:1234`
- `redis://user:password@redis.example.com`

## Sentinel setup

Für die Variablen in der Tabelle sind keine Standardwerte festgelegt. Falls
Sie Zammad mit einem Redis Sentinel Cluster verbinden wollen, ist nur die
Variable `REDIS_SENTINELS` erforderlich, die anderen sind optional.

 Variable | Beschreibung |
-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
 `REDIS_SENTINELS` | Erforderlich bei Verwendung eines Sentinel-Setups; IPs/URLs durch Komma getrennt; optionaler Port. Beispiele: `sentinel1.example.com:26380`, `sentinel2.example.com` |
 `REDIS_SENTINEL_NAME` | Name des Sentinel-Setups; Fallback auf `mymaster`, wenn nicht angegeben |
 `REDIS_SENTINEL_USERNAME` | Benutzername für Sentinel |
 `REDIS_SENTINEL_PASSWORD` | Passwort für Sentinel |
 `REDIS_USERNAME` | Benutzername für Redis |
 `REDIS_PASSWORD` | Passwort für Redis |
