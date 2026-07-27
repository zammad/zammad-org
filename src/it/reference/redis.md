---
order: 9
title: 'Redis variables'
---

# Redis variables

Zammad richiede Redis per funzionare. Durante l'installazione del pacchetto,
viene installato automaticamente.

## Standard setup

Per una distribuzione Redis standard, puoi fornire una variabile:
`REDIS_URL`. Questa variabile.

- `redis://redis.example.com:1234`
- `redis://user:password@redis.example.com`

## Sentinel setup

Le variabili nella tabella non hanno valori predefiniti impostati. Nel caso
tu voglia connettere Zammad.

 Variable                    | Description                                                                                                                                      |
-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
 `REDIS_SENTINELS`           | Mandatory when using a Sentinel setup; comma separated IPs/URLs; optional port. Examples: `sentinel1.example.com:26380`, `sentinel2.example.com` |
 `REDIS_SENTINEL_NAME`       | Name of Sentinel setup; fallback to `mymaster` if not provided                                                                                   |
 `REDIS_SENTINEL_USERNAME`   | Username for Sentinel                                                                                                                            |
 `REDIS_SENTINEL_PASSWORD`   | Password for Sentinel                                                                                                                            |
 `REDIS_USERNAME`            | Username for Redis                                                                                                                               |
 `REDIS_PASSWORD`            | Password for Redis                                                                                                                               |
