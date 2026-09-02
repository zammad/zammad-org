---
order: 9
title: 'Autenticação de dois fatores'
---

# Autenticação de dois fatores

A autenticação de dois fatores (2FA) melhora a segurança da sua conta do
Zammad adicionando uma camada extra de verificação além da senha. Ela exige
que você forneça dois tipos diferentes de fatores de autenticação,
tipicamente algo que você sabe (como uma senha) e algo que você possui (como
um dispositivo móvel ou um token de segurança), para garantir que você é um
indivíduo autorizado que pode acessar a conta.

A autenticação de dois fatores é um **recurso opcional**. Os administradores
precisam ativá-la para que fique visível nas suas configurações de perfil. O
uso de 2FA pode até ser obrigatório pelo seu administrador. Nesse caso, você
não pode usar o Zammad, a menos que configure pelo menos um método de 2FA.

## Configurar

Se o administrador do sistema ativou esse recurso, você pode ir até _Avatar > Profile > Two-factor Authentication_ para configurá-lo.
Dependendo dos métodos de dois fatores habilitados, você pode ver uma ou mais opções na tabela.

Para configurar um método de dois fatores, use o botão ::+:: e siga as
etapas.

![Captura de tela mostra métodos de 2FA nas configurações de perfil do
usuário](/screenshots/cypress/documentation/use/guide-2fa.cy.js/2fa-methods-profile-setup.png)

Em uma caixa de diálogo modal, você será solicitado a confirmar sua senha
atual.

Dependendo do método de dois fatores escolhido, você será guiado pelo
processo de configuração, que inclui etapas específicas. Continue usando um
[Aplicativo autenticador](#authentication-app) ou uma [Chave de
segurança](#security-key).

### Aplicativo autenticador

O método de aplicativo autenticador é um tipo de autenticação de dois
fatores que usa um aplicativo móvel para gerar códigos de uso único para
verificação da conta. Depois de configurar o aplicativo autenticador no seu
dispositivo, você o vinculará à sua conta do Zammad.

![Captura de tela mostra a configuração de autenticação por
aplicativo](/screenshots/documentation/use/two-factor-auth-usage/2fa-app-setup.png)

Primeiro, certifique-se de ter um aplicativo autenticador instalado no seu
dispositivo móvel. Aplicativos recomendados:

- [Google
  Authenticator](https://support.google.com/accounts/answer/1066447){target=_blank}
- [Authy](https://support.authy.com/hc/en-us/articles/115001945848-Installing-Authy-apps/){target=_blank}
- [Microsoft
  Authenticator](https://support.microsoft.com/en-us/account-billing/download-and-install-the-microsoft-authenticator-app-351498fc-850a-45da-b7b6-27e523b8702a){target=_blank}

Em seguida, abra o aplicativo autenticador no seu dispositivo e procure uma
ação **Scan QR Code** ou similar. Aponte sua câmera para a tela do Zammad e
escaneie o código QR exibido no meio.

::: tip
Se seu dispositivo não conseguir escanear o código QR, primeiro clique nele para revelar seu segredo. Depois, adicione uma entrada manual ao
seu aplicativo autenticador e informe o segredo fornecido quando solicitado.
:::

Seu aplicativo autenticador deve adicionar imediatamente a nova entrada para
sua conta do Zammad, e um código de 6 dígitos será exibido ao lado, junto
com um temporizador.

De volta ao Zammad, informe o código fornecido no campo **Security Code** e
clique em **Set Up**. Continue configurando outro método de 2FA ([chave de
segurança](#security-key)) ou veja como [fazer login com 2FA](#sign-in).

### Chave de segurança

O método de chaves de segurança é um tipo de autenticação de dois fatores
que usa a Web Authentication API no navegador para verificar sua
identidade. Você pode registrar várias chaves de segurança de hardware ou
software com sua conta do Zammad, e elas podem ser usadas durante o processo
de login.

Inicialmente, você verá um painel flutuante vazio instruindo você a **Set
Up** sua primeira chave.

![Captura de tela mostra a configuração de autenticação por chave de
segurança](/screenshots/documentation/use/two-factor-auth-usage/2fa-security-key-panel.png)

Depois, informe um **Name for this security key** descritivo que você
registrará com sua conta, para que possa identificá-la posteriormente na
lista. Depois, clique em **Next**.

Em seguida, dependendo do seu navegador, você verá diferentes
opções. Selecione uma que se refira à chave de segurança escolhida e siga as
instruções na tela.

![Captura de tela mostra a configuração de autenticação por chave de
segurança](/screenshots/documentation/use/two-factor-auth-usage/2fa-passkey-auth.png)

O navegador pode pedir que você interaja com uma chave ou dispositivo para
provar que você está fisicamente de posse dele (por exemplo, informar o PIN
para desbloqueá-lo).

::: warning
Você terá um tempo limitado (medido em dezenas de segundos) para registrar sua chave. É melhor tê-la pronta antes de
prosseguir!
:::

Se o registro for bem-sucedido, a caixa de diálogo modal se fechará, e você
está pronto para continuar. Em caso de erros, você poderá **Retry** o
registro da chave.

Depois de configuradas, as chaves de segurança podem ser gerenciadas
escolhendo a ação **Edit** ao lado do método de autenticação de dois
fatores.

Você tem a opção de remover uma chave ou configurar outras adicionais. Não
há limite no número de chaves de segurança que você pode configurar, mas
tenha em mente que você não pode registrar uma chave já registrada para sua
conta. A remoção da última chave de segurança efetivamente remove o método
completo de chaves de segurança da sua conta.

## Login

Quando você configura a autenticação de dois fatores para sua conta do
Zammad, no próximo login você será solicitado a fornecer o mesmo método de
dois fatores após informar o nome de usuário e senha corretos. Dependendo do
método de dois fatores escolhido, isso pode ser um código de segurança,
chave de hardware, etc.

Caso você tenha problemas durante o login com seu método preferido de
autenticação de dois fatores, você pode mudar para outro, desde que já o
tenha configurado anteriormente.

Procure o link **Try another method** abaixo da caixa de login. Caso você
não veja esse link, provavelmente não tem outros métodos de dois fatores
disponíveis configurados, ou seu administrador desativou esse recurso.

![Tela de login com link para "Try another
method"](/screenshots/documentation/use/two-factor-auth-usage/2fa-link-another-method.png)

Como alternativa, você também pode usar um dos seus códigos de recuperação,
que são gerados automaticamente para sua conta durante a configuração
inicial da autenticação de dois fatores. Clique em **Or use one of your
recovery codes**, informe um dos seus códigos não utilizados e clique em
**Sign in**.

![Tela de login com link de códigos de
recuperação](/screenshots/documentation/use/two-factor-auth-usage/2fa-login-recovery-codes.png)

::: warning
Você pode usar um único código de recuperação apenas uma vez! Caso você esgote a lista de seus códigos de recuperação, é recomendável
que os gere novamente para sua conta.
:::

## Gerar códigos de recuperação

Códigos de recuperação são códigos de segurança de uso único que podem ser
usados para fazer login caso você perca o acesso aos seus outros métodos de
autenticação de dois fatores. Eles só podem ser usados como um **método de
backup**.

Se o recurso estiver habilitado pelo administrador, os códigos de
recuperação serão gerados automaticamente para você durante a configuração
do seu método inicial de autenticação de dois fatores.

Você será solicitado a imprimir ou salvar os códigos de recuperação gerados
em um local seguro. Depois de usado, um código de recuperação não pode ser
reutilizado.

![Captura de tela mostra a saída dos códigos de recuperação durante a
configuração de
2FA](/screenshots/documentation/use/two-factor-auth-usage/2fa-app-setup-recovery-codes.png)

Você também tem a opção de gerar novamente seus códigos de recuperação a
qualquer momento, o que invalida os códigos existentes e fornece uma lista
de códigos novos. Você pode fazer isso clicando no botão `Regenerate
recovery codes` nas configurações de 2FA do seu perfil.

## Definir um método de 2FA padrão

Para definir um método de dois fatores já configurado como padrão, use o
menu de ações ::a:: ao lado dele nas configurações de 2FA do seu perfil e
escolha **Set as default**.

Para identificar seu método de autenticação de dois fatores padrão atual,
procure um pequeno selo azul ao lado do nome do método.

![Captura de tela mostra a lista de métodos de 2FA e o método
padrão](/screenshots/cypress/documentation/use/guide-2fa.cy.js/2fa-methods-profile-overview.png)

Um método de autenticação de dois fatores padrão é apenas seu método
preferido durante o processo de login. Você sempre terá a opção de tentar
fazer login usando outro método.

## Editar um método de 2FA

![Captura de tela mostra o menu de ações para um método de 2FA já
configurado](/screenshots/cypress/documentation/use/guide-2fa.cy.js/2fa-methods-profile-action-menu.png)

Para editar um método de dois fatores já configurado, use o menu de ações
::a:: ao lado dele e escolha **Edit**. Em uma caixa de diálogo modal, você
será solicitado a confirmar sua senha atual.

Dependendo do método de dois fatores escolhido, você será guiado novamente
pelo processo de configuração. Normalmente, editar um método simplesmente o
renova e substitui a configuração antiga, mas alguns métodos suportam
funções avançadas (por exemplo, adicionar várias chaves de segurança).

## Remover um método de 2FA

Para remover um método de dois fatores já configurado, use o menu de ações
::a:: ao lado dele e escolha **Remove**. Em uma caixa de diálogo modal, você
será solicitado a confirmar a remoção com sua senha atual.
