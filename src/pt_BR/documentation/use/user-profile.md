---
order: 7
title: 'User profile'
---

# User profile

Ajuste sua conta e configurações pessoais no seu perfil de usuário. Algumas
das opções podem não estar disponíveis, dependendo de como seu sistema está
configurado e de suas permissões. Abra-o pelo menu do avatar na barra
lateral. Continue lendo para mais detalhes.

## Avatar menu

Para abrir o menu do avatar, clique no ícone do seu avatar no canto inferior
esquerdo na barra lateral. Esse ícone mostra suas iniciais ou uma foto de
perfil.

![Captura de tela mostra o painel de detalhes do
usuário](/screenshots/cypress/documentation/use/user-profile.cy.js/avatar-menu.png)

O menu contém as seguintes entradas:

- **Link(s) to documentation**: dependendo das suas funções, você pode ver
  um ou mais links de documentação.
- **Appearance**: alterne entre os modos escuro, claro e automático. O modo
  automático exibe o Zammad de acordo com a preferência atual do seu
  navegador.
- **Keyboard shortcuts**: abre um popup com os atalhos de teclado
  disponíveis. Como alternativa, pressione [[?]] no seu teclado para
  exibi-lo também.
- **Profile settings**: abre as configurações do seu perfil, onde você pode
  ajustar seu avatar, senha, configurações de notificação e muito mais; veja
  a próxima seção.

## Profile settings

![Captura de tela mostra as configurações de perfil do
usuário](/screenshots/cypress/documentation/use/user-profile.cy.js/user-profile-settings-full.png)

### Aparência

Altere a aparência do Zammad. Opções disponíveis:

- Modo escuro
- Modo claro
- Modo automático

A última opção tenta detectar a preferência do seu navegador. Depende do seu
navegador se isso funciona.

::: tip
Se você quiser alternar rapidamente entre o modo escuro e claro, também pode usar a chave no
[menu do avatar](#avatar-menu) ou usar o atalho de teclado simplesmente pressionando [[d]].
:::

### Idioma

Escolha o idioma no qual a interface do Zammad é exibida.

### Avatar

Ajuste sua imagem de avatar. Por padrão, as iniciais do seu usuário são
exibidas em um fundo colorido. Se você quiser adicionar uma imagem, basta
enviar uma ou usar sua câmera, se tiver uma.

Depois de capturar ou enviar uma imagem, você pode recortá-la. Dê uma olhada
na pré-visualização no topo do painel flutuante à direita.

### Out of office

Defina períodos de ausência (por exemplo, para suas férias) e designe um
substituto para lidar com seus tickets enquanto você estiver fora.

Seu substituto designado receberá atualizações sobre novos tickets e
alterações nos existentes enquanto você estiver fora. Além disso, suas
visões gerais personalizadas ficam disponíveis para esse agente acompanhar
seus tickets. Você também recebe notificações enquanto estiver ausente.

### Senha

Altere a senha da sua conta. Para atualizá-la, informe sua senha antiga, a
nova senha e confirme a nova digitando-a novamente.

### Two-factor authentication

Configure uma autenticação de dois fatores (2FA) para aumentar a segurança
da sua conta. Seu administrador precisa ter ativado pelo menos um método de
2FA. Pode até ser obrigatório usar um método de 2FA, definido pelo seu
administrador.

Depois de seguir o [guia de 2FA](./guides/two-factor-auth), você precisa
fornecer seu segundo fator no próximo login. Se você não conseguir fornecer
seu método de 2FA configurado, entre em contato com seu administrador para
redefini-lo.

### Dispositivos

Aqui você encontra uma lista de todos os dispositivos conectados à sua conta
do Zammad. Se necessário, você pode revogar o acesso clicando no ícone de
exclusão na coluna "Actions". Isso encerra a sessão nesse dispositivo e
exige um novo login nele.

### Token access

Gere um token de acesso pessoal para que um aplicativo de terceiros acesse a
API do Zammad. Depois de clicar no botão `New Personal Access Token`, você
pode definir um nome, uma data de expiração e configurar as permissões desse
token.

Depois de criar o token, ele é exibido em uma caixa de diálogo apenas uma
vez. Certifique-se de copiá-lo, pois não há como acessá-lo novamente.

![Captura de tela mostra o painel flutuante com o token criado e o botão de
copiar](/screenshots/cypress/documentation/use/user-profile.cy.js/token-dialog.png)

### Notificações

Ajuste as notificações que você recebe. Você pode ajustar:

- Para quais ações de ticket você é notificado (por exemplo, novos tickets,
  tickets escalonados)
- Para quais tickets você é notificado com base na atribuição e sua relação
  com eles (por exemplo, só os seus, não atribuídos, tickets inscritos)
- De que forma você é notificado (apenas no navegador ou também por email)
- Para tickets em qual grupo você é notificado

Além disso, você pode selecionar um som de notificação ou desativá-lo.

::: tip
Para ser notificado por som e notificação no seu sistema operacional, você precisa permitir que o Zammad envie notificações.
Isso é solicitado quando o Zammad tenta enviar uma notificação pela primeira vez.

Se você recusou e quer permitir agora, procure um ícone na barra de endereço onde você pode ajustar as permissões do
site. Depende do seu navegador como fazer isso exatamente. Se você não conseguir encontrar, pesquise na web ou dê
uma olhada nas configurações do seu navegador.
:::

### Visões gerais

Altere a ordem das visões gerais da sua conta. Basta arrastar e soltar
clicando nas alças no lado esquerdo. Se seu administrador alterar a ordem,
sua ordem personalizada permanece. Você pode voltar à ordem do administrador
clicando no botão `Reset Overview Order`.

### Calendário

O Zammad permite que você se inscreva em um feed de calendário (ical) para
ver tickets no seu aplicativo de calendário favorito. Use a **Combined
subscription URL** superior para se inscrever em todos os tickets, ou a
**Direct subscription URL** inferior. Ao escolher esta última, você pode
definir quais tickets deseja incluir com base no estado e status de
atribuição.
