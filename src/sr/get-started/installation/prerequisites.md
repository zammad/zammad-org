---
order: 1
title: Предуслови
---

# Предуслови

<!--@include: @/sr/modules/zammad-services-hint.md-->

## Серверски хардвер

Хардверски предуслови зависе од сценарија. Ово отежава специфичне предлоге
за CPU и радну меморију који су прилагођени свим ситуацијама. У сваком
случају, јачи и бољи хардвер ће осигурати да Zammad ради глатко и да су
паузе у доступности током ажурирања верзија најкраће могуће.

Као апсолутни минимум за основну употребу са PostgreSQL сервером,
предлажемо:

- 2 CPU језгра
- 6 GB RAM (+4 GB за Elasticsearch)

За пример сценарија са максимално 40 оператера, добра почетна тачка је:

- 6 CPU језгара
- 6 GB RAM (+6 GB за Elasticsearch)

## Серверски софтвер

На основу типа инсталације, постоје неки предуслови. Укључени су у упутства
за инсталацију:

- [Пакет](package)
- [Docker](docker)
- [Kubernetes](kubernetes)

## Предуслови клијента

Because Zammad is a web application, only an up-to-date browser is
needed. The following browsers are supported in their latest stable version:

- Firefox
- Chrome (and Chromium-based)
- Opera
- Safari

This does not mean that Zammad will not work with other browsers or older
versions, just that we do not test against or provide support for them.

Комуникација између клијента и сервера је заснована на web sockets. Неки
firewall системи филтрирају ове конекције. Ово може довести то смањених
перформанси претраживача.
