---
order: 3
title: Docker
---

# Docker installation

O Zammad pode ser implantado usando o Docker Compose. Você pode até usar
interfaces gráficas do Docker, como o
[Portainer](https://www.portainer.io/){target=_blank}.

::: info

Não fornecemos suporte para problemas específicos do Docker (Compose) ou Portainer.
Se você optar por executar o Zammad via Docker, o suporte é fornecido apenas para
a aplicação Zammad.
:::

## Pré-requisitos

- Um ambiente Docker Compose funcional
- Pelo menos 4 GB de RAM para executar os containers
- Aumente o limite de memória para o Elasticsearch em hosts Linux:

  ```sh
  sudo sysctl -w vm.max_map_count=262144
  ```

## Implantação com Portainer

A forma mais fácil de colocar o Zammad em execução é via uma interface
gráfica do Docker. Recomendamos o
[Portainer](https://www.portainer.io/){target=_blank}. Para instruções de
instalação, consulte a [documentação do
Portainer](https://docs.portainer.io/){target=_blank}.

### Step 1: Add stack

Na interface gráfica do Portainer (por exemplo,
`https://yourdomain.tld:9443`), escolha seu ambiente de destino, selecione
**Stacks** e clique em `Add stack`, como você pode ver na captura de tela
abaixo.

![Captura de tela na seção Stacks com "Add stack"
destacado.](/screenshots/get-started/installation/portainer-stacks.png)

### Step 2: Build from repository

Mude para o método de build **Repository** e forneça as informações abaixo:

- **Name**: informe um nome desejado para a stack
- **Repository URL**: `https://github.com/zammad/zammad-docker-compose`
- **Repository reference**: `refs/heads/master`
- **Compose path**: `docker-compose.yml` (padrão)

Caso nosso ambiente padrão não seja o que você procura, você pode
personalizar a stack usando cenários predefinidos e ajustar variáveis de
ambiente. Vá até a [seção de personalização](#customizing-the-zammad-stack)
abaixo para mais informações.

![Criação de stack com as informações fornecidas na tela
Repository](/screenshots/get-started/installation/portainer-stack-creation.png)

### Step 3: Deploy the stack

Por fim, clique no botão `Deploy the stack`. Na primeira vez, pode levar
algum tempo até que as imagens do Docker sejam baixadas.

Depois que a stack estiver pronta, você pode acessar o Zammad pelo host e
porta Docker configurados, por exemplo, `http://localhost:8080/`.

## Implantação com Docker Compose

### Step 1: Clone the GitHub repo

```sh
git clone https://github.com/zammad/zammad-docker-compose.git
```

Certifique-se de executar `git pull` frequentemente para buscar
atualizações. Como alternativa, você pode baixar os arquivos da [página de
releases](https://github.com/zammad/zammad-docker-compose/releases){target=_blank}.

### Step 2: Adjust environment as needed

Caso nosso ambiente padrão não seja o que você procura, você pode
personalizar a stack usando cenários predefinidos e ajustar variáveis de
ambiente. Vá até a [seção de personalização](#customizing-the-zammad-stack)
abaixo para mais informações.

### Step 3: Start the stack

```sh
cd zammad-docker-compose
```

```sh
docker compose up -d
```

Opcional: use um arquivo `.yml` adicional para usar um cenário
predefinido. Continue lendo na seção [Personalizando a stack do
Zammad](#customizing-the-zammad-stack).

Depois que a stack estiver pronta, você pode acessar o Zammad pelo host e
porta Docker configurados, por exemplo, `http://localhost:8080/`.

## Exposing the stack via HTTPS

Para publicar uma stack do Zammad na internet, ela precisa ser protegida via
protocolo HTTPS. Para conseguir isso sem modificar a stack do Zammad, você
pode:

- Usar um proxy reverso como o Nginx Proxy Manager (NPM). Ele tem uma
  interface gráfica que oferece uma integração fácil com o [Let's
  Encrypt](https://letsencrypt.org/){target=_blank}.
- Usar um túnel do Cloudflare, que oferece terminação SSL.

Ambos os cenários são cobertos na página separada [Cenários do Docker
Compose](/pt_BR/reference/docker-compose-scenarios).

## Customizing the Zammad stack

A stack do Zammad pode ser personalizada carregando arquivos de cenário
adicionais para casos de uso comuns. Por exemplo, você pode implantar a
stack com um Nginx Proxy Manager (NPM) incluído, ou com os serviços
PostgreSQL ou Elasticsearch desativados, caso você já tenha esses serviços
em execução.

Consulte a [página de cenários do Docker
Compose](/pt_BR/reference/docker-compose-scenarios).

Para ajustar a stack e as configurações, use [variáveis de ambiente
específicas do Docker](/pt_BR/reference/environment-variables).

## How to run commands in the stack

Execute comandos na sua stack do Docker chamando `rails` ou `rake` por um
dos seguintes métodos, usando `bundle exec`.

:::: tabs

=== Via Portainer GUI

Na sua interface gráfica do Portainer, vá até a visualização de containers e selecione o container Rails em execução da sua stack do Zammad. Clique
no ícone **Exec Console** na coluna "Quick Actions", selecione o ponto de entrada padrão `/bin/bash` e clique
em **Connect**.

![Execução do console do Portainer](/screenshots/get-started/installation/portainer-exec-console.png){width=80%}

Execute o console interativo do Rails executando:

```sh
bundle exec rails c
```

Execute diretamente um comando específico:

```sh
bundle exec rails r '...seu comando rails aqui...'
```

=== Via console

Execute diretamente um comando específico:

```sh
docker compose run --rm zammad-railsserver bundle exec rails r '...seu comando rails aqui...'
```

Execute o console interativo do Rails para inserir comandos Rails manualmente:

```sh
docker compose run --rm zammad-railsserver bundle exec rails c
```

Via `docker compose exec`:

```sh
docker compose exec zammad-railsserver bundle exec rails r '...seu comando rails aqui...'
```

::: tip
Se você precisar recuperar informações do servidor Rails, você pode, por exemplo,
colocar `pp` (pretty print) antes do seu comando Rails. Isso resulta em
uma saída no seu terminal.
:::

::::
