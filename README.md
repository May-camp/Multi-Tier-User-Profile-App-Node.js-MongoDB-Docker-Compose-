# Multi-Tier User Profile App (Node.js + MongoDB + Docker Compose)

This is a full-stack, multi-tier web application designed to demonstrate containerized environments, microservices networking, and persistent NoSQL database integration. The application features a dynamic frontend user profile setup page, a Node.js/Express backend server, and a containerized MongoDB infrastructure orchestrated smoothly via Docker Compose.

---

## 🏗️ Architecture Overview

The project implements a modern **Three-Tier Microservices Architecture**:

1. **Presentation Tier (Frontend):** A responsive HTML5 interface styled with embedded CSS. It captures user inputs (Name and Email) and fires asynchronous HTTP POST requests using the native JavaScript `Fetch API`.
2. **Logic Tier (Backend):** A Node.js runtime environment utilizing Express.js. It listens on port `3000`, processes API endpoints, and manages database transactions through the native `mongodb` driver.
3. **Data Tier (Persistence):** A decoupled database management layer containing:
   * **MongoDB Container:** The standalone document database server tracking system collections and indexing structures.
   * **Mongo-Express Container:** A lightweight, web-based administrative GUI client used to review active database rows and collections in real time.

---

## 🛠️ Tech Stack & Components

* **Frontend:** HTML5, CSS3, JavaScript (Async/Await Fetch API)
* **Backend Framework:** Node.js, Express.js
* **Database Engine:** MongoDB
* **Database Management GUI:** Mongo-Express
* **Containerization & Orchestration:** Docker, Dockerfile, Docker Compose

---

## 📂 Project Directory Structure

```text
.
├── index.html          # Frontend User Interface & Form
├── server.js           # Node.js API Logic & MongoDB Connection
├── Dockerfile          # Node.js Application Container Blueprint
├── docker-compose.yml  # Multi-Container Microservices Orchestration Spec
├── package.json        # Node.js Dependencies & Metadata Manifest
└── README.md           # Project Documentation
🚀 Deployment & Installation GuidePrerequisitesMake sure your local host development machine has the following tools installed and running:Node.js (v20+)Docker Desktop (with WSL2 backend enabled for Windows hosts)Step 1: Clone and Review Connection ConfigurationsInside the backend logic (server.js), the application connects to the local database using secure connection handles. Verify that the local MongoDB URI and Database configurations match your infrastructure specs:JavaScriptconst mongoUrlLocal = "mongodb://admin:password@localhost:27017";
const dbName = "user_profile";
Step 2: Container Spec definition (Dockerfile)A lightweight multi-stage or standalone build script packaging the application bundle under a hardened node:20-alpine environment:DockerfileFROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "server.js"]
Step 3: Run the Multi-Tier Application via Docker ComposeInstead of manually initializing individual container abstractions, ports, networks, and environment tags, deploy the entire system blueprint configurations using the docker-compose.yml specs:Bashdocker compose up -d
VerificationTo confirm all individual services are up, responsive, and communicating via the virtualized network stack, execute:Bashdocker ps
🖥️ Interacting with the Application EndpointsOnce the infrastructure deployment achieves an active running state, access the decoupled platforms via your host browser endpoints:Application Layer ComponentsExternal Host Endpoint URLDefault Access CredentialsWeb Client Profile Apphttp://localhost:3000None (Public Access)Mongo-Express UI Clienthttp://localhost:8080Username: adminPassword: passwordHow to Test the Data Flow:Navigate to http://localhost:3000 inside your web browser.Fill out the input parameters inside the User Profile Setup box and select Save Profile.An alert confirmation mapping back response payloads indicates data pipeline transmission.Open the administrative wrapper at http://localhost:8080. Click into the user_profile database tab to inspect the runtime documents generated within the users collection in real-time!🛠️ Infrastructure Troubleshooting Reference1. Handling Bad Credentials or Residual MappingsIf database changes cause permission walls (Authentication failed), perform a thorough data prune to discard corrupt cache parameters:Bash# Bring down active compose profiles
docker compose down

# Force delete orphaned network/volume cache mappings
docker volume prune -f

<img width="1280" height="698" alt="web_app docker diagram" src="https://github.com/user-attachments/assets/4303f589-a32b-4e66-a2fc-2130aa9e73a1" />
