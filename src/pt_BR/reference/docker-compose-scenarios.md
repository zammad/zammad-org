---
order: 5
title: 'Cenários do Docker Compose'
---

# Cenários do Docker Compose

## Visão geral

Se a stack "padrão" do Zammad não cobrir seu caso de uso, você pode usar um
dos cenários predefinidos. Não recomendamos alterar os arquivos Compose
localmente, pois seria difícil acompanhar as alterações upstream para a
stack depois. Por isso, você deve usar o método de build de repositório do
Portainer, ou clonar o repositório e atualizá-lo regularmente, ao usar o
Docker Compose.

Os seguintes cenários são suportados e explicados mais abaixo:

- [Disponibilizar a stack via HTTPS](#making-the-stack-available-via-https)
  - Adicionar um serviço de túnel Cloudflare à stack
  - Adicionar um Nginx Proxy Manager (NPM) à stack
  - Adicionar uma rede Docker externa ao Nginx
- [Usando serviços externos](#using-external-services)
  - Desativar o serviço do Elasticsearch
- [Disponibilizar serviços
  externamente](#making-services-externally-available)
  - Adicionar uma rede Docker externa ao Elasticsearch
  - Adicionar uma porta de host ao Elasticsearch
- [Cenários adicionais](#additional-scenarios)
  - Desativar o serviço de backup
  - Adicionar uma instância do Ollama à stack
  - Limitar recursos de hardware da stack

Você pode encontrar os arquivos no [repositório Zammad Docker
Compose](https://github.com/zammad/zammad-docker-compose){{target=_blank}}.

## Uso geral

::: tabs

=== Docker Compose

Follow the first 2 steps of the [general deployment guide](/en/get-started/installation/docker). Instead of passing
scenario files with additional `-f` flags on every command, list the scenarios you want to use in an `include` section
of a `docker-compose.override.yml` file in the cloned repository folder. The stack repository ships an inactive example
file you can copy and adjust:

``` sh
cp docker-compose.override.yml.dist docker-compose.override.yml
```

Edit the copy and add the scenarios you want to use:

``` yaml
include:
  - scenarios/{scenario you want to use}.yml
  - scenarios/{another scenario you want to use}.yml
```

Replace the parts in `{}` brackets with the file names of the scenario files you want to combine. Then start the stack
as usual with plain `docker compose up -d` (step 3 of the [general deployment guide](/en/get-started/installation/docker)).
Keep two things in mind: the `include` keyword requires Docker Compose 2.20 or higher, and scenarios that bind-mount
host files have to be included with the long form below. Otherwise their relative paths resolve against the `scenarios`
folder and Docker silently creates empty directories instead of mounting your files:

``` yaml
include:
  - path: scenarios/{scenario you want to use}.yml
    project_directory: .
```

=== Portainer

Follow the [general deployment guide](/en/get-started/installation/docker) and apply the following changes.

Below the "Compose path" field, click on the `Add file` button. This opens the "Additional paths" section where you
can specify the scenario you want to use. Add `scenarios/{scenario you want to use}.yml` and replace the last part in
`{}` brackets with the name of one of the scenario files. You can even combine the scenarios by adding additional paths.

![Portainer additional paths configuration](/screenshots/get-started/installation/portainer-additional-paths.png)

:::

## Disponibilizando a stack via HTTPS

Se você configurar o Zammad para uso em produção, ele precisa ser protegido
usando uma conexão HTTPS. Há diferentes cenários para conseguir isso:

### Adicionar túnel Cloudflare

Se você quiser publicar o Zammad de forma bem conveniente, pode usar um
túnel [Cloudflare](https://www.cloudflare.com/){target=_blank}.

- Use o arquivo de cenário `scenarios/add-cloudflare-tunnel.yml` para
  implantação
- Adicione um subdomínio a um domínio já existente no seu painel do
  Cloudflare
- Crie um túnel para esse subdomínio e configure-o para encaminhar o tráfego
  para o seu serviço zammad-nginx com `http://zammad-nginx:8080`
- Forneça seu token de túnel do Cloudflare à stack do Zammad usando a
  variável de ambiente `CLOUDFLARE_TUNNEL_TOKEN`

### Adicionar Nginx Proxy Manager

Uma configuração muito comum para publicar serviços web é usar um proxy
reverso, que lida com a terminação SSL. Uma ferramenta comum é o Nginx Proxy
Manager (NPM), que pode ser configurado facilmente via interface gráfica. Se
você ainda não tem um proxy reverso, esse pode ser um cenário útil para
você. Se você já tem um proxy reverso em execução, vá para a próxima seção.

- Use o arquivo de cenário `scenarios/add-nginx-proxy-manager.yml` para
  implantação
- Forneça seu FQDN para o Zammad usando a variável de ambiente `ZAMMAD_FQDN`
- Configure seu DNS. O FQDN escolhido para o Zammad deve apontar para o
  endereço IP do host do NPM
- Configure um novo proxy host no seu NPM e siga as etapas para obter um
  certificado SSL

### Adicionar uma rede Docker externa ao Nginx

Se você já tem um proxy reverso que cuida da terminação SSL, esse cenário é
útil. Ele adiciona uma rede Docker externa ao serviço Nginx incluído no
Zammad, para poder acessá-lo a partir de um proxy reverso que não faz parte
da rede da stack do Zammad.

- Use o arquivo de cenário `scenarios/add-external-network-to-nginx.yml`
  para implantação
- Forneça o nome da sua rede externa usando a variável de ambiente
  `ZAMMAD_NGINX_EXTERNAL_NETWORK`

## Usando serviços externos

### Desativar o serviço do Elasticsearch

Você já tem uma instância do Elasticsearch em execução e quer usá-la para o
Zammad também? Então você pode desativar o serviço do Elasticsearch na stack
do Zammad para economizar recursos.

- Use o arquivo de cenário `scenarios/disable-elasticsearch-service.yml`
  para implantação - isso desativará o serviço integrado do Elasticsearch
- Use as seguintes variáveis de ambiente para fornecer informações sobre a
  conexão com sua instância existente do Elasticsearch:
  - `ELASTICSEARCH_SCHEMA`
  - `ELASTICSEARCH_HOST`
  - `ELASTICSEARCH_PORT`
  - `ELASTICSEARCH_USER`
  - `ELASTICSEARCH_PASS`

## Disponibilizando serviços externamente

Esses cenários destinam-se a conectar aplicações externas aos serviços do
Zammad. Dependendo de onde seu serviço externo está hospedado, você pode
usar um dos seguintes cenários.

::: danger

Ao expor o Elasticsearch fora da stack, certifique-se de definir a variável `ELASTICSEARCH_PASS` com um valor personalizado
primeiro! Caso contrário, isso é um grande problema de segurança, pois o índice do Elasticsearch contém a maior parte dos dados do Zammad.

:::

::: tip

Se você quiser usar TLS, precisa se conectar ao Elasticsearch via proxy reverso.

:::

### Adicionar uma rede Docker externa ao Elasticsearch

Um caso de uso comum para isso é usar uma ferramenta de
relatórios/visualização como o Grafana no mesmo host, em outra stack. Como
essas ferramentas precisam acessar o índice do Elasticsearch, a rede da
outra stack precisa ser adicionada ao container Elasticsearch do Zammad.

- Use o arquivo de cenário
  `scenarios/add-external-network-to-elasticsearch.yml` para implantação
- Forneça o nome da sua rede externa usando a variável de ambiente
  `ZAMMAD_ELASTICSEARCH_EXTERNAL_NETWORK`

### Adicionar uma porta de host ao Elasticsearch

Caso você queira expor o serviço do Elasticsearch da stack do Zammad na
rede, você pode atribuir uma porta de host ao container. Isso é útil se você
precisar acessar o container do Elasticsearch a partir de um host diferente.

- Use o arquivo de cenário `scenarios/add-hostport-to-elasticsearch.yml`
  para implantação
- A porta padrão para o Elasticsearch é `9200`. Altere-a para outra porta
  usando a variável de ambiente `ELASTICSEARCH_EXPOSE_HTTP_PORT`

## Cenários adicionais

### Desativar o serviço de backup

Caso você queira lidar com backups de outra forma, pode desativar o serviço
de backup integrado na stack para economizar recursos.

Você pode fazer isso simplesmente usando o arquivo de cenário
`scenarios/disable-backup-service.yml` para implantação.

### Adicionar Ollama

Você pode subir um container adicional do
[Ollama](https://ollama.com/){target=_blank} para usar os recursos de IA do
Zammad na sua máquina.

::: info
Isso é destinado a fins de desenvolvimento ou teste, já que executar uma stack de LLM produtiva é complexo.
:::

Para implantar um container Ollama dentro da stack do Zammad, use o arquivo
de cenário `scenarios/add-ollama.yml`. Isso cria um container Ollama que
baixa e disponibiliza automaticamente o `Llama3.2`, pronto para usar/testar
os recursos de IA imediatamente.

Para usá-lo no Zammad, adicione o nome do serviço e a porta
(`http://ollama:11434`) à configuração do provedor.

### Limitar recursos

Se você quiser limitar os recursos de hardware que a stack do Zammad pode
usar, use o cenário `scenarios/apply-resource-limits.yml`. Valores padrão de
uso de CPU e memória para cada container na stack são então aplicados. Você
pode encontrar esses valores padrão no arquivo `.env.dist`. Forneça as
variáveis alteradas que deseja usar como variáveis de ambiente e implante a
stack.

### Outros casos de uso

Seu cenário ainda não está coberto? Sinta-se à vontade para sugerir seu caso
de uso. Planejamos adicionar mais casos de uso comuns à stack no futuro.

## Personalizar a stack localmente

Às vezes é necessário aplicar alterações locais à stack Docker do Zammad,
por exemplo, para incluir serviços adicionais. Se você planeja fazer isso,
recomendamos que não altere o arquivo `docker-compose.yml`, mas em vez disso
crie um `docker-compose.override.yml` local que inclua todas as suas
modificações. O Docker Compose vai [carregar automaticamente esse arquivo e
mesclar suas alterações na sua
stack](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/){target=_blank}.

Besides your own modifications, this file is also the place to pull in
pre-defined scenarios via the `include` keyword, as described in the
[general usage](#general-usage) section above.
