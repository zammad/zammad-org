---
order: 9
title: 'Variabili Redis'
---

# Variabili Redis

Zammad richiede Redis per funzionare. Durante l'installazione del pacchetto,
viene installato automaticamente.

## Configurazione standard

Per una distribuzione Redis standard, puoi fornire una variabile:
`REDIS_URL`. Questa variabile.

- `redis://redis.example.com:1234`
- `redis://user:password@redis.example.com`

## Configurazione Sentinel

Le variabili nella tabella non hanno valori predefiniti impostati. Nel caso
tu voglia connettere Zammad.

 Variabile                    | Descrizione
