---
order: 15
title: 'CSS personalizado da base de conhecimento'
---

# CSS personalizado da base de conhecimento

Você pode aplicar alterações visuais à sua base de conhecimento pública por
meio de CSS personalizado. Para isso, siga estas etapas:

1. Adicione seu(s) arquivo(s) CSS dentro do diretório
   `app/assets/stylesheets/custom_knowledge_base_public` da sua instalação
   do Zammad. Você pode usar um ou mais arquivos e escolher qualquer nome,
   desde que tenham a extensão `.css`.
2. Precompile os assets usando o comando `rake assets:precompile` (depende
   do seu método de instalação, veja a referência de [comandos
   Rails](/en/reference/rails-commands)).
3. Reinicie o Zammad.
4. Acesse sua base de conhecimento publicada. Observação: as alterações
   visuais afetam apenas a versão publicada, não a tela de edição.
