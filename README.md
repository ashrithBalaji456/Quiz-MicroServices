# Quiz Microservices Application

A **Microservices-based Quiz Application** built to demonstrate **backend-focused system design**, service-to-service communication, and real-world microservices architecture using **Spring Boot and Spring Cloud**. The frontend is intentionally kept minimal to highlight backend workflows.

---

## 🚀 Project Overview

This project is designed to simulate how production-grade microservices interact in a distributed system. Each service is independently deployable and communicates via REST APIs.

**Core Objective:**

* Build scalable, loosely coupled backend services
* Understand service discovery, routing, and microservices orchestration

---

## 🧩 Microservices Architecture

* **Eureka Server** – Service registry for dynamic service discovery
* **API Gateway** – Central entry point for routing client requests
* **Quiz Service** – Handles quiz creation and orchestration
* **Question Service** – Manages question CRUD operations
* **Frontend (React + Vite)** – Simple UI to interact with backend APIs

---

## 🛠 Tech Stack

**Backend**

* Java
* Spring Boot
* Spring Cloud (Eureka, API Gateway)
* REST APIs

**Frontend**

* React
* Vite

**Tools**

* Maven
* Git & GitHub

---

## 🔑 Key Features

* Loosely coupled microservices architecture
* Service discovery using Eureka Server
* Centralized routing with API Gateway
* REST-based inter-service communication
* Clean separation of responsibilities

---

## 📂 Project Structure

```
Quiz-MicroServices
│
├── api-gateway
├── eureka-server
├── quiz-service
├── question-service
├── frontend
└── README.md
```

---

## ▶️ How to Run the Project

1. Clone the repository

   ```bash
   git clone https://github.com/ashrithBalaji456/Quiz-MicroServices.git
   ```

2. Start **Eureka Server**

3. Start **API Gateway**

4. Start **Quiz Service** and **Question Service**

5. Run the frontend

   ```bash
   npm install
   npm run dev
   ```

---

## 🧠 What I Learned

* Designing backend systems using microservices
* Service discovery and centralized routing
* Structuring real-world Spring Boot applications
* Handling communication between distributed services

---

## 📌 Future Enhancements

* Authentication & Authorization (JWT)
* Docker & Docker Compose support
* Centralized configuration (Spring Cloud Config)
* Resilience patterns (Circuit Breaker)

---

## 👤 Author

**Ashrith Balaji Gudla**
Aspiring Backend / Java / Microservices Developer

🔗 GitHub: [https://github.com/ashrithBalaji456](https://github.com/ashrithBalaji456)
🔗 LinkedIn: [https://www.linkedin.com/in/ashrith-balaji-gudla-5768302a8](https://www.linkedin.com/in/ashrith-balaji-gudla-5768302a8)

---

⭐ If you find this project useful, feel free to star the repository!
