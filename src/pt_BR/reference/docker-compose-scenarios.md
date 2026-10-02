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
  - Adicionar uma instância do LibreTranslate à stack
  - Limitar recursos de hardware da stack

Você pode encontrar os arquivos no [repositório Zammad Docker
Compose](https://github.com/zammad/zammad-docker-compose){{target=_blank}}.

## Uso geral

:::: tabs

=== Docker Compose

Para usar um cenário, liste o arquivo compose dele na variável de ambiente `COMPOSE_FILE`. Crie um arquivo `.env` ou
copie e renomeie o `.env.dist` na pasta do repositório clonado. O arquivo compose principal deve ser especificado primeiro,
seguido por um ou mais cenários, separados por dois-pontos (`:`). Os arquivos são aplicados na ordem informada. Substitua o
espaço reservado entre chaves pelo nome do arquivo do cenário que você quer usar.

**Exemplo com dois espaços reservados de cenário:**

``` sh
COMPOSE_FILE=docker-compose.yml:scenarios/{cenário que você quer usar}.yml:scenarios/{outro cenário que você quer usar}.yml
```

Depois de especificar os cenários, inicie a stack com `docker compose up -d`.

::: info

Ao usar a variável `COMPOSE_FILE`, o `docker-compose.override.yml` não é carregado automaticamente. Se você quiser
usá-lo, certifique-se de acrescentá-lo à lista da variável de ambiente.

:::

=== Portainer

Siga o [guia geral de implantação](/pt_BR/get-started/installation/docker) e aplique as seguintes alterações.

Abaixo do campo "Compose path", clique no botão `Add file`. Isso abre a seção "Additional paths", onde você
pode especificar o cenário que deseja usar. Adicione `scenarios/{cenário que você quer usar}.yml` e substitua a última parte entre
`{}` pelo nome de um dos arquivos de cenário. Você pode até combinar cenários adicionando caminhos adicionais.

![Configuração de caminhos adicionais do Portainer](/screenshots/get-started/installation/portainer-additional-paths.png)

=== Docker Compose

Siga as duas primeiras etapas do [guia geral de implantação](/pt_BR/get-started/installation/docker). Para iniciar a stack com
um ou mais cenários adicionais, use o seguinte comando para a etapa 3, na pasta do repositório clonado:

``` sh
docker compose -f docker-compose.yml -f scenarios/{cenário que você quer usar}.yml up -d
```

Substitua a parte entre `{}` pelo nome do arquivo de um dos arquivos de cenário. Você pode até combinar os cenários
adicionando arquivos adicionais de acordo com o exemplo acima.

::::

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

### Adicionar o LibreTranslate

Você pode executar um container adicional do
[LibreTranslate](https://libretranslate.com/){target=_blank} para fornecer a
tradução de artigos do Zammad no seu próprio hardware. Para detalhes sobre a
integração em si, veja a seção de serviços de tradução da documentação de
administração.

Para implantar um container LibreTranslate dentro da stack do Zammad, use o
arquivo de cenário `scenarios/add-libretranslate.yml`. O serviço não publica
nenhuma porta para o host; o Zammad o acessa dentro da rede da stack como
`http://libretranslate:5000`.

::: tip

A primeira inicialização demora um pouco, pois o container baixa os modelos de idioma antes que o serviço fique disponível.
Os modelos ficam armazenados em um volume do Docker, então sobrevivem a reinicializações da stack.

:::

O cenário suporta as seguintes variáveis de ambiente:

LT_LOAD_ONLY
: Lista de idiomas a carregar, separados por vírgula, por exemplo `en,de,fr`. Se não for definida, todos os modelos de idioma
  são baixados, o que pode levar minutos em inicializações a frio.

LT_UPDATE_MODELS
: Defina como `true` para verificar modelos de idioma atualizados a cada inicialização da stack. Somente modelos com uma
  versão mais nova disponível são baixados novamente. Sem isso, os modelos são baixados apenas na primeira inicialização.

LT_API_KEYS
: Defina como `true` para ativar o suporte a chaves de API. Cada chave tem seu próprio limite de solicitações por minuto.
  Para emitir uma chave, inicie o serviço e execute:

  ``` sh
  docker compose exec libretranslate ltmanage keys add 120
  ```

  O número é o limite de solicitações por minuto para essa chave. O comando exibe a chave gerada, que é um UUID
  criado pelo próprio LibreTranslate. Você também pode fornecer sua própria chave com a opção `--key`.

LT_REQUIRE_API_KEY_SECRET
: Defina como `true` para tornar as chaves de API obrigatórias em todas as solicitações. Requer
  `LT_API_KEYS=true`.

::: info

O LibreTranslate suporta muitas outras opções. Elas estão descritas na
[documentação oficial](https://docs.libretranslate.com/){target=_blank}, que também lista as variáveis de ambiente
aceitas pelo container.

:::

Depois que a stack estiver no ar, configure o serviço nas configurações de administração do Zammad (_System > Integrations > Translation services_):
aponte a URL para `http://libretranslate:5000` e informe uma chave de API, se sua instância exigir uma.

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

A stack padrão atende a maioria dos ambientes, mas às vezes é preciso
adaptá-la: adicionar outro serviço, alterar configurações ou usar seus
próprios arquivos. Em qualquer caso, não altere o próprio
`docker-compose.yml`. Manter suas alterações em arquivos separados permite
que o `git pull` atualize a stack sem conflitos.

Como fazer isso depende do que você quer alcançar:

### Alterar configurações dos serviços existentes

O arquivo de override altera configurações dos serviços que o arquivo
compose principal já define. Crie um arquivo
`docker-compose.override.yml`. O Docker Compose [carrega automaticamente
esse arquivo e mescla suas alterações na sua
stack](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/){target=_blank}.
O repositório da stack traz um arquivo de exemplo inativo que você pode
copiar e ajustar:

``` sh
cp docker-compose.override.yml.dist docker-compose.override.yml
```

Carregar cenários por aqui não é suportado. Para carregar um cenário, use a
variável `COMPOSE_FILE` no seu arquivo `.env`, conforme descrito na seção
[uso geral](#general-usage) acima.

### Adicionar seus próprios arquivos

Em uma implantação com Docker Compose feita clonando o repositório, você
pode guardar os arquivos que pertencem apenas à sua instância no diretório
`local/` da stack, por exemplo trechos de configuração, arquivos de cenário
personalizados, scripts, anotações ou certificados. O Git ignora o conteúdo
do diretório, exceto o README.md, então o `git pull` não relata nem altera
esses arquivos.

Os arquivos em `local/` não são carregados automaticamente. Para usar um
arquivo Compose personalizado, referencie-o no arquivo de override ou em
`COMPOSE_FILE` no seu arquivo .env, usando um caminho como
`./local/my-file`. Lembre-se de que definir `COMPOSE_FILE` desativa o
carregamento automático do arquivo de override; veja a seção [uso
geral](#general-usage) acima. O Docker Compose resolve caminhos relativos a
partir do diretório que contém o arquivo compose principal, inclusive
caminhos usados por arquivos de cenário personalizados em `local/`.
