---
order: 6
title: 'Backup e restauração (Docker)'
---

# Backup e restauração (Docker)

Esta seção mostra alguns fundamentos sobre o processo de backup e
restauração para uma implantação do Zammad baseada em Docker Compose.

Se você está familiarizado com procedimentos de backup e restauração
baseados em volume no Docker, e talvez já use um método ou ferramenta
diferente, pode continuar usando-o. Um backup normalmente significaria
desligar a stack para garantir que todos os arquivos em memória sejam
gravados no disco, depois fazer backup do conteúdo do volume, e então
iniciar a stack novamente. Ao usar esse método, você pode considerar usar o
[cenário disable-backup-service](/pt_BR/reference/docker-compose-scenarios)
para que o mecanismo integrado de backup e restauração do Zammad não seja
ativado.

O restante desta página descreve o mecanismo integrado de backup e
restauração da stack Docker Compose do Zammad.

Se você está familiarizado com o Docker, as seções abaixo incluem as
informações de que você precisa. A página [manuseio de arquivos no
Docker](/pt_BR/tutorials/docker-file-handling) cobre alguns exemplos sobre
como lidar com os arquivos de backup e copiá-los para um volume Docker para
restaurá-los.

## Backup

Por padrão, um backup é criado a cada início da stack, assim como às 3 horas
todas as noites. O backup é armazenado no volume do container
**zammad-backup**, em `/var/tmp/zammad`.

## Restauração

1. Inicie a nova stack pelo menos uma vez, para que um banco de dados do
   Zammad esteja disponível.
2. Pare a stack.
3. Caso você esteja restaurando para uma stack de produção com armazenamento
   em sistema de arquivos ativado, você deve limpar o conteúdo do diretório
   `/opt/zammad/storage/` dentro do volume. O processo de restauração só
   adiciona/sobrescreve arquivos lá; nenhuma limpeza acontecerá.
4. Copie ou mova os arquivos de backup para `/var/tmp/zammad/restore/`
   dentro do volume do container **zammad-backup**. Esteja ciente de que o
   processo de restauração sempre usa o backup mais recente, de acordo com o
   carimbo de data/hora do nome do arquivo. Apenas backups de instalações
   via pacote e Docker são suportados por esse método de backup
   integrado. Não forneça os arquivos `latest_zammad_*.gz`, pois eles
   apontam para um local desconhecido para o processo de restauração.
5. Inicie a stack. O processo de restauração é acionado no serviço
   `zammad-backup` se o diretório `restore` for detectado e os arquivos de
   backup estiverem no lugar. Como parte desse processo, o cache do Rails
   será limpo. Todos os outros containers aguardam o término da restauração
   antes de retomar suas operações normais.
6. Depois que o processo de restauração terminar, o diretório `restore` terá
   sido renomeado. Você pode excluí-lo com segurança agora.
7. Reconstrua o índice do Elasticsearch. Você pode usar o Zammad enquanto a
   reconstrução está em andamento, mas o desempenho da pesquisa fica
   degradado e alguns dados podem ficar temporariamente indisponíveis nos
   resultados de pesquisa.

<!--@include: ../get-started/update.md{243,276}-->
