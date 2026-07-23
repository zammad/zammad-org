---
order: 3
title: 'Email seguro'
---

# Email seguro

O Zammad oferece suporte a dois sistemas para comunicação segura por email:

- **PGP** (Pretty Good Privacy)
- **S/MIME** (Secure/Multipurpose Internet Mail Extensions)

Ambos os sistemas permitem que você troque mensagens **assinadas** e
**criptografadas** com outras pessoas.

## Pré-requisitos

- Ambos os recursos são opcionais. Se você não vir os botões `Encrypt` e
  `Sign` no editor de artigo de email, seu administrador ainda não os
  ativou.
- PGP e S/MIME só funcionam se a outra parte também os estiver usando.
- Seu administrador é responsável por adicionar todos os certificados e
  chaves necessários nas configurações de administração do Zammad.

Se esses requisitos forem atendidos, o recurso deve funcionar imediatamente,
e o Zammad criptografa, descriptografa, assina e verifica assinaturas de
emails quando possível. Seu administrador pode definir um comportamento
padrão para cada grupo. No entanto, você pode substituir o padrão para cada
artigo de email de saída por conta própria, ativando ou desativando a
criptografia e a assinatura (veja o exemplo na captura de tela abaixo, com
criptografia desativada e assinatura ativada). Continue lendo para saber
mais sobre isso e encontrar erros comuns.

![Captura de tela mostrando email de saída que é apenas assinado e não
criptografado](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-signing-only.png)

## Assinatura e criptografia

Signing
: assinar é uma prova de que uma mensagem não foi manipulada em seu caminho. Garante a **integridade** e a
  **autenticidade** da mensagem.

Encryption
: a criptografia embaralha uma mensagem para que ela só possa ser desembaralhada pelo destinatário pretendido. Garante a
  **privacidade** e a **segurança dos dados** da mensagem.

## Email de entrada

Os ícones de cadeado e verificação no topo de uma mensagem indicam seu
estado de criptografia e assinatura. Clique em um artigo de email recebido
para expandir seus detalhes. Nos detalhes, você pode passar o mouse sobre o
status de segurança para ver mais informações.

![Captura de tela mostrando ícones de status Criptografado e Assinado em um
artigo de email
recebido](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-incoming-article.png)

### Ícones de status para emails recebidos

| Icon | Meaning |
|---|---|
| ![Ícone criptografado](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-encrypted.png) | **Criptografado para você.** Mesmo se interceptado por terceiros, eles não conseguirão lê-lo. |
| ![Ícone não criptografado](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-not-encrypted.png) | **Não pode ser descriptografado.** O Zammad não tem a chave necessária para descriptografar esta mensagem. |
| ![Ícone assinado](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-signed.png) | **Verificado com sucesso.** Você pode ter confiança de que é autêntico e o conteúdo não foi modificado. |
| ![Ícone não assinado](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-not-signed.png) | **Falha na verificação da assinatura.** Passe o mouse sobre o ícone para mais informações. |

## Email de saída

Use os botões `Encrypt` e `Sign` para ativar a criptografia e a assinatura
para emails de saída. Eles estão disponíveis para novos tickets e
respostas. Passe o mouse sobre os botões para ver detalhes.

![Captura de tela mostrando os botões de alternância Encrypt e Sign no
editor de resposta de
email](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-outgoing-article.png)

::: info
Emails de saída só podem ser criptografados para um único destinatário.
:::

### Ícones de status para emails de saída

| Icon | Meaning |
|---|---|
| ![Ícone criptografado](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-encrypted.png) | **Será criptografado.** Mesmo se interceptado por terceiros, eles não conseguirão lê-lo. |
| ![Ícone não criptografado](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-not-encrypted.png) | **Não será criptografado.** |
| ![Ícone assinado](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-signed.png) | **Será assinado.** Os destinatários podem verificar que veio de você e que o conteúdo não foi modificado. |
| ![Ícone não assinado](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-not-signed.png) | **Não será assinado.** |

## Solução de problemas

### Sign: não é possível encontrar o certificado para validação

![Captura de tela mostrando o banner de aviso de erro de segurança em um
artigo](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-error-banner.png)

Sem o certificado do remetente, o Zammad não pode verificar a assinatura da
mensagem. Peça ao seu administrador para adicionar o certificado do
remetente ao armazenamento de certificados do Zammad.

::: warning
Sempre verifique certificados pessoalmente ou por telefone! Todo o propósito da verificação de assinatura é alertá-lo quando
alguém está tentando se passar por outra pessoa. Nunca aceite um certificado de alguém online sem
verificá-lo primeiro.
:::

### Encryption: não é possível encontrar a chave privada para descriptografar

Esta mensagem foi criptografada com um certificado que não corresponde a
nenhum registrado. Sem uma chave privada correspondente, o Zammad não
consegue descriptografar a mensagem. Peça ao seu administrador para
verificar a chave privada da sua organização no armazenamento de
certificados do Zammad, e peça ao remetente para verificar novamente a chave
pública que usou para criptografar a mensagem.

### O botão `Encrypt` está desativado

Peça ao seu administrador para adicionar o certificado do destinatário ao
armazenamento de certificados do Zammad.

### O botão `Sign` está desativado

Peça ao seu administrador para verificar a chave privada da sua organização
no armazenamento de certificados do Zammad.

### Múltiplos tipos de segurança configurados

Você pode ver os botões `PGP` e `S/MIME` ao mesmo tempo. Isso acontece
quando ambos os sistemas estão configurados no seu sistema e um cliente
também está usando ambos. Nesse caso, você tem um botão adicional para
alternar entre os tipos de segurança PGP e S/MIME. Basta escolher um,
garantir que a criptografia e a assinatura estejam habilitadas, e enviar seu
email.
