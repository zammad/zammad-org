---
order: 9
title: 'Redis variables'
---

# Redis variables

O Zammad requer o Redis para funcionar. Durante a instalação via pacote, ele
é instalado automaticamente, a menos que já haja uma instalação do Redis no
host. Na stack do Docker Compose, há um serviço Redis incluído. Ambos os
cenários funcionam imediatamente e não devem exigir ajustes, a menos que sua
configuração seja diferente ou você queira fazer ajustes explicitamente.

## Standard setup

Para uma implantação padrão do Redis, você pode fornecer uma variável:
`REDIS_URL`. Essa variável pode incluir IP/URL, uma porta, um nome de
usuário e senha. Exemplos:

- `redis://redis.example.com:1234`
- `redis://user:password@redis.example.com`

## Sentinel setup

As variáveis na tabela não têm valores padrão definidos. Caso você queira
conectar o Zammad a um cluster Redis Sentinel, apenas a variável
`REDIS_SENTINELS` é obrigatória; as outras são opcionais.

 Variable                    | Description                                                                                                                                      |
-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
 `REDIS_SENTINELS`           | Obrigatório ao usar uma configuração Sentinel; IPs/URLs separados por vírgula; porta opcional. Exemplos: `sentinel1.example.com:26380`, `sentinel2.example.com` |
 `REDIS_SENTINEL_NAME`       | Nome da configuração Sentinel; padrão para `mymaster` se não fornecido                                                                                   |
 `REDIS_SENTINEL_USERNAME`   | Nome de usuário para o Sentinel                                                                                                                            |
 `REDIS_SENTINEL_PASSWORD`   | Senha para o Sentinel                                                                                                                            |
 `REDIS_USERNAME`            | Nome de usuário para o Redis                                                                                                                               |
 `REDIS_PASSWORD`            | Senha para o Redis                                                                                                                            |
