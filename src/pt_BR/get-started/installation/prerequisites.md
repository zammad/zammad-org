---
order: 1
title: Pré-requisitos
---

# Pré-requisitos

<!--@include: @/en/modules/zammad-services-hint.md-->

## Server hardware

Os requisitos de hardware variam dependendo do cenário. Isso torna difícil
apresentar números específicos de CPU e memória que se encaixem em todos os
casos de uso. Em qualquer caso, mais e melhor hardware garante que o Zammad
funcione sem problemas, e as janelas de manutenção para atualizações também
devem ser mais curtas.

Como mínimo absoluto para uso básico com um servidor PostgreSQL,
consideramos:

- 2 núcleos de CPU
- 6 GB de RAM (+4 GB para o Elasticsearch)

Para um cenário de exemplo com até 40 agentes, um bom ponto de partida
poderia ser:

- 6 núcleos de CPU
- 6 GB de RAM (+6 GB para o Elasticsearch)

## Server software

Dependendo do tipo de instalação, há alguns pré-requisitos. Eles estão
incluídos nas instruções de instalação:

- [Pacote](package)
- [Docker](docker)
- [Kubernetes](kubernetes)

## Client requirements

### Navegador

Como o Zammad é uma aplicação web, basta ter um navegador atualizado. Os
seguintes navegadores são suportados em sua versão estável mais recente:

- Firefox
- Chrome (e baseados em Chromium)
- Opera
- Safari

Isso não significa que o Zammad não funcionará com outros navegadores ou
versões mais antigas, apenas que não testamos ou fornecemos suporte para
eles.

### Rede

Esteja ciente de que a comunicação entre cliente e servidor usa
WebSockets. Alguns firewalls e proxies podem filtrar essas conexões. Isso
pode reduzir o desempenho ou impedir atualizações em tempo real.

### Tela

O Zammad adapta seu layout a diferentes tamanhos de tela. Para a melhor
experiência, recomendamos usar uma tela com tamanho e resolução
suficientes. Ao usar telas pequenas, o Zammad recolhe elementos como a barra
lateral para manter a usabilidade. Se essas medidas não forem suficientes,
um aviso toast aparece no topo da tela. Você pode ocultá-lo clicando no
botão correspondente.

A interface desktop padrão é destinada a telas com pelo menos 640 px de
largura. Em telas mais estreitas, use a [visualização
mobile](/pt_BR/documentation/use/guides/mobile-view).
