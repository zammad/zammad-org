---
order: 15
title: 'Benutzerdefiniertes CSS Knowledge Base'
---

# Benutzerdefiniertes CSS Knowledge Base

Sie können mithilfe von benutzerdefiniertem CSS optische Änderungen an Ihrer
öffentlichen Knowledge Base vornehmen. Befolgen Sie dazu die folgenden
Schritte:

1. Fügen Sie Ihre CSS-Datei(en) im Verzeichnis
   `app/assets/stylesheets/custom_knowledge_base_public` Ihrer
   Zammad-Installation hinzu. Sie können eine oder mehrere Dateien verwenden
   und einen beliebigen Namen wählen, solange die Dateien die Endung `.css`
   haben.
2. Kompilieren Sie die Assets mithilfe des Befehls `rake assets:precompile`
   (abhängig von Ihrer Installationsmethode, siehe die
   [Rails-Befehle](/de/reference/rails-commands)-Referenz).
3. Starten Sie Zammad neu.
4. Rufen Sie Ihre öffentliche Knowledge Base auf. Bitte beachten Sie: Die
   optischen Änderungen betreffen ausschließlich die öffentliche Version und
   nicht die Bearbeitungsansicht.
