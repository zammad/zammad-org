---
order: 6
title: 'Configure database server'
---

# Configure database server

Esta página deve apenas esclarecer as partes relevantes para o Zammad e não
pretende ser um guia completo. Ela só é relevante para você se estiver
executando um servidor PostgreSQL existente e quiser executar o banco de
dados do Zammad ali também.

::: warning
Se você usa um software de pooling de conexão de banco de dados como o PgBouncer, certifique-se de usar um modo de pooling totalmente
compatível com o PostgreSQL. Normalmente, isso é chamado de "session connection pooling". O pooling de conexão baseado em transação
não é suportado e pode levar a erros durante as migrações de banco de dados.
:::

Abaixo você encontra os locais dos arquivos de configuração relevantes do
PostgreSQL a ajustar. Tenha em mente que as versões podem diferir do seu
ambiente - adapte onde for necessário.

::: tabs

=== Debian & Ubuntu

```ansi
/etc/postgresql/{sua versão}/main/postgresql.conf
```

=== CentOS & OpenSUSE

```ansi
/var/lib/pgsql/data/postgresql.conf
```

=== Outros

Não consegue encontrar seus arquivos de configuração? Você pode executar o seguinte comando para obter o caminho:

``` sh
sudo -u postgres psql -c 'SHOW config_file'
```

:::

## Adjust pool size

Dentro de `database.yml` (diretório `config/`), você pode definir o tamanho
do pool permitido. Por padrão, cada processo do Zammad usa até `50` conexões
(`pool: 50`).

Isso deve ser bastante suficiente para _todos_ os casos de uso. Se você
tiver tempos limite de conexão de banco de dados ou erros de pool
semelhantes, isso geralmente indica outros problemas relevantes para o seu
PostgreSQL.

## Ajustar `max_connections` (obrigatório)

O Zammad usa até 200 conexões por padrão. Dependendo da sua configuração e
carga, você pode querer alterar esse valor.

### Determine value

Para ajudá-lo a determinar um número, o Zammad vem com uma função para
calcular uma sugestão. Se executada, ela pede que você informe alguns
valores inteiros e também usa valores conhecidos internamente para o
cálculo. Esteja ciente de que a sugestão é específica da instância. Isso
significa que você deve executar o cálculo no sistema no qual deseja ajustar
o valor `max_connection`.

Execute-o usando o comando:

``` sh
rake zammad:db:max_connections
```

### Adjust value

Aumentar o número máximo de conexões permitidas:

``` sh
sed -i "/max_connections/c\max_connections = 2000" <postgresql-configuration-file>
```

Aplique as alterações reiniciando o PostgreSQL e o Zammad (nesta ordem):

```sh
sudo systemctl restart postgresql zammad
```

## Ajustar o PostgreSQL para instâncias maiores (opcional)

::: warning
Verifique as configurações abaixo primeiro e garanta que seu sistema seja capaz de atender aos requisitos! As configurações abaixo são o que consideramos
útil; qualquer outra coisa está fora do escopo desta documentação!
:::

Algumas melhorias de cache:

``` sh
sed -i "/shared_buffers/c\shared_buffers = 2GB" <postgresql-configuration-file>
```

```sh
sed -i "/temp_buffers/c\temp_buffers = 256MB" <postgresql-configuration-file>
```

```sh
sed -i "/work_mem/c\work_mem = 10MB" <postgresql-configuration-file>
```

```sh
sed -i "/max_stack_depth/c\max_stack_depth = 5MB" <postgresql-configuration-file>
```

Aplique as alterações reiniciando o PostgreSQL e o Zammad (nesta ordem):

```sh
sudo systemctl restart postgresql zammad
```
