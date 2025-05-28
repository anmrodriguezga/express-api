# Node Microservices Project

This project is a Node.js-based microservices architecture utilizing Redis for caching, a relational database for persistent storage, and is designed for deployment on Azure resources. It also includes support for [Dev Containers](https://containers.dev/) to streamline development environments.

## Features

- **Microservices Architecture**: Modular and scalable Node.js services.
- **Redis Integration**: Fast in-memory caching for improved performance.
- **Relational Database**: Persistent data storage (e.g., PostgreSQL, MySQL).
- **Azure Deployment**: Ready for deployment using Azure App Service, Azure Database, and Azure Cache for Redis.
- **Dev Containers**: Consistent development environments using Visual Studio Code Dev Containers.

## Prerequisites

- Node.js (v16+)
- Docker (required for Dev Containers and optional for local development)
- Azure CLI (for deployment)
- Redis server
- Relational database server (PostgreSQL/MySQL)

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/node-microservices.git
    cd node-microservices
    ```

2. **Open in Dev Container (Recommended):**
    - Install [VS Code](https://code.visualstudio.com/) and the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
    - Open the project folder in VS Code and select **"Reopen in Container"** when prompted.

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Configure environment variables:**
    - Copy `.env.example` to `.env` and update with your Redis and database credentials.

5. **Run services locally:**
    ```bash
    npm run dev
    ```

## Deployment on Azure

1. **Provision Azure Resources:**
    - Azure App Service for each microservice
    - Azure Database for PostgreSQL/MySQL
    - Azure Cache for Redis

2. **Configure environment variables in Azure Portal.**

3. **Deploy using Azure CLI:**
    ```bash
    az webapp up --name <app-name> --resource-group <resource-group>
    ```

## Folder Structure

```
/services         # Individual microservices
/common           # Shared utilities and modules
/config           # Configuration files
/.devcontainer    # Dev Container configuration
```

## License

MIT
