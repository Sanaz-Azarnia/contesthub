# ContestHub 🏆

## 📌 About The Project
**ContestHub** is a high-performance, full-stack online quiz and contest platform designed to deliver a seamless testing and learning experience. Featuring timed quizzes, a competitive leaderboard, and a robust administrative dashboard, the platform is built to handle large-scale question banks while maintaining top-tier performance, security, and an intuitive user interface.

---
## 🧰 Tech Stack
Next.js · TypeScript · Tailwind CSS · ASP.NET Core · PostgreSQL · Docker · GitHub Actions · Nginx · Linux (VPS) · Unit Testing

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Dual Authentication:** Supports standard email/password registration and **Google OAuth**.
- **Robust Security:** Implements **JWT** for secure session management, **BCrypt** for strong password hashing, and **Rate Throttling** to prevent brute-force attacks and API abuse.

### 👤 User Experience
- **User Dashboard:** A personalized space to track statistics, review past attempts, and monitor growth.
- **Timed Quizzes:** Participate in engaging quizzes with strict countdown timers.
- **Instant Grading:** View your final score and detailed results immediately after completing a quiz.
- **Global Leaderboard:** Compete with others and climb the ranks based on accumulated points.
- **Offline Progress:** Quiz progress is actively saved in **Local Storage**, ensuring users never lose their place during unexpected disconnections.
- **Smooth UX:** Implements **Skeleton Loading** states and seamless **Pagination** for large datasets.

### 🛡️ Admin Panel
- **User Management:** Full CRUD capabilities (Create, Read, Update, Delete) to manage user accounts efficiently.
- **Question Management:** Add, modify, or remove questions from a massive database.
- **Quiz Builder:** Easily create, configure, and launch new quizzes by selecting specific questions from the question bank.

---

## ⚡ Performance & Optimizations
To ensure the best possible experience, ContestHub is heavily optimized at both the frontend and backend levels:
- **Next.js Features:** Utilizes **Static Generation (SSG)**, **Dynamic Imports**, and built-in **Image Optimization** for blazing-fast load times.
- **API Optimizations:** Advanced backend caching strategies to minimize database load and drastically reduce API latency.
- **Code Splitting:** Dynamic imports ensure users only download the code they need for their current view.

---

## 🗄️ Database
- **Engine:** PostgreSQL
- **Content Scale:** Pre-populated with an extensive repository of **3,997 questions** ready for immediate use.

---

 ## 🚀 Deployment & DevOps
This project follows modern DevOps practices with fully automated, production-ready deployment pipelines:
- **Unit Testing:** Comprehensive unit tests are executed automatically in the CI pipeline to ensure code reliability and prevent regressions.
- **CI/CD with GitHub Actions:** Automated workflows handle testing, building, and deployment on every push.
- **Containerization:** The entire application stack is containerized using Docker for consistent environments across development and production.
- **Reverse Proxy:** Nginx serves as the reverse proxy in front of the application containers, handling SSL termination, load balancing, and secure routing.
- **Hosting:** Deployed and managed on a Linux VPS for high availability, scalability, and optimal performance.
- **Transparent Build History:** All build logs, Docker image creation processes, and deployment statuses are available in the **Actions tab** of this repository.

---

## 📬 Contact
Feel free to reach out for collaborations, inquiries, or opportunities:
- **Email:** [sanazazarnia99@gmail.com]
- **Website:** [https://sanazazarnia.com]

---

 ## ⚖️ License

**Source-Available — All Rights Reserved**

The source code is publicly viewable for portfolio and review purposes only. 
You are not granted any rights to copy, modify, distribute, sublicense, or use 
this software for any purpose, commercial or private, without written permission.

---
<p align="center">Built by Sanaz Azarnia(https://github.com/Sanaz-Azarnia) with Next.js, .NET Core, and PostgreSQL.
Containerized with Docker and deployed to a VPS using a GitHub Actions CI/CD pipeline.</p>
