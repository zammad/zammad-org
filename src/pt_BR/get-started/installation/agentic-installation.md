---
order: 5
title: 'Instalação agêntica'
---

# Instalação agêntica

::: danger
Esteja ciente de que as etapas de configuração para agentes de IA não cobrem tópicos de segurança, rede e configuração (por exemplo, certificados
SSL, configuração de nome de host, configurações do Elasticsearch). Em vez disso, essas etapas tratam de uma configuração básica simples do
Zammad. Para usá-lo em produção, certifique-se de configurá-lo de forma adequada de acordo com os outros recursos desta
documentação.
:::

Se você quiser instalar o Zammad via agente LLM, faça isso apontando seu
agente para um dos arquivos de instrução de instalação que você encontra
abaixo.

## Instalação via Docker Compose

Este arquivo cobre uma instalação via Docker Compose, buscando o
[repositório padrão do Docker
Compose](https://github.com/zammad/zammad-docker-compose){target=_blank} do
Zammad.

Pré-requisitos:

- Configuração do Docker Compose em execução
- Git instalado

Instruções:

```plain
https://raw.githubusercontent.com/zammad/zammad-org/refs/heads/develop/install-docker.md
```

## Instalação via gerenciador de pacotes

Este arquivo cobre uma instalação via gerenciador de pacotes, incluindo o
Elasticsearch.

Pré-requisitos:

- Sistema operacional hospedeiro: Ubuntu (22.04 ou 24.04) ou Debian (12 ou
  13).
- `curl`, `apt-transport-https` e `gnupg` instalados.
- Uma localidade com suporte a UTF-8.

Instruções:

```plain
https://raw.githubusercontent.com/zammad/zammad-org/refs/heads/develop/install-package.md
```
