# Architecture Overview

This project utilizes a Micro-Frontend (MFE) architecture powered by **Vite** and the **Module Federation** plugin. The ecosystem consists of a central **host** application that orchestrates several **remote** modules and independent applications.

## Tech Stack & Component Roles

The architecture is divided into the following entities:

- **host** (Vue 3): The main entry point and container that orchestrates the layout and mounting of remotes.
- **ui-lib** (Vue 3): A shared component library providing reusable UI elements across the micro-frontends.
- **nav-panel** (Vue 3): A navigation component. Unlike other apps, it is tightly coupled with the **host** and uses the **host's Router instance** for seamless navigation.
- **app-vue3** (Vue 3): An isolated micro-application running its own Vue instance and **independent router**.
- **app-vue2** (Vue 2): A legacy-compatible micro-application running on Vue 2 with an **independent router**.
- **app-react** (React): A cross-framework micro-application running on React with an **independent router**.

Common libraries like **vue**, **vue-router** are shared to avoid loading multiple instances, reducing the overall bundle size.

## 🚀 Development & Preview

To simplify the startup of multiple services, use the following automation scripts:

### 🛠 Development Mode

Starts all remotes in `watch` mode and the host in `dev` mode. Use this for active coding:
```bash
./run-dev.sh
```

### 🏗 Preview Mode

Performs a production build of all micro-frontends and serves them via local preview servers.
This is the best way to test the final bundles and integration before deployment.

```bash
./run-preview.sh
```

### 📋 Prerequisites

1. **Permissions**: Ensure the scripts are executable:

```bash
chmod +x run-dev.sh run-preview.sh
```

2. **Package Manager**: These scripts require **pnpm** to manage the monorepo workspace.
3. **Environment**: A Bash-compatible terminal (Linux, macOS, or Git Bash/WSL on Windows).