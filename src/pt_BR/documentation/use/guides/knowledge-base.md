---
order: 6
title: 'Base de conhecimento'
---

# Base de conhecimento

A base de conhecimento é a biblioteca integrada do Zammad para perguntas
frequentes, tutoriais e documentação interna. Os clientes navegam pelas
respostas publicadas para autoatendimento, e os agentes as usam como
referência ou as inserem diretamente nas respostas dos tickets.

![Captura de tela mostra uma categoria da base de conhecimento com suas
subcategorias e
respostas](/screenshots/cypress/documentation/use/guide-knowledge-base.cy.js/knowledge-base-full.png)

## Fundamentos

Seu administrador precisa ativar a base de conhecimento e conceder a você a
permissão de leitor ou editor antes que você possa trabalhar com ela. Se
você pode ler respostas internas ou editar conteúdo depende dessa
configuração. O Zammad suporta uma base de conhecimento por sistema, que
pode conter conteúdo em vários idiomas. Para abrir a base de conhecimento,
clique em **Knowledge Base** na navegação principal.

### Estrutura

A base de conhecimento é construída a partir de dois tipos de
conteúdo. **Categorias** funcionam como pastas em um sistema de arquivos:
agrupam conteúdo, podem conter subcategorias adicionais e cada uma precisa
de um título e um ícone. **Respostas** são as páginas ou artigos em si e têm
um título mais conteúdo em texto rico, vivendo dentro de uma categoria.

### Múltiplos idiomas

Se seu administrador ativou vários idiomas para a base de conhecimento, uma
resposta pode existir em mais de um idioma, uma tradução por idioma. Para
trocar de idioma, use o seletor na barra superior para ler ou editar em
outro idioma. Uma resposta que ainda não tem tradução no idioma selecionado
abre em um estado vazio no editor.

### Visibilidade

Cada resposta tem um de quatro estados de visibilidade. O estado é exibido
como um ícone colorido na resposta e no card da sua categoria:

| Cor    | Visibilidade | Quem pode ver                                                        |
|--------|--------------|------------------------------------------------------------------------|
| Verde  | Published    | Todos, incluindo clientes no site público de ajuda                     |
| Azul   | Internal     | Agentes com a permissão de leitor da base de conhecimento              |
| Cinza  | Draft        | Apenas editores                                                        |
| Cinza  | Archived     | Apenas editores                                                        |

Ao visualizar ou editar uma resposta, um selo na barra superior também
mostra a visibilidade atual ou planejada (agendada).

### Usar em tickets

A base de conhecimento revela parte do seu valor dentro dos tickets: insira
uma resposta em uma réplica com [[?]][[?]], vincule respostas relacionadas a
um ticket e deixe a IA sugerir ou redigir respostas da base de conhecimento
com base no conteúdo do ticket. Esses fluxos de trabalho são abordados em
[Inserir artigo da base de
conhecimento](/pt_BR/documentation/use/advanced-features#insert-knowledge-base-article)
e na seção do [assistente da base de
conhecimento](/pt_BR/documentation/use/guides/ai#knowledge-base-assistant)
do guia de IA.

## Ler a base de conhecimento

### Navegar

A página inicial da base de conhecimento mostra um card para cada categoria
de nível superior, organizados em grade. Cada card mostra o ícone da
categoria, seu título, seu estado de publicação e duas contagens: o número
de subcategorias e o número de respostas que ela contém em todas as
subcategorias.

Para abrir uma categoria, basta clicar no seu card. Suas subcategorias
aparecem como cards na parte superior, e suas respostas abaixo delas como
uma lista. Selecione uma resposta para lê-la. Use os botões de voltar e
avançar na barra superior para alternar entre a resposta anterior e a
próxima dentro da mesma categoria.

Use a barra de pesquisa no topo para pesquisar na base de conhecimento. Use
o seletor de idioma para alternar entre o conteúdo traduzido. O ícone da
base de conhecimento no início do breadcrumb na barra superior leva você de
volta à página inicial da base de conhecimento. O botão de pré-visualização,
com a dica **View public knowledge base**, no lado direito da barra
superior, mostra a base de conhecimento como seus clientes a veem.

### Pesquisar

A barra de pesquisa no topo da base de conhecimento pesquisa títulos e
conteúdo de respostas, assim como títulos de categorias. Quando você inicia
a pesquisa de dentro de uma categoria, apenas essa categoria e suas
subcategorias são pesquisadas.

Os termos de pesquisa suportam a sintaxe do Elasticsearch. Todos os termos
precisam corresponder, e termos simples também correspondem a começos de
palavra, então `refund` encontra `refunds`. Para filtrar por um campo,
nomeie o campo na sua pesquisa:

| Exemplo                   | Encontra                                  |
|---------------------------|--------------------------------------------|
| `created_at:>now-14d`     | Respostas criadas nos últimos 14 dias      |
| `edited_at:>now-3d`       | Respostas atualizadas nos últimos 3 dias   |
| `tags:ai-generated`       | Respostas com a tag `ai-generated`         |
| `publication_state:draft` | Todas as respostas em rascunho             |

Os campos `tags:` e `publication_state:` exigem o Elasticsearch. Pesquisas
que nomeiam um campo correspondem exatamente e não usam correspondência por
prefixo.

Selecione a lâmpada na barra de pesquisa para ver pesquisas sugeridas. Ela
oferece os filtros mais comuns como atalhos de um clique e um link para esta
documentação.

Respostas da base de conhecimento também aparecem na pesquisa global. Na
pesquisa detalhada, elas estão disponíveis como uma entidade de pesquisa
separada, com título, visibilidade e data de atualização como colunas de
resultado. Veja [Pesquisa](/pt_BR/documentation/use/guides/search) para a
pesquisa detalhada e a sintaxe completa do Elasticsearch.

## Editar a base de conhecimento

### Categorias

![Captura de tela mostra o painel de edição de categoria com os campos
título, ícone e categoria
pai](/screenshots/cypress/documentation/use/guide-knowledge-base.cy.js/kb-category-flyout.png)

Para criar uma **categoria**, selecione o card `+ Add category`. Isso
funciona na página inicial da base de conhecimento para categorias de nível
superior, assim como dentro de uma categoria para subcategorias. Outra forma
de criar uma nova categoria dentro de outra é usar o botão ::a:: no card da
categoria e selecionar **Add sub-category**.

Cada categoria consiste em um título e um ícone. Os ícones ajudam os
usuários a reconhecer categorias rapidamente, então escolha o que melhor se
encaixa no conteúdo.

Para editar uma categoria, clique no menu ::a:: no seu card e selecione
**Edit category**, ou use o botão idêntico no topo da barra lateral direita
quando estiver dentro de uma categoria.

### Permissões de categoria

O painel de categoria contém uma matriz de **Permissions** que atribui a
cada função seu próprio nível de acesso a uma categoria. Três níveis estão
disponíveis: **Editor** para ler e editar o conteúdo da categoria,
**Reader** para lê-la, incluindo respostas publicadas internamente, e
**None** para ocultá-la da função (respostas publicadas estão sempre
visíveis na base de conhecimento publicada). Funções sem a permissão de
leitor ou editor da base de conhecimento não têm linha na matriz.

Por padrão, o acesso é gerenciado globalmente: todos com a permissão de
leitor da base de conhecimento veem todas as respostas publicadas
internamente, e os editores podem trabalhar com tudo. Salvar uma matriz de
permissões para a base de conhecimento ou para uma única categoria que
difira desses padrões muda toda a base de conhecimento para acesso granular:
a visibilidade do conteúdo passa então a seguir as permissões por
categoria. Selecionar apenas o acesso que uma função já tem por padrão não é
salvo e mantém o comportamento global.

As permissões de uma categoria pai são herdadas por suas subcategorias. Um
nível **Editor** ou **None** herdado não pode ser sobrescrito na
subcategoria; as opções correspondentes ficam bloqueadas. Um nível
**Reader** herdado pode ser alterado. A opção **Editor** fica bloqueada para
funções que têm apenas a permissão de leitor da base de conhecimento. Uma
alteração que retiraria seu próprio acesso de editor a uma categoria é
rejeitada, independentemente das suas outras funções. Respostas publicadas
continuam disponíveis para todos; permissões granulares afetam apenas
respostas internas e a edição de conteúdo.

### Respostas

Para adicionar uma **resposta**, abra uma categoria e selecione o item `+
Add answer` ou use o menu ::a:: da categoria e selecione **Add answer**
ali. Uma resposta consiste em um título e conteúdo em texto rico. O editor
oferece os mesmos recursos de formatação do editor de artigos de
ticket. Veja a [seção de
formatação](/pt_BR/documentation/use/guides/editor#apply-formatting) do guia
do editor para mais detalhes. As tags facilitam encontrar respostas, tanto
na pesquisa da base de conhecimento quanto ao trabalhar em tickets.

Dentro de uma resposta, você pode vincular a outras respostas da base de
conhecimento. Selecione a ferramenta correspondente na barra de ferramentas
do editor e escolha a resposta a ser vinculada. Os links da base de
conhecimento continuam corretos quando a resposta de destino é movida para
outra categoria.

As respostas suportam colaboração em tempo real: quando vários editores
abrem a mesma resposta para edição, o Zammad mostra quem mais está editando
e mantém as alterações de todos juntas.

Enquanto você edita, seu trabalho é salvo automaticamente como rascunho. Se
você fechar a aba ou o navegador, pode voltar mais tarde e continuar de onde
parou. Até que você salve a resposta explicitamente, é possível descartar as
alterações não salvas.

O editor oferece mais do que texto formatado. Você pode incorporar imagens
do seu computador diretamente no corpo da resposta, incorporar vídeos por
meio de uma URL de vídeo e adicionar anexos de arquivo que os leitores
baixam na seção de anexos abaixo da resposta. Para vídeos, YouTube e Vimeo
funcionam de imediato, enquanto instâncias auto-hospedadas do PeerTube e do
MediaCMS podem ser adicionadas pelo seu administrador. Os leitores podem
selecionar uma imagem em uma resposta para abrir uma pré-visualização maior
dela.

### Mover conteúdo

Para mover uma categoria, incluindo seu conteúdo, para outra categoria pai,
abra o menu ::a:: da categoria e selecione **Edit category**. Escolha a nova
categoria pai no campo **Parent category** e salve. A categoria e todas as
suas subcategorias e respostas se movem junto.

Para mover uma resposta, edite a resposta e selecione outra categoria na
barra lateral direita.

### Excluir conteúdo

Categorias e respostas podem ser excluídas pelos seus menus ::a:: (**Delete
category**, **Delete answer**). Excluir uma categoria exige que você exclua
antes suas subcategorias e respostas. Uma exclusão não pode ser desfeita,
então considere arquivar uma resposta em vez de excluí-la, para não perder
seu conteúdo.

### Ordenar conteúdo

![Captura de tela mostra a barra de ordenação com o seletor de modo em
destaque e a aba de respostas
ativa](/screenshots/cypress/documentation/use/guide-knowledge-base.cy.js/kb-sort-content.png)

Categorias e respostas podem ser ordenadas por categoria. Abra o menu ::a::
na barra superior e selecione **Sort content**. A barra de ordenação aparece
na parte inferior da tela. Dentro de uma categoria, alterne entre as abas
**Categories** e **Answers** para organizar as duas listas separadamente; a
página inicial da base de conhecimento ordena suas categorias de nível
superior.

Três modos de ordenação estão disponíveis tanto para respostas quanto para
categorias. Respostas e categorias podem ser ordenadas de forma
independente.

| Modo                       | Efeito                                                                   |
|----------------------------|---------------------------------------------------------------------------|
| **Sort alphabetically**    | Entradas ordenadas por título, independentemente de alterações manuais  |
| **Sort by latest updates** | Entradas atualizadas mais recentemente primeiro                          |
| **Sort by drag & drop**    | Sua ordem personalizada; arraste as entradas para o lugar                |

Para categorias, _latest updates_ significa as próprias alterações
editoriais da categoria, como um título renomeado ou um novo
ícone. Alterações nas respostas dentro dela não afetam a posição da
categoria. Respostas são datadas por suas edições de conteúdo.

Selecione o modo, organize as entradas se necessário e salve. A ordem se
aplica a todos que visualizam a base de conhecimento.

### Visibilidade e agendamento

![Captura de tela mostra a seção de visibilidade agendada na barra lateral
da resposta, em
destaque](/screenshots/cypress/documentation/use/guide-knowledge-base.cy.js/kb-scheduled-visibility.png)

Para alterar a visibilidade de uma resposta, edite a resposta e selecione a
nova visibilidade na barra lateral da resposta; a alteração entra em vigor
imediatamente ao clicar em `Update`. Use rascunhos para preparar conteúdo
que ainda não está pronto para publicação, e o arquivamento para aposentar
respostas desatualizadas sem excluí-las.

Em vez de alterar a visibilidade manualmente, você pode agendar alterações
de visibilidade: uma resposta pode ser publicada automaticamente em uma data
específica, ou arquivada quando se tornar obsoleta. As alterações agendadas
são listadas na barra lateral da resposta e visíveis apenas para
editores. Crie um novo agendamento clicando no botão ::+:: na seção
**Scheduled visibility**, no modo de edição da resposta.

Os agendamentos seguem a ordem dos estados de visibilidade: uma resposta
pode se tornar interna, depois publicada, depois arquivada, cada uma com sua
própria data. Rascunhos não podem ser agendados, e um estado de visibilidade
que a resposta já atingiu não pode ser agendado novamente.

## Avançado

### Comportamento ao salvar

Ao lado dos botões **Create** e **Update**, você pode escolher o que
acontece quando salva uma resposta: **Stay on tab** mantém o editor aberto,
**Close tab and open the answer** retorna à resposta salva, **Close tab and
open the category** retorna à sua categoria, e, após criar uma resposta,
**Close tab and add another answer** abre um novo formulário na mesma
categoria. Sua escolha é lembrada para os próximos salvamentos.

### O site público de ajuda

Os clientes acessam respostas publicadas tanto no próprio Zammad quanto no
site público de ajuda, dependendo de como seu administrador configurou a
base de conhecimento. Por padrão, o site público está disponível em `/help`
no seu host do Zammad, por exemplo
`https://zammad.example.com/help/pt-br`. O site público mostra exatamente o
conteúdo publicado, organizado por categorias, e funciona sem uma conta do
Zammad.

Para ver a base de conhecimento como seus clientes a veem, use o botão de
pré-visualização descrito na seção Navegar acima. Diferente do site público,
a pré-visualização também inclui respostas não publicadas, para que você
possa revisar rascunhos antes de publicá-los.

### Feeds

A base de conhecimento permite que você se inscreva na base de conhecimento
ou em categorias individuais por meio de feed Atom/RSS. Este recurso é
opcional e precisa ser ativado pelo seu administrador.

Para **agentes**: vá até o nível da sua base de conhecimento ao qual deseja
se inscrever e selecione **Set up RSS feed** no menu ::a:: da barra
superior, ou no menu ::a:: da barra lateral da resposta ao visualizar uma
resposta. No painel, você pode escolher entre um feed para toda a base de
conhecimento e um feed da categoria em que está. A URL do feed inclui um
token pessoal, e o feed inclui respostas internas de acordo com suas
permissões. Trate a URL do feed como uma senha. Se ela vazar, renove o
token, o que invalida as URLs distribuídas até então.

**Clientes** no site público de ajuda têm seu próprio feed, apenas do conteúdo publicado, sem token. Eles podem
baixar um arquivo de feed clicando no ícone de feed na barra de rodapé.

### Copiar o título

O botão ::c:: ao lado do título na barra superior copia o nome da categoria
ou resposta que você está visualizando para a área de transferência, pronto
para colar em um ticket ou em uma pesquisa.
