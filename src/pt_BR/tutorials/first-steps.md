---
order: 4
title: 'Primeiros passos no Zammad'
---

# Primeiros passos no Zammad

Parabéns, parece que você instalou o Zammad com sucesso. Para começar com
seu Zammad recém-instalado, vá para a próxima seção. Como alternativa, você
tem outras opções:

- [Migrar de outro sistema de tickets suportado](/pt_BR/tutorials/migrate)
- [Restaurar o Zammad a partir de um backup
  existente](/pt_BR/tutorials/backup-restore)

## Assistente de primeiros passos

Se você visitar a página web do Zammad pela primeira vez, será recebido pelo
Assistente de Primeiros Passos. Ele o guiará pelas primeiras e mais
importantes coisas.

### Etapa 1: criar sua primeira conta de administrador

Preencha as informações necessárias na caixa de diálogo. Seu endereço de
email e senha são importantes. Essas são suas credenciais para fazer login.

O Zammad aplica a seguinte política de senhas por padrão:

- 10 caracteres ou mais
- Pelo menos 2 caracteres maiúsculos e 2 minúsculos
- Um ou mais dígitos

### Etapa 2: fornecer informações da empresa

Você pode enviar um logo personalizado da sua empresa aqui. O endereço da
instância é detectado automaticamente e só requer ajuste caso seja detectado
incorretamente. Se você pular esta etapa, também pode ajustar essas coisas
depois.

### Etapa 3: canal de notificação por email

Por padrão, o Zammad usa o sendmail. Isso pode ser alterado para SMTP aqui.

O Zammad usa `noreply@<your-fqdn>` como endereço de remetente por padrão. Configurações SMTP
podem falhar - você pode pular esta etapa escolhendo sendmail e ajustar depois!

### Etapa 4: seu primeiro canal de email <Badge type="info" text="optional" />

Se você quiser começar imediatamente, já pode conectar sua conta de email.

::: danger
Por padrão, o Zammad reage a emails buscados (por exemplo, exclui-os e envia
respostas geradas automaticamente). Se não é isso que você quer, pule esta etapa
por enquanto.
:::

Depois de concluir o assistente, você é conectado automaticamente na conta
recém-criada.

## Próximas etapas

A lista abaixo pode ajudá-lo a encontrar o caminho certo. No entanto, você
deve adaptá-la às suas necessidades. Você pode encontrar informações
adicionais ao longo desta documentação.

- Configure seus grupos necessários
- Ajuste os gatilhos conforme necessário
- Adicione filtros de postmaster, se necessário
- Configure SLAs, se necessário
- Adicione canais de email/redes sociais e assinaturas
- Volte às configurações de grupo para adicionar endereços de email de saída
- Adicione módulos de texto
- Adicione organizações
- Configure funções, se necessário
- Considere logins de terceiros ou integração LDAP para logins mais fáceis
- Adicione contas de agente
- Considere estratégias de backup para o Zammad

::: tip

**Ainda perdido?**

Se você precisar de ajuda ou precisar entrar em produção muito mais rápido, também pode
agendar workshops com um dos nossos
[consultores do Zammad](https://zammad.com/en/company/contact){target=_blank}.
:::
