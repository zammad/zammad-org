---
order: 99
title: 'Retenção de dados e serviços externos'
---

# Retenção de dados e serviços externos

Por quanto tempo o Zammad armazena dados de usuário? Como posso gerenciar o
comportamento de retenção de dados de usuário? A quais serviços o Zammad se
conecta?

## Retenção de dados

Os seguintes dados são armazenados localmente no sistema de produção:

### Tickets e usuários

Por padrão, o Zammad nunca exclui automaticamente tickets ou usuários.

Para ativar a exclusão **automática** de tickets após um intervalo definido,
use o agendador do Zammad. Você pode configurá-lo na interface de administração do Zammad em
_Manage > Scheduler_.

Para excluir **manualmente** usuários e todos os seus tickets associados (por exemplo, em
conformidade com uma solicitação de "Direito ao Esquecimento" sob a LGPD/GDPR), você pode usar
as funções de privacidade de dados no painel de administração em _System > Data Privacy_
ou [usar o console](/pt_BR/reference/rails-commands#deleting-records).

### Sessões de chat

Assim que uma sessão de chat for marcada como **fechada**, ela é agendada
para exclusão automática 12 meses depois. Registros de endereço IP para
sessões de chat podem ser excluídos manualmente seguindo as [etapas da
página do console
rails](/pt_BR/reference/rails-commands#remove-ip-address-logs).

### Registro de chamadas CTI

O registro de chamadas mostra apenas as 60 entradas mais recentes. Cada
entrada no registro de chamadas é excluída automaticamente após 12 meses.

### Arquivos de log

O Zammad grava arquivos de log em disco (normalmente em `/opt/zammad/log/`).

Instalações via pacote configuram um utilitário de sistema separado chamado
`logrotate` para renomear e arquivar (ou _rotacionar_) arquivos de log
diariamente e remover logs antigos após 14 dias.

Se instalado a partir do código-fonte, é fortemente recomendado configurar o
`logrotate` ou um utilitário de gerenciamento de logs semelhante; o Zammad
não excluirá logs antigos por conta própria.

### Sessões de usuário

O Zammad mantém informações de sessão sobre cada usuário atualmente
conectado.

Essa informação é excluída automaticamente quando um usuário faz logout, e pode
ser visualizada ou excluída manualmente via o painel de administração (em _System >
Sessions_). Os usuários também podem excluir suas próprias informações de sessão via o
menu de preferências do usuário, em _Devices_.

As informações de sessão incluem endereço IP (e possivelmente localização
geográfica), navegador, hora do login original e hora da última visita.

### Tarefas de privacidade de dados

Cada entrada na lista de tarefas de privacidade de dados é excluída
automaticamente após 12 meses.

## Configuração

O Zammad utiliza serviços web de terceiros para certas funções, o que significa
que dados de usuário podem ocasionalmente ser enviados ou expostos a terceiros.
Essas funções podem ser desativadas individualmente no painel de administração em
_Settings > System > Services_.

::: info
Por padrão, os serviços de terceiros dos quais o Zammad depende são majoritariamente
hospedados e gerenciados pela própria Zammad Foundation, mas o Zammad
pode ser estendido para se conectar a outros serviços em vez disso.

O código-fonte dessas integrações de serviços de terceiros pode ser
encontrado em
[nosso repositório](https://github.com/zammad/zammad/tree/develop/lib/service){target=_blank}.
:::

### Imagens

Nenhuma imagem privada ou informação de identificação pessoal é armazenada
em images.zammad.com.

O serviço Images armazena em cache imagens publicamente disponíveis de
fontes como o Gravatar e as fornece à aplicação Zammad como avatares de
usuário e logos de organização. Essas imagens são localizadas usando digests
MD5 de endereços de email de usuário e nomes de domínio de
organização. Avatares de usuário ficam em cache por 7 dias; logos de
organização ficam em cache por 30 dias.

### GeoCalendar

Nenhuma informação de usuário é armazenada ou colocada em cache em
geo.zammad.com.

Como parte de sua funcionalidade de acordo de nível de serviço (SLA), o
Zammad requer informações detalhadas e localizadas de calendário (por
exemplo, para definir o fuso horário e acomodar feriados nacionais e horário
de verão). O serviço GeoCalendar é usado para obter essa informação.

### GeoIP

Nenhuma informação de usuário é armazenada ou colocada em cache em
geo.zammad.com.

Um dos recursos de segurança do Zammad é rastrear sessões de usuário com
base no navegador e país de origem do usuário. Atividade de login suspeita a
partir de um navegador ou país diferente pode fazer com que o Zammad envie
um email de alerta ao usuário afetado. O serviço GeoIP é usado para associar
endereços IP a uma origem geográfica.

### Geolocalização

O serviço de geolocalização do Zammad depende do OpenStreetMap (OSM), a
menos que você o desative. Se você fornecer um endereço (ou partes de um
endereço) em um objeto de usuário, há uma busca de coordenadas do OSM, que
são armazenadas no banco de dados do Zammad. Dê uma olhada na [política de
privacidade](https://osmfoundation.org/wiki/Privacy_Policy){target=_blank}
deles para mais informações.
