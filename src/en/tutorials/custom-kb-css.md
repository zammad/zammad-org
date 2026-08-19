---
order: 15
title: Custom knowledge base CSS
---

# Custom knowledge base CSS

You can apply visual changes to your public knowledge base via custom CSS.
To do so, follow these steps:

1. Add your CSS file(s) inside the directory
   `app/assets/stylesheets/custom_knowledge_base_public` of your Zammad
   installation. You can use one or more files and choose any name,
   as long as they have a `.css` extension.
2. Precompile the assets by using the command `rake assets:precompile`
   (depends on your installation method, see the
   [Rails commands](/en/reference/rails-commands) reference).
3. Restart Zammad.
4. Access your published knowledge base. Please note: the visual changes
   only affect the published version and not the edit screen.
