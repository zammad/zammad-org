---
order: 6
title: 'Base de conhecimento'
---

# Base de conhecimento

A base de conhecimento é a biblioteca de conteúdo integrada do Zammad para
organizar perguntas frequentes, tutoriais, processos internos e muito
mais. Os clientes podem navegar pelas respostas publicadas (artigos) para
autoatendimento, enquanto os agentes podem usá-las como referência interna
ou inseri-las diretamente ao responder tickets.

Este guia foi escrito para agentes que desejam editar a base de conhecimento
ou usá-la no dia a dia. Os clientes devem conseguir navegar pela base de
conhecimento pública sem precisar de instruções detalhadas.

Este recurso é opcional e precisa ser ativado pelo seu administrador.

![Captura de tela mostra a visão geral da base de
conhecimento](/screenshots/cypress/documentation/use/guide-knowledge-base.cy.js/knowledge-base-full.png)

## Fundamentos

Clique em **Knowledge Base** na navegação principal para abri-la. A base de
conhecimento abre em modo de pré-visualização, que se parece com a versão
publicada que os clientes veem.

A base de conhecimento é organizada em **categorias**, que podem conter
subcategorias e **respostas**. Cada categoria requer um ícone e um
título. As respostas consistem em um título e conteúdo em texto rico, com
formatação, imagens, vídeos, anexos de arquivo e links.

## Visibilidade

Cada resposta tem um nível de visibilidade que controla quem pode vê-la:

| Cor    | Nível                        | Quem pode ver                                                        |
|--------|------------------------------|------------------------------------------------------------------------|
| Verde  | **Public**                   | Todos, incluindo clientes navegando na base de conhecimento pública    |
| Azul   | **Internal**                 | Apenas agentes e editores                                              |
| Cinza  | **Draft** ou **Archived**    | Apenas editores                                                        |

Alterações de visibilidade têm efeito imediato.

::: warning
Respostas públicas são sempre visíveis para todos. Respostas internas exigem a permissão **Knowledge Base Reader**.
Escolha a visibilidade com cuidado ao publicar respostas.
:::

## Editando a base de conhecimento

Abra a base de conhecimento e mude para o modo de edição usando o botão
`Edit` na barra de ferramentas superior. Se você não conseguir ver o botão
`Edit`, seu administrador precisa conceder a você as permissões apropriadas.

Para criar uma nova categoria, clique no botão `+` na página principal. Para
criar uma nova resposta, navegue até uma categoria e clique no botão `+`
lá. Digite um título e o conteúdo, defina o nível de visibilidade e salve
suas alterações.

O editor da base de conhecimento oferece os mesmos recursos de texto rico do
editor de artigos de ticket. Você pode formatar texto, adicionar links para
outras respostas da base de conhecimento ou sites externos, incorporar
imagens e vídeos, anexar arquivos e usar tags para melhorar a capacidade de
pesquisa.

## Usando a base de conhecimento em tickets

### Inserindo conteúdo da base de conhecimento em respostas

Você pode inserir o conteúdo de um artigo da base de conhecimento
diretamente em uma resposta de ticket sem sair do ticket:

1. Comece a redigir uma resposta no editor do ticket.
2. Clique no botão `Insert text from knowledge base answer` na barra de
   ferramentas do editor ou digite [[?]][[?]].
3. Pesquise a resposta relevante por título ou conteúdo.
4. Selecione o artigo para inserir seu conteúdo na posição do cursor.

O conteúdo inserido preserva a formatação e pode ser editado antes do envio.

### Assistente da base de conhecimento

Quando o assistente da base de conhecimento baseado em IA está ativado, o
Zammad pode sugerir respostas relevantes da base de conhecimento com base no
conteúdo do ticket. Essas sugestões aparecem na seção **Related knowledge**
da barra lateral do ticket. Se uma resposta sugerida resolver o problema,
ela pode ser vinculada permanentemente ao ticket.

O assistente da base de conhecimento também oferece uma forma de criar
automaticamente uma resposta da base de conhecimento a partir do ticket, com
base no seu conteúdo.
