# CloudOps Platform

CloudOps Platform is a **production-grade DevOps and Cloud Engineering project** that demonstrates how modern applications are built, containerized, deployed, and operated using **AWS, Docker, Kubernetes, Terraform, CI/CD, and observability tools**.

This project is **infrastructure-first**, focusing on reliability, scalability, automation, and operational visibility rather than application-level complexity.

---

## 🎯 Project Objectives

- Demonstrate real-world **DevOps workflows**
- Build a **3-tier cloud-native application**
- Apply **containerization and orchestration best practices**
- Implement **CI/CD pipelines using GitHub Actions**
- Provision infrastructure using **Terraform**
- Enable **monitoring and observability**
- Follow **production-grade security and environment handling**

---

## 🧱 High-Level Architecture
```yaml
Browser
↓
NGINX (Frontend)
↓
Next.js Application
↓
NestJS Backend API
↓
MongoDB (Stateful Service)
```

### Architectural Principles
- Stateless frontend and backend services
- Stateful database with persistent storage
- Environment-agnostic Docker images
- Runtime configuration via environment variables
- Kubernetes-ready service networking

---

## 🛠 Technology Stack

### Application
- Frontend: **Next.js**
- Backend: **NestJS**
- Database: **MongoDB**

### DevOps & Cloud
- Docker (multi-stage builds)
- Docker Compose (local production simulation)
- NGINX (reverse proxy)
- Kubernetes (EKS-ready architecture)
- Terraform (Infrastructure as Code)
- GitHub Actions (CI/CD)
- AWS (ECR, EC2, EKS, IAM, VPC)
- Prometheus & Grafana (Monitoring & Observability)

---

## 📦 Backend Services

- The backend is a **single NestJS application** with logical service separation.

### Core Service
- Infrastructure health and readiness endpoints:
```path
GET /core/health

GET /core/ready

GET /core/db-status
```

Used for:
- Load balancers
- Kubernetes liveness/readiness probes
- Operational health checks

---

### Users Service
Simulates application traffic and database interaction:
```path
GET /api/v1/users

POST /api/v1/users

PUT /api/v1/users/:id

DELETE /api/v1/users/:id
```

Used for:
- CI/CD validation
- Scaling tests
- Database connectivity verification

---

### Ops Service
Runtime and build metadata exposure:

GET /ops/info

yaml
Copy code

Used for:
- Deployment verification
- Rollback validation
- Environment visibility

---

## 🖥 Frontend (Ops Dashboard)

The frontend acts as an **internal operations dashboard**.

### Features
- Backend health status
- Database connection status
- Users CRUD operations
- Application metadata (on-demand)

### Design Philosophy
- Clean, centered layout
- Tailwind CSS (utility-first)
- No routing complexity
- No UI overengineering

---

## 🐳 Containerization Strategy

### Docker
- Multi-stage builds for optimized image size
- Non-root containers for security
- Immutable images
- No secrets baked into images

### Docker Compose
Used to simulate a **production-like environment locally**:

```bash
docker compose up --build
```
### Includes:

- service-to-service DNS networking

- Stateful MongoDB with persistent volumes

- Runtime environment variable injection
---
## ☁️ Cloud Infrastructure (AWS)
AWS Services
- ECR – Docker image registry

- EC2 – Initial compute runtime

- EKS – Kubernetes orchestration

- IAM – Least-privilege access control

- VPC – Network isolation
---
## 🏗 Infrastructure as Code (Terraform)
All cloud infrastructure is provisioned using Terraform.

### Managed Resources

- VPC (public/private subnets)

- Internet & NAT Gateways

- Security Groups

- IAM roles and policies

- ECR repositories

- EKS cluster and node groups

### Benefits
- Reproducible infrastructure

- Version-controlled cloud resources

- Auditable and predictable deployments
---
## 🔄 CI/CD Pipeline (GitHub Actions)
### Pipeline Responsibilities
- Trigger on push to main

- Build Docker images

- Tag images with commit SHA

- Push images to AWS ECR

- Prepare artifacts for deployment

### CI/CD Principles
- Immutable builds

- No secrets in source code

- Environment-specific configuration

- Fast and repeatable deployments
---
## 📈 Monitoring & Observability
### Tools
- Prometheus – Metrics collection

- Grafana – Dashboards and visualization

### Observability Focus
- Application health

- Resource utilization

- Service availability

- Operational visibility
---
## 🔐 Environment & Security
- .env files are never committed

- Runtime configuration via:

- Docker environment variables

- Kubernetes ConfigMaps & Secrets

- No hardcoded credentials

- IAM roles follow least privilege
---
## ▶️ Local Development (Production-Like)
### Prerequisites
- Docker

- Docker Compose

### Start the system
```bash

docker compose up
```
### Access
- Frontend: http://localhost:3000

- Backend health: http://localhost:3001/core/health
---
## 🚀 Roadmap
- GitHub Actions CI/CD completion

- AWS ECR image publishing

- EC2 deployment using Docker

- Kubernetes (EKS) deployment

- Terraform-managed infrastructure

- Prometheus & Grafana integration
---
## 👤 Author
** Omkar Ryakawar **
- Focused on AWS DevOps, Cloud Infrastructure, CI/CD, and Production Systems
---
##  Why This Project Matters
### This project demonstrates:

- Production mindset

- Cloud-native architecture

- Infrastructure ownership

- Automation-first thinking

- DevOps and SRE best practices

This is not a CRUD demo, but a ** cloud operations platform **.