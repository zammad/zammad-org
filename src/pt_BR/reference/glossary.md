---
order: 1
title: Glossário
---

# Glossário

Já se perguntou o que queremos dizer com um termo específico? Reunimos
abaixo os termos mais relevantes para você.

<VPGlossary>

Admin
: um admin(istrador) é um usuário no Zammad que tem direitos especiais e gerencia seu
  Zammad. Um admin pode, por exemplo, configurar permissões de usuário, configurações de
  contabilização de tempo, automação e módulos de texto.
  Se você está procurando alguém para ajustar algo no seu Zammad, seu admin
  é a pessoa certa para perguntar.

Agente
: um agente é um usuário no Zammad que trabalha em tickets e responde às
  solicitações dos clientes. Agentes também podem ser admins, o que significa que podem alterar configurações,
  permissões de usuário, etc. (veja acima).

API
: uma API (Application Programming Interface) é um conjunto de regras e protocolos
  que permitem que diferentes aplicações de software se comuniquem entre si.
  Ela permite conectar sistemas de terceiros ao seu Zammad (por exemplo, redes
  sociais, mensageiros, ferramentas de monitoramento).

  Você pode saber mais em nossa
  [página de API](https://zammad.com/en/product/features/rest-api){target=_blank}
  assim como em nossa [referência de API](/pt_BR/reference/rest-api/intro).

Artigo
: cada item dentro de um ticket é chamado de artigo. Artigos de ticket
  podem ser internos (apenas agentes podem vê-los) ou públicos
  (clientes também podem vê-los; por exemplo, notas públicas ou emails enviados) e incluem
  texto formatado, assim como anexos e imagens inline.

Automação
: há muitos processos que podem ser automatizados com o Zammad.
  Isso significa que certas ações acontecem automaticamente.
  Uma automação pode ser baseada em tempo ou em ação e deve cobrir todo
  cenário de automação concebível.
  Um exemplo poderia ser a exclusão recorrente de clientes que não são mais
  necessários, ou a atribuição de grupos com base em atributos de ticket.

Salvamento automático
: o recurso de salvamento automático do Zammad garante que nenhum trabalho seja perdido. Então, se seu navegador
  travar, basta fazer login novamente e retomar de onde estava.
  Saiba mais em nossa
  [página do recurso de salvamento automático](https://zammad.com/en/product/features/autosave){target=_blank}.

Branding
: cada empresa tem uma identidade diferente. É por isso que o Zammad permite adicionar seu
  logo, assinatura, links e outras coisas!

Changelog
: a cada novo lançamento vem um novo changelog. É basicamente uma lista de todas
  as coisas que mudaram, desde novas melhorias até correções de bugs.

  Você pode encontrar todos eles no nosso
  [GitHub](https://github.com/zammad/zammad/blob/stable/CHANGELOG.md){target=_blank}!

Checkmk
: o Checkmk é uma poderosa ferramenta de monitoramento de TI que pode enviar alertas de status
  em tempo real ao Zammad via email ou API REST. Configure esses alertas no Checkmk,
  e o Zammad criará, atualizará e fechará tickets automaticamente com base
  na saúde do seu sistema.

Clearbit
: o Clearbit é um serviço projetado para coletar informações sobre seus
  contatos. Assim, novas consultas de usuários desconhecidos no Zammad podem ser automaticamente
  enriquecidas com informações como empresa, número de funcionários,
  faturamento anual, setor e muito mais.

Aviso de conflito
: quando dois agentes editam o mesmo ticket ao mesmo tempo, muita coisa pode dar errado -
  desde respostas duplicadas até mensagens sobrescritas. O Zammad ajuda você a evitar
  isso com seu aviso de conflito integrado. Então, se você vir o avatar de outro agente
  e um pequeno lápis na parte inferior do seu ticket, significa que o outro agente
  está editando-o no momento.

Barra lateral de conteúdo
: barra lateral direita na visualização do ticket, que inclui as abas da barra lateral e a
  barra lateral ativa (se aberta).

Core Workflows
: este recurso permite configurar campos dinâmicos e máscaras de ticket com base em
  atributos disponíveis no Zammad. Por exemplo, você pode desativar ou ocultar campos,
  torná-los visíveis com base em outros campos ou atributos, torná-los obrigatórios e
  muito mais!

CTI
: CTI significa Computer Telephony Integration (Integração de Telefonia com Computador) e permite coletar
  informações detalhadas sobre todas as suas chamadas recebidas e realizadas.
  Isso inclui, por exemplo, um registro de chamadas, uma visão geral de qual agente está
  atualmente em uma chamada, uma pesquisa de ID de chamador, e até um modo de não perturbe.

Desenvolvimento personalizado (CD)
: estamos constantemente trabalhando para melhorar o Zammad, e continuamos adicionando novos
  recursos a cada lançamento. No entanto, às vezes nossos clientes podem
  precisar de um recurso, adição ou ajuste muito específico, que é muito
  urgente ou muito particular para seu caso de uso individual.
  É aí que um desenvolvimento personalizado pode acontecer: oferecemos ao cliente
  desenvolver o recurso desejado por um preço combinado previamente
  (baseado nas horas esperadas necessárias para a conclusão).

Cliente
: um cliente é uma pessoa com quem você se comunica via Zammad.
  Para cada cliente, há uma página de perfil mostrando todos os tickets e mais
  informações. Clientes podem ser atribuídos a uma ou mais organizações.
  Cada cliente pode acessar sua interface individual
  de cliente, onde vê todos os seus tickets com o status
  atual e atualizações ao vivo.

Painel
: o painel é a página de boas-vindas individual no Zammad e fornece
  feedback sobre o seu trabalho.
  Aqui você encontra todo tipo de visões gerais, como os tickets abertos,
  o tempo médio de espera, ou a taxa de reabertura. Você também pode ver o que seus
  colegas estão fazendo verificando o Feed de atividades.

Diálogo
: um diálogo é um elemento que aparece no meio da tela devido à sua
  importância. Um exemplo poderia ser o diálogo que pergunta se você quer salvar ou descartar
  suas alterações não salvas.

Documentação
: você provavelmente já percebeu: você está lendo uma parte da
  documentação do Zammad. 😉

Elasticsearch
: o Zammad oferece uma integração com o Elasticsearch (um motor de busca gratuito e de código aberto)
  que torna o processo de pesquisa no Zammad super rápido e poderoso. Você
  pode até conectar uma ferramenta de relatórios como o Grafana ao seu Elasticsearch para
  criar relatórios e estatísticas poderosos.

Escalonamento
: um escalonamento é o que acontece depois que o prazo de um ticket expira. Você
  pode configurá-lo dentro do recurso de SLA (Acordo de Nível de Serviço) do Zammad. Um
  ticket escalonado é marcado em vermelho na sua barra de tarefas e nas visões gerais.

Integração com Exchange
: a integração com Exchange permite sincronizar seus contatos do seu
  catálogo de endereços do Exchange com o Zammad. Toda vez que um contato é atualizado
  no Exchange, isso é refletido no Zammad. Isso lhe dá acesso
  direto a todos os seus contatos no seu Zammad.

Autenticação externa
: a autenticação externa é uma opção fácil, de um clique, para seus usuários fazerem
  login no Zammad. Ela tem vários benefícios: além de ser mais rápida, também
  significa que seus usuários precisarão memorizar menos senhas.
  O Zammad atualmente suporta mais de dez provedores de login, como Facebook,
  GitHub, GitLab, Google ou Microsoft.

Recurso
: um recurso é uma capacidade ou funcionalidade específica que o Zammad oferece a
  você, como nossas integrações, ferramentas de produtividade ou canais adicionais.
  Continuamos adicionando novos recursos a cada lançamento.

Solicitação de recurso
: você pode nos avisar se está sentindo falta de um recurso específico no Zammad.
  Coletamos todos os seus desejos no nosso fórum da comunidade, na
  [categoria de solicitação de recursos](https://community.zammad.org/c/stuff-you-like-zammad-to-have-feel-free-to-discuss-and-add-proposals/6/all){target=_blank}.
  Se uma solicitação aparece regularmente e achamos que seria uma
  ótima adição, colocamos no nosso roteiro e começamos a trabalhar nela.

Patrocínio de recurso
: se uma organização precisa urgentemente de um dos recursos da lista,
  ela pode acelerar o desenvolvimento e colocá-lo no topo da lista
  patrocinando-o, o que significa que ela cobre os custos do desenvolvimento.

GitHub
: o GitHub é um serviço para gerenciamento de versões de projetos de
  desenvolvimento de software. Ele usa o Git, um software que rastreia alterações em conjuntos de arquivos.
  Aqui no Zammad, o usamos para manter e aprimorar nosso código.

  Como o Zammad é um projeto de código aberto, muitos desenvolvedores e entusiastas de tecnologia de todo o
  mundo contribuem para ele. O GitHub é onde coordenamos tudo isso.
  Siga o link para encontrar [nossos repositórios](https://github.com/zammad){target=_blank}.

  Além de nossos próprios repositórios, o Zammad também tem uma integração com o GitHub.
  Usá-la permite exibir todas as informações relevantes sobre suas
  issues diretamente em uma aba da barra lateral, como status ou responsáveis.

GitLab
: o GitLab é semelhante ao GitHub.
  Aqui no Zammad, o usamos para nosso desenvolvimento interno.

  Há também uma integração que permite aos usuários conectar o GitLab ao Zammad,
  para que todas as suas issues e as alterações correspondentes sejam refletidas na
  aba da barra lateral do Zammad também.

Grafana
: o Grafana é uma ferramenta de relatórios de código aberto. Usa o Elasticsearch como fonte de dados.
  Clientes hospedados com um plano Plus podem usá-lo para obter estatísticas detalhadas de
  sua instância. Usuários auto-hospedados do Zammad também podem usar o Grafana.

Grupos
: grupos são um sinônimo de departamentos ou grupos de processamento.
  Tickets recebidos podem ser atribuídos a grupos.
  Dentro do grupo, um responsável pode ser definido, que é então responsável por
  esse ticket. O acesso aos tickets é controlado via as funções. Em uma função, você
  pode definir quais permissões ela tem com base nos diferentes grupos.
  As permissões possíveis são "read", "create", "change", "overview" e
  "full" (ou nenhuma delas).

  Se você já trabalhou com o sistema OTRS no passado, pode se lembrar do
  princípio de "filas". Os grupos no Zammad são o mesmo que as filas no
  OTRS.

Icinga
: o Icinga é um sistema de monitoramento que monitora a disponibilidade de toda a
  infraestrutura de sistemas de uma organização.
  Ele pode ser integrado ao Zammad para que dispare um ticket em caso
  de uma situação de aviso.

i-doit
: o i-doit é um CMDB (Configuration Management Data Base, banco de dados de gerenciamento de configuração).
  Ele ajuda você a acompanhar cada parte da infraestrutura física e digital.
  Uma integração correspondente possibilita conectá-lo
  ao Zammad, onde adiciona uma nova aba à barra lateral de ticket do Zammad, para
  que você possa vincular a objetos existentes do i-doit para fácil referência.
  Também permite criar tickets do Zammad no i-doit.

Sistema de rastreamento de issues
: rastreadores de issues geralmente são sistemas que rastreiam processos em nível técnico.
  Dois dos exemplos mais conhecidos são GitHub e GitLab.

  O Zammad também é frequentemente referido como um sistema de rastreamento de issues.
  No entanto, como um helpdesk, ele foca na comunicação em nível de cliente,
  em vez do nível técnico.

Kibana <Badge type="info" text="on-premise only" />
: o Kibana é uma ferramenta de relatórios de código aberto baseada em navegador, que foca na
  avaliação de dados. Foi desenvolvido pela Elastic, por isso não é surpresa
  que use dados do Elasticsearch para suas análises.

  O Kibana pode ser integrado ao Zammad, permitindo que dados do helpdesk sejam
  mapeados na ferramenta de relatórios.

Base de conhecimento
: pense em um conjunto muito extenso de perguntas frequentes - é exatamente isso que a
  base de conhecimento do Zammad é. Ela reúne todas as informações importantes:
  definições, processos, tutoriais, organogramas, etc.

  Artigos da base de conhecimento podem ser internos ou externos, então você pode
  exibi-los ao mundo (bom para informações sobre seu produto ou
  serviço, por exemplo) ou mantê-los para sua equipe (por exemplo, para processos internos
  ou informações da equipe).

LDAP
: um Lightweight Directory Access Protocol (LDAP) ajuda a fornecer informações
  sobre seus usuários dentro do Zammad. A autenticação de usuários contra o LDAP
  e o mapeamento de funções LDAP para funções do Zammad também são possíveis.

Macro
: uma macro é uma série de ações. Ao iniciar a macro, as ações são
  acionadas e executadas, para que os usuários não precisem trabalhar em cada
  etapa individual separadamente. Isso economiza uma enorme quantidade de tempo e garante
  que nenhuma etapa seja esquecida.

  Você pode definir suas próprias macros e realizar ações com base em todos os
  atributos disponíveis no ticket.

Conteúdo principal
: a seção do meio do layout do Zammad. Dependendo da visualização que você
  selecionou, ela mostra o painel, visões gerais, a visualização de detalhes do ticket, o
  formulário de criação de ticket ou outras telas.

Rodapé do conteúdo principal
: a linha de ações na parte inferior da área de Conteúdo Principal. Ela contém as ações principais
  da visualização atualmente ativa, como `Create`, `Apply Template` ou
  `Discard Changes` no formulário de criação de ticket.

Menções
: menções são um recurso do Zammad que permite marcar outro agente em um
  ticket. Basta digitar [[@]][[@]] e o nome. A pessoa selecionada será notificada
  e passará a acompanhar o ticket a partir de agora.

Migrador / Assistente de migração
: se uma empresa quer mudar de outro software de helpdesk para o Zammad,
  ela geralmente tem uma preocupação: e os dados existentes?
  É por isso que criamos nossos assistentes de migração, que ajudam a migrar todos
  os dados.

Monit
: o Monit é uma ferramenta de monitoramento de código aberto que depende de uma configuração simples e
  uma comunidade forte. Você pode integrá-lo ao Zammad - dessa forma,
  um ticket é criado toda vez que você recebe um email no Monit.

Aba de navegação
: um elemento da navegação principal, como **Overviews** ou
  **Knowledge Base**.

Nagios
: o Nagios é outra ferramenta de monitoramento que alerta as equipes de TI quando um incidente
  acontece. Pode ser integrado ao Zammad para que um ticket seja criado em
  caso de um alerta.

On-Premise
: este termo significa que o Zammad não é fornecido como um serviço de nuvem da
  empresa Zammad, mas roda em um servidor controlado por um usuário ou
  cliente do Zammad. Auto-hospedagem significa a mesma coisa.

Organização
: uma organização é um agrupamento de clientes que operam na mesma
  empresa ou grupo de empresas.
  Um cliente cuja organização é "compartilhada" tem acesso a todos os tickets da sua
  organização.

Responsável
: o responsável por um ticket é a pessoa responsável por ele e que está trabalhando nele.
  O responsável pode ser alterado para outro agente.
  Nesse caso, é recomendável deixar uma nota de transferência no ticket, para
  que o novo responsável saiba o que fazer.

Relação pai/filho
: se um ticket resulta em outras subtarefas (ou correspondências adicionais),
  você pode dividi-lo em vários tickets. O principal será então o ticket
  pai, e os tickets com subtópicos relacionados são filhos.
  A propósito: da mesma forma, você também pode mesclar dois tickets em um.

Placetel
: o Placetel é um sistema telefônico em nuvem que permite aos usuários fazer chamadas
  via VoIP. Use seu número de telefone normal e ligue diretamente para alguém no
  celular ou fixo, mantendo toda a comunicação em um só lugar
  no Zammad.

  Integrar uma conta Placetel ao Zammad fornece aos usuários um registro de chamadas,
  tornando o histórico de suas correspondências ainda mais preciso.
  Chamadores são identificados diretamente pelo seu ID de chamador - uma função chave
  que economiza muito tempo dos agentes ao atribuir chamadores.

Navegação principal
: a navegação principal é a barra lateral esquerda no Zammad, que contém a
  barra de tarefas, a pesquisa, notificações, base de conhecimento e possivelmente mais,
  dependendo do seu sistema.

Prioridade
: cada ticket recebe uma prioridade atribuída. Por padrão, a prioridade é 2 (normal).
  Além disso, há as prioridades 1 (baixa) e 3 (alta). Você pode até
  adicionar mais prioridades ao seu Zammad.

Lançamento
: a cada poucos meses, lançamos uma nova versão do Zammad, chamada de
  lançamento. Cada lançamento adiciona novos recursos ao nosso software. Há lançamentos
  principais e secundários:
  lançamentos principais (como Zammad 1.0, 2.0, etc.) trazem mudanças significativas.
  Lançamentos secundários (como 1.1, 2.1, etc.) são lançados nesse meio tempo e trazem
  atualizações menores.

  Em nossas [notas de lançamento](https://zammad.com/en/releases){target=_blank}, você
  pode encontrar quais recursos estão incluídos nas novas versões e também informações importantes
  sobre o que considerar antes de atualizar o Zammad.

Função
: cada usuário tem uma função atribuída. Por padrão, há três funções:
  admin, agente e cliente.

  Os _admins_ têm os direitos mais amplos: podem definir funções, permissões
  e configurações para toda a equipe e instância.
  Os _agentes_ podem visualizar e editar tickets, mas não alterar configurações além
  daquelas de seus próprios perfis.
  Os _clientes_ podem ver o status de processamento de seus tickets em sua
  interface de cliente.

  Você pode até adicionar novas funções ao seu Zammad.

Navegação secundária
: refere-se a um menu adicional ao lado da navegação (por exemplo, ao abrir configurações
  de perfil).

Painel flutuante
: o painel que desliza a partir do lado direito da tela para ações como
  vincular ou mesclar tickets e ações em massa.

Aba da barra lateral
: na barra lateral de conteúdo, há diferentes abas como "Customer",
  "Organization" e "Ticket", dependendo do seu sistema e ticket. Elas são
  chamadas de abas da barra lateral.

  Uma aba da barra lateral ativa é a aba da barra lateral atualmente aberta.

Sipgate
: o Sipgate é uma solução SaaS para telefonia via internet.
  A integração do Zammad com o Sipgate fornece aos usuários uma visão geral detalhada de
  chamadas. Se você tem um cliente que quer se conectar a um determinado
  agente, o registro de chamadas informará se esse colega está atualmente disponível.

SLA
: um Acordo de Nível de Serviço (SLA) é um contrato entre um usuário final e uma
  empresa que define os requisitos mínimos de serviço esperados, incluindo
  qualidade, disponibilidade e pontualidade.
  Eles são usados para definir expectativas e responsabilizar empresas por cumprir
  suas promessas.

  Você pode configurar SLAs facilmente no Zammad e definir parâmetros como o tempo
  para a primeira resposta, uma atualização e uma solução. Assim que o prazo for
  atingido, o ticket escalonará.

S/MIME
: o S/MIME é o método mais amplamente suportado para comunicação segura por email.
  Ao ativar e configurar essa integração no Zammad, mensagens de saída
  podem ser assinadas e criptografadas, e mensagens de entrada podem ser descriptografadas e sua
  assinatura verificada.

SSO
: o logon único (SSO) permite acessar todos os seus sistemas e dispositivos com
  apenas um login. Há vários provedores que tornam esse processo fácil e
  seguro. O Zammad atualmente suporta SSO via diferentes provedores.

Estado
: cada ticket tem um estado que reflete o progresso atual da resolução do
  problema. O estado de um ticket pode ser alterado manualmente ou automaticamente, com base
  em automação ou SLA. Cada estado tem um tipo de estado. Há quatro tipos de estado
  por padrão, e eles têm código de cores. Você pode até adicionar estados adicionais
  ao seu Zammad.

Barra de tarefas
: a seção da navegação principal que contém as abas da barra de tarefas para
  seus tickets, usuários, organizações e a pesquisa detalhada abertos.

Aba da barra de tarefas
: uma única aba na barra de tarefas. Clicar na aba traz o
  ticket, usuário, organização ou pesquisa correspondente para a área de conteúdo principal.

Tags
: as tags ajudam você a categorizar tickets. Você pode defini-las com base no seu
  caso de uso. Por exemplo, se você é um negócio de varejo, suas tags podem ser baseadas
  nas categorias de seus produtos, para ajudá-lo a organizar tickets pelo tipo de produto
  ao qual se referem.
  Mas elas também podem ser baseadas no tipo de solicitação, por exemplo, reembolso, problema de
  entrega, reclamação.

  Tags podem ser consultadas em condições em uma automação e atribuídas
  automaticamente, por exemplo, dependendo de palavras-chave no título do ticket.

Módulo de texto
: se você percebe que envia as mesmas respostas repetidamente,
  pode economizar muito trabalho criando um módulo de texto.
  Dessa forma, basta digitar o atalho [[:]][[:]] em um artigo, e todos os
  módulos de texto disponíveis são exibidos, de onde você pode selecionar o desejado.
  Você pode restringir os resultados da pesquisa adicionando partes do nome do módulo de texto,
  palavras-chave ou conteúdo após [[:]][[:]].

  Por exemplo, aqui no Zammad, temos um módulo de texto com o atalho
  `::ilff`, que se transforma em `I look forward to your feedback`.

Modelo (de ticket)
: se você cria muitos tickets semelhantes, pode criar um modelo para eles. Isso
  é útil para introduções ao seu produto/serviço ou para elaborar uma
  oferta.

Usuário
: um usuário é qualquer usuário do sistema de tickets. Cada usuário tem
  permissões atribuídas, que permitem acessar certas áreas e informações.
  Usuários podem ter várias funções, sendo as opções padrão agente, admin
  e cliente.

Webhooks
: webhooks são uma forma fácil de os sistemas se comunicarem entre
  si e permitem enviar dados para qualquer outra aplicação.
  Eles permitem informar um sistema de terceiros sobre novas informações no Zammad
  (por exemplo, enviando uma notificação de tickets novos e atualizados para o seu Mattermost).

Zammad
: o Zammad é o melhor helpdesk do mundo.
  Ponto final.

</VPGlossary>
