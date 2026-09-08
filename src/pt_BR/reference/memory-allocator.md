---
order: 9
title: 'Alocador de memória'
---

# Alocador de memória

Instalações via pacote usam o
[jemalloc](https://jemalloc.net/){target=_blank} como alocador de memória
para todos os processos Ruby do Zammad, conforme recomendado pelo
Rails. Isso reduz o uso de memória e a fragmentação. O script de
pós-instalação do pacote pré-carrega a biblioteca jemalloc automaticamente
se ela estiver presente no seu sistema. Isso acontece em toda instalação ou
atualização do pacote.

Instalações via Docker têm o jemalloc ativado por padrão (embutido na
imagem). Para desativar, sobrescreva a variável de ambiente com um valor
vazio (por exemplo, `LD_PRELOAD=""` no seu arquivo compose ou env).

## Disponibilidade

- Debian e Ubuntu: o libjemalloc2 é instalado automaticamente como
  dependência do pacote.
- CentOS e RHEL: o jemalloc é instalado automaticamente a partir do
  repositório EPEL (já uma dependência do Zammad).
- SLES: o jemalloc **não** é instalado automaticamente (disponível via SUSE
  Package Hub ou módulos SLE). Se você instalá-lo manualmente com `zypper
  install jemalloc`, o Zammad o ativa automaticamente na próxima instalação
  ou atualização via pacote.

## Ativar e desativar

Para desativar o uso do jemalloc:

```sh
zammad config:set ZAMMAD_USE_JEMALLOC=no
```

Isso tem efeito na próxima instalação ou atualização via pacote. O script de
pós-instalação então remove a variável `LD_PRELOAD` por completo, para que
um valor de sistema pré-existente seja respeitado. Para efeito imediato:

```sh
zammad config:unset LD_PRELOAD
```

```sh
sudo systemctl restart zammad
```

Para reativar, remova a definição da variável novamente (qualquer valor
diferente de `no` reativa o jemalloc na próxima instalação ou atualização
via pacote):

```sh
zammad config:unset ZAMMAD_USE_JEMALLOC
```

Para verificar se o jemalloc está ativo, execute:

```sh
zammad run ruby -e 'puts File.read("/proc/self/maps").match?(/jemalloc/) ? "jemalloc active" : "jemalloc NOT active"'
```
