---
order: 14
title: 'URL personalizada da base de conhecimento'
---

# URL personalizada da base de conhecimento

Se você quiser publicar a base de conhecimento do Zammad em uma URL
diferente da padrão, pode seguir nosso exemplo de configuração usando o [NPM
(Nginx Proxy Manager)](https://nginxproxymanager.com/){target=_blank}
abaixo.

## Configurar o Zammad

- Vá até **Knowledge Base** nas configurações de administração do Zammad e
  selecione a aba **Custom URL**.
- Adicione a URL sob a qual você quer publicar sua base de conhecimento e
  clique no botão `Submit`.
- Clique no botão `Web Server Configuration` para obter a configuração para
  o seu NPM. Você já pode copiar o trecho ou apenas deixá-lo aberto — ele
  será necessário para a configuração do NPM.

## Configurar o NPM

No NPM, adicione um novo proxy host com os seguintes parâmetros:

### Aba Details

- **Domain Names**: o domínio sob o qual você quer publicar sua base de
  conhecimento
- **Forwarded Hostname / IP**: o host/IP da sua instância do Zammad
- **Forward Port**: a porta do seu Zammad (por padrão `8080` em uma
  implantação via Portainer)

![Captura de tela mostra a caixa de diálogo de configuração do NPM com a aba
de detalhes](/screenshots/tutorials/custom-kb-url/npm-details-tab.png)

### Aba de localização personalizada

- **Define location**: `/`
- **Forward Hostname / IP**: igual ao anterior
- **Forward Port**: igual ao anterior
- Clique na engrenagem para abrir o campo de texto de configuração de
  localização personalizada e cole `proxy_set_header X-ORIGINAL-URL
  $request_uri;` (a parte inferior do trecho do Zammad)

![Captura de tela mostra a caixa de diálogo de configuração do NPM com a aba
de localizações
personalizadas](/screenshots/tutorials/custom-kb-url/npm-custom-locations-tab.png)

### Aba avançada

**Custom Nginx Configuration**: adicione a parte superior do trecho do Zammad,
que deve ser parecida com o seguinte:

```text
# Adicione as seguintes linhas à diretiva "server"
if ($host = help.your.domain ) {
  rewrite ^/(api|assets)/(.*)$ /$1/$2 last;
  rewrite ^(.*)$ /help$1 last;
}
```

![Captura de tela mostra a caixa de diálogo de configuração do NPM com a aba
avançada](/screenshots/tutorials/custom-kb-url/npm-advanced-tab.png)

Após seguir estas etapas, sua base de conhecimento deve estar publicada em
uma URL personalizada. Você pode testá-la clicando no botão de
pré-visualização na sua base de conhecimento.
