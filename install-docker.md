# Zammad Installation

> Documentation and setup instructions for Zammad.

I want you to install Zammad for me. Execute all the steps below autonomously.

OBJECTIVE: Install Zammad.

DONE WHEN: Zammad is running and accessible via web browser under hostname or IP address.

## Prerequisites

- Docker Engine installed and usable via `docker`.
- Docker Compose plugin (`docker compose`).
- `Git` installed.
- At least 4 GB of RAM.

## High-Level Steps

1. Clone Zammad's Docker Compose Repository.
2. Run Zammad by pulling images and starting the containers.
3. Check if the installation was successful.

## Agentic Guidance

- Present a concrete step plan, required privileges, and a rollback plan; request confirmation before applying changes.
- After each major step, verify outcome and report success/failure.

## TODO

### Clone Repository

Clone Zammad's Docker Compose repository to a fitting place on your machine:
  
```sh
git clone https://github.com/zammad/zammad-docker-compose.git
```

### Switch the Working Directory

Change current working directory and go to the created folder called `zammad-docker-compose`:

```sh
cd zammad-docker-compose
```

### Increase Elasticsearch Memory Limit

On Linux machines, you have to increase the memory limit by executing:

```sh
sudo sysctl -w vm.max_map_count=262144
```

### Pull and Start the Containers

```sh
docker compose up -d
```

### Verify Zammad Is Running

- Wait until the containers are started and the `zammad-init` container is stopped again.
- Open `localhost:8080` and make sure you can see Zammad's setup screen.

EXECUTE NOW: Complete the above TODO list to achieve a successful installation of Zammad.
