---
order: 8
title: 'Docker file handling examples'
---

# Docker file handling examples

Se você não tem certeza de como lidar com os arquivos de backup e como criar
o diretório `restore` no volume Docker, você pode encontrar alguns exemplos
abaixo.

## Restore inside the same stack

**Requer:** acesso ao console do container zammad-backup.

Se você quiser restaurar um backup da mesma stack, basta criar o diretório e
copiar/mover os arquivos para ele. O exemplo a seguir inicia o container
**zammad-backup** e copia _todos_ os arquivos .gz do diretório de backup
para o diretório de restauração:

``` sh
docker compose run --rm zammad-backup bash -c "mkdir /var/tmp/zammad/restore; cp /var/tmp/zammad/*.gz /var/tmp/zammad/restore -v"
```

Agora inicie a stack para executar o processo de restauração.

## Restore from another installation

**Requer:** acesso ao console do sistema hospedeiro e ao container zammad-backup.

Para **obter** seus arquivos de backup de outra implantação Docker Compose,
uma forma é copiá-los para o sistema hospedeiro com `docker compose cp`:

``` sh
docker compose cp zammad-backup:/var/tmp/zammad/ /path/to/your/host/directory/
```

Caso você esteja procurando seus arquivos de backup de uma instalação via
pacote, dê uma olhada na seção [Backup e restauração
(Pacote)](/pt_BR/tutorials/backup-restore). Você não precisa de um dump
completo para restaurar seu backup.

Para **restaurar** o backup, coloque seus arquivos em uma pasta chamada
`restore` no sistema hospedeiro. Essa pasta é montada temporariamente em
`/restore` no container de backup. O diretório então é copiado para o
diretório real:

``` sh
docker compose run --rm -v /path/to/your/host/directory:/restore zammad-backup bash -c "cp -rv /restore /var/tmp/zammad/"
```

Agora inicie a stack para executar o processo de restauração.

## Use a web GUI

**Requer:** acesso ao console do sistema hospedeiro, ou acesso ao Portainer com permissão para implantar um container.

Isso pode ser útil se você usa o Portainer para implantar o Zammad e tem
acesso limitado ao sistema hospedeiro.

Nosso exemplo usa a ferramenta
[filebrowser](https://filebrowser.org/){target=_blank}, mas qualquer
ferramenta semelhante deve funcionar também. Se você quiser usar essa
ferramenta permanentemente, certifique-se de fornecer volumes adicionais
para persistência (por exemplo, para o banco de dados dela).

::: info

As etapas abaixo cobrem o processo de restauração enviando arquivos. Para obter seus arquivos de backup da mesma forma de outra
stack, você pode seguir as etapas 1-4 abaixo e simplesmente mapear o volume **zammad-backup** da sua stack _antiga_. Depois você pode
baixar os arquivos, parar e remover o container filebrowser e reimplantá-lo, seguindo as etapas abaixo.

:::

1. Implantar o filebrowser

   ::: tabs

   === Via console

   Implante o container e forneça o volume de **zammad-backup** e
   uma porta sob a qual você quer acessar a interface web:

   ``` sh
   docker run -v zammad-docker-compose_zammad-backup:/srv -p 8089:80 filebrowser/filebrowser
   ```

   === Via Portainer

   Na sua interface web do Portainer, vá até **Containers** no menu esquerdo e
   clique no botão `Add container`.

   Adicione as seguintes informações:

   - Name: informe um nome que ainda não esteja em uso.
   - Image: `filebrowser/filebrowser`
   - Map additional port: escolha uma porta e mapeie-a para a porta `80` no container.
   - Advanced container settings:
     - Mude para **Volumes** e clique no botão `map additional volume`.
     - Informe `/srv` na seção do container e selecione o volume contendo `zammad-backup`
   - Por fim, clique em **Deploy the container**.

   :::

2. Depois que o container for iniciado, acesse a interface web usando o
   endereço IP e a porta que você definiu.
3. Faça login com as credenciais padrão `admin`/`admin`.
4. Agora você deve ver pelo menos 2 arquivos .gz, incluindo um carimbo de
   data/hora.
5. Crie uma `New folder` usando o botão no lado esquerdo. Nomeie-a como
   **restore**.
6. Entre nessa pasta e envie seus arquivos de backup (no canto superior
   direito, com a seta para cima). Se o envio falhar, pode ser necessário
   alterar as permissões dos arquivos (por exemplo, legível para todos).

Agora inicie a stack para executar o processo de restauração. Depois disso,
você pode excluir com segurança a pasta renomeada e parar o filebrowser.
