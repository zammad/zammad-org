---
order: 10
title: 'Proxy and connections'
---

# Proxy and connections

## Proxy

Esta seção cobre a configuração de proxy via variáveis de ambiente. Como
alternativa, a configuração de proxy também é possível via interface do
Zammad. Você pode encontrar mais informações sobre isso na seção de rede da
documentação de administração.

|                                             | GUI configuration | Environment variable       |
|---------------------------------------------|-------------------|----------------------------|
| Host OS access required                     | No                | Yes                        |
| Automatically excluded loopback addresses   | Yes               | No                         |
| Configuration check                         | Yes               | Manually via test script   |
| Exceptions                                  | Yes               | No                         |

As seguintes variáveis de ambiente podem ser usadas para configurar as
opções de proxy. Ajuste os valores de acordo com o seu ambiente.

`HTTP_PROXY`
: variável para tráfego HTTP. Defina-a com o endereço do seu servidor proxy, incluindo a porta. Não funciona no contexto
  Docker. Exemplo:

  ```sh
  export HTTP_PROXY="http://127.0.0.1:8080"
  ```

`HTTPS_PROXY`
: variável para tráfego HTTPS. Defina-a com o endereço do seu servidor proxy, incluindo a porta. Não funciona no contexto
  Docker. Exemplo:

  ```sh
  export HTTPS_PROXY="http://127.0.0.1:8080"
  ```

`NO_PROXY`
: variável para endereços que devem ser acessados diretamente e sem proxy. Espera uma lista de endereços separados por vírgula
  e suporta curingas. Use um `.` no início como curinga para subdomínios; por exemplo, `.example.com` corresponderia a
  example.com e todos os seus subdomínios. Certifique-se de incluir endereços de loopback para excluí-los do roteamento via
  proxy. Exemplo:

  ```sh
  export NO_PROXY="localhost,127.0.0.1,.example.com"
  ```

`ES_JAVA_OPTS`
: variável para definir um proxy para o Elasticsearch. Por padrão, o Elasticsearch não se comunica com sistemas externos
  durante a operação. No entanto, pode haver casos em que isso é necessário. Exemplo:

  ```sh
  export ES_JAVA_OPTS="-Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=8080 -Dhttps.proxyHost=127.0.0.1 -Dhttps.proxyPort=8080"
  ```

::: tip
Dependendo do seu ambiente, você pode querer usar as variantes em minúsculas das variáveis também. Em caso de dúvida, defina
ambas as variantes especificando-as adicionalmente com os valores das variantes em maiúsculas, por exemplo:

```sh
export http_proxy=$HTTP_PROXY
```

:::

## External connections

Durante a instalação e operação do Zammad, algumas conexões a serviços
online são necessárias. Dependendo do seu método de instalação e
configuração do Zammad, uma conexão aos seguintes serviços é feita (também
pode ser útil para configuração de firewall):

| Address                      | Comment                                               |
|------------------------------|-------------------------------------------------------|
| dl.packager.io               | Download do pacote do SO (instalação via pacote)       |
| go.packager.io               | Como acima; novo serviço de hospedagem de pacotes      |
| geo.zammad.com               | Usado para dados geográficos                          |
| google.com                   | Download de feriados para o calendário                |
| index.rubygems.org           | Download de gems do ruby                              |
| registry.npmjs.org           | Download de dependências js                           |

Você pode usar um script para verificar o estado de conexão do seu
sistema. Ele tenta se conectar aos serviços mencionados acima e mostra o
resultado. Se todas as conexões forem bem-sucedidas, ele exibe uma marca de
verificação para cada serviço contatado. Execute-o buscando-o do repositório
do Zammad ou executando a versão local na sua máquina do Zammad.

**Buscar script remotamente:**

```sh
curl -fsSL https://raw.githubusercontent.com/zammad/zammad/refs/heads/stable/contrib/packager.io/test_download_dependencies_connection.sh | sh
```

**Usar script local:**

```sh
/opt/zammad/contrib/packager.io/test_download_dependencies_connection.sh
```
