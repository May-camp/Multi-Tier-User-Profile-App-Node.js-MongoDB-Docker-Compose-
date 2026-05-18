# Multi-Tier User Profile App (Node.js + MongoDB + Docker Compose)

This is a full-stack, multi-tier web application designed to demonstrate containerized environments, microservices networking, and persistent NoSQL database integration. The application features a dynamic frontend user profile setup page, a Node.js/Express backend server, and a containerized MongoDB infrastructure orchestrated smoothly via Docker Compose.

---

## 🏗️ Architecture Overview

To enforce security best practices (similar to AWS VPC Subnetting), this architecture is split into two completely isolated virtual bridge networks:

1. **`frontend-net` (Network A):** Connects the Node.js Web Application and the MongoDB Database.
2. **`admin-net` (Network B):** Connects the Mongo Express Web UI and the MongoDB Database.

> **Security Result:** The Node.js application container cannot see or scan the Mongo Express container, minimizing the internal blast radius in case of a breach.

---

## 🛠️ Tech Stack & Tools

* **Environment:** WSL2 (Ubuntu Linux)
* **Containerization:** Docker & Docker Compose V2
* **Database & UI:** MongoDB & Mongo Express
* **Application Backend:** Node.js, Express, Mongoose

---

## 📂 Project Structure

<img width="1226" height="864" alt="Multi tier pf app with seperate network" src="https://github.com/user-attachments/assets/5bb6ce8a-3b7f-4c52-a47f-44d646d551ec" />

```text
├── server.js          # Node.js backend logic & DB pool connection
├── index.html         # Frontend user profile interface
├── package.json       # App dependencies
├── mongo.yaml         # Optimized Docker Compose infrastructure file
└── README.md          # Project documentation
⚙️ Infrastructe

# Force stop and clean up stale configurations
docker compose -f mongo.yaml down --volumes --remove-orphans
docker system prune -a --volumes -f

# Spin up the infrastructure in detached mode
docker compose -f mongo.yaml up -d
