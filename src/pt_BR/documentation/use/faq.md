---
order: 10
outline:
  - 2
  - 2
title: FAQs
---

# FAQs

[[TOC]]

## Geral

### Como encontrar tickets?

Depende do seu caso de uso. O Zammad oferece muitas possibilidades para
pesquisar e acessar tickets.

Se você **pesquisa por um ticket ou conteúdo específico**, a pesquisa é a
melhor forma. Você encontra o campo de pesquisa na área superior da barra
lateral de navegação ou o ativa usando o atalho de teclado [[s]]. A pesquisa
até mostra os tickets que você fechou recentemente na sua barra de tarefas;
talvez você já encontre o que procura ali. Há uma [página de
pesquisa](./guides/search) separada com mais informações.

Se você quer **começar a trabalhar em tickets**, dê uma olhada nas [visões
gerais](./guides/overviews), que basicamente são uma lista dos tickets
atuais. Essas visões gerais devem colocá-lo em uma posição onde você pode
facilmente distinguir entre o que precisa ser feito, o que está em andamento
e o que está atualmente pausado. Caso você tenha problemas com essas visões
gerais, seu administrador do Zammad deve conseguir ajudar.

### Como ser notificado sobre alterações de ticket?

Ajuste as [configurações de notificação no seu
perfil](user-profile#notifications). Você pode diferenciar entre a ação (por
exemplo, criação de ticket), o canal de notificação (email e/ou navegador),
sua relação com o ticket (por exemplo, se você é o responsável) e limitar as
notificações a um grupo específico.

### Por que o ticket está aberto de novo? Eu já o fechei

Dependendo das configurações da sua instância do Zammad, os motivos podem
variar. Mas geralmente o motivo é que um cliente respondeu ao ticket depois
que ele foi definido como fechado. Outro motivo pode ser que um colega o
reabriu. Se você não conseguir ver um artigo que corresponda a essa
descrição, pode dar uma olhada no histórico do ticket para descobrir
mais. Faça isso abrindo o menu ::a:: na aba da barra lateral do ticket e
selecionando **History**.

Seu administrador do Zammad pode ajustar o que deve acontecer quando um
cliente responde depois que um ticket foi fechado.

### O que o cliente vê no ticket?

Por padrão, os clientes só têm uma interface reduzida. Eles podem criar
tickets, ver seus próprios tickets (e talvez os de seus colegas também,
dependendo da configuração) e acessar as configurações do perfil. Mesmo a
visualização de detalhes do ticket inclui apenas elementos relevantes para o
cliente. Elementos que têm um propósito interno (como grupo, prioridade,
notas internas) não são visíveis para o cliente.

::: warning
A explicação acima é baseada nas configurações padrão do Zammad. Esteja ciente de que a configuração do seu sistema pode ser
diferente. Em caso de dúvida, você deve perguntar ao seu administrador.
:::

### Não consigo fazer login. O que posso fazer?

- Esqueceu sua senha? Tente redefini-la na tela de login, no link **Forgot
  password?**, informando seu endereço de email.
- Perdeu a possibilidade de fornecer seu segundo fator para autenticação de
  dois fatores (2FA)? Use um código de recuperação e configure um novo
  método de 2FA. Veja a [página de 2FA](./guides/two-factor-auth) para mais
  informações.
- Perdeu seus códigos de recuperação de 2FA? Entre em contato com seu
  administrador do Zammad. Isso também se aplica se seu problema não estiver
  mencionado aqui.

### Como usar atalhos de teclado?

Basta usá-los! Você pode encontrar uma visão geral dos atalhos disponíveis
pressionando [[?]] no seu teclado ou abrir a visão geral no [menu do
avatar](user-profile#avatar-menu) (clique no seu avatar no canto inferior
esquerdo e selecione **Keyboard shortcuts**).

Alguns deles dependem do local em que você está ou da ação que está
realizando (por exemplo, estar no editor ou na visualização de detalhes do
ticket).

### Como alternar entre o modo escuro e claro para a interface do usuário?

Você pode alternar entre os modos claro, escuro e automático (tenta se
adaptar ao seu navegador) no [menu do
avatar](user-profile#avatar-menu). Abra-o clicando no seu avatar no canto
inferior esquerdo e mude a chave para o estado desejado, ou use o atalho de
teclado [[d]]. Se nenhum campo de entrada estiver ativado, ele alterna entre
os diferentes modos.

## Perfil do usuário

### Como alterar minha imagem de perfil/avatar?

Vá até a [seção do avatar](user-profile#avatar) nas configurações do seu
perfil, abrindo o menu do avatar no canto inferior esquerdo e selecionando
**Profile settings**. Ali você pode enviar uma imagem, capturar uma foto (se
seu dispositivo tiver câmera) ou excluir imagens já presentes.

### Como alterar o idioma da interface do usuário do Zammad?

Vá até a [seção de idioma](user-profile#language) nas configurações do seu
perfil, abrindo o menu do avatar no canto inferior esquerdo e selecionando
**Profile settings**.

### O que devo fazer antes de sair de férias?

Vá até a [seção de fora do escritório](user-profile#out-of-office) nas
configurações do seu perfil, abrindo o menu do avatar no canto inferior
esquerdo e selecionando **Profile settings**. Ali você pode definir um
agente substituto.

### Como ajustar a ordem das visões gerais?

Continue lendo no [guia de visões
gerais](guides/overviews#reorder-overviews).

## Trabalhar em tickets

### Como atribuir alguém a um ticket?

Na aba da barra lateral do ticket, você encontra um campo **Owner**. Escolha
entre os agentes oferecidos e certifique-se de deixar uma nota interna para
que o outro agente saiba do que se trata.

Se você só tem uma pergunta ou precisa de alguma informação, também pode
simplesmente [mencionar um colega](advanced-features#mention-a-user) em um
artigo usando [[@]][[@]] e fazer sua pergunta.

### Como excluir um ticket?

Antes de tudo, os tickets não podem ser excluídos por agentes. Isso é feito
por motivos de transparência e para evitar exclusão acidental e
arbitrária. No entanto, se os clientes quiserem que seus dados sejam
excluídos (por exemplo, devido a uma solicitação de exclusão da LGPD/GDPR),
isso pode ser feito no Zammad. Entre em contato com seu administrador do
Zammad e peça para executar a tarefa de exclusão.

### Como usar modelos de texto?

Use os [módulos de texto](advanced-features#text-modules) do Zammad
digitando [[:]][[:]] no editor de artigo ou escolhendo-o na barra de
ferramentas do editor. Se precisar de módulos adicionais, peça ao seu
administrador do Zammad para adicioná-los para você.

### Como pedir ajuda a um colega no ticket?

A melhor forma de fazer isso é [mencionar um
colega](advanced-features#mention-a-user) em um artigo usando [[@]][[@]] e
fazer sua pergunta. Isso aciona uma notificação para seu colega. Dependendo
dos seus processos internos, alternar o responsável do ticket também pode
ser uma opção possível.

### Como citar o email do cliente ou partes dele?

Para citar parcial ou seletivamente o artigo ou partes dele, marque o texto
que deseja citar e clique no botão `Reply` ao lado do artigo. Isso pode ser
feito até várias vezes (por exemplo, para responder a diferentes partes do
ticket).

A citação do artigo inteiro depende de como seu Zammad está configurado. Se
você quiser aplicar alterações a esse comportamento, peça ao administrador
para alterá-lo.
