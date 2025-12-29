Purple Merit Technologies – Backend Intern Assessment

## 🎥 Walkthrough Video (Assessment)
https://youtu.be/xuaUTce_ePU (Unlisted)


📌 Project Overview

This project is a full-stack User Management System built as part of the Backend Intern assessment for Purple Merit Technologies.

It includes:

Secure authentication using HTTP-only cookies

Role-based access control (Admin & User)

Admin user management

User profile management

Pagination, validations, and proper error handling

Dockerized setup

Cloud PostgreSQL (Neon) with Prisma ORM

🛠 Tech Stack

Backend-

Node.js

Express.js

PostgreSQL (Neon – Cloud Database)

Prisma ORM

JWT Authentication (HTTP-only cookies)

bcrypt

Docker

Frontend-

React (Vite)

Redux Toolkit

Axios

Tailwind CSS

React Router DOM

React Hot Toast

🔐 Authentication & Authorization

Authentication is implemented using JWT stored in HTTP-only cookies

Cookies are secured with proper CORS configuration

User session is restored on page reload via /auth/me

Role-based UI rendering using Redux state

Roles

USER – Default role after signup

ADMIN – Elevated privileges (user management)


🔒 Admin Role & Assessment Access

In a production environment, admin roles should never be assigned via frontend or public APIs.
Admin privileges must be granted directly at the database level to prevent privilege escalation.

However, since the evaluators do not have access to the database, a temporary admin account has been created only for assessment and testing purposes.

🧪 Admin Test Credentials (Assessment Only)
Email: admin@updated.com
Password: Admin@102030


⚠️ Note:

These credentials exist only for evaluation

In real-world deployment, this account creation would be removed

Admin role assignment would be restricted to DB-level access

🔒 Important Security Highlight (Admin Role)

Admin role is NOT assignable via frontend or public APIs.

✅ The ADMIN role must be manually assigned directly in the database.

Why?

Prevents privilege escalation

Ensures only trusted users gain admin access

Aligns with real-world security practices

Example (Prisma / SQL):

UPDATE "User"
SET role = 'ADMIN'
WHERE email = 'admin@test.com';


This design choice was made intentionally for security and best practices.

👤 User Features
User Authentication

Signup

Login

Logout

Persistent login on refresh

User Profile

View own profile

Update full name and email

Change password

View role and status

🛡 Admin Features

View all users in a paginated table

Columns:

Email

Full Name

Role

Status

Activate / Deactivate users

Confirmation dialogs before actions

Success and error notifications

Admin-only access (UI + backend enforced)

📄 API Overview

Auth Routes-
Method	Endpoint	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login user
POST	/api/auth/logout	Logout
GET	/api/auth/me	Get logged-in user

User Routes-
Method	Endpoint	Description
GET	/api/users/profile	View profile
PUT	/api/users/profile	Update profile
PUT	/api/users/change-password	Change password

Admin Routes-
Method	Endpoint	Description
GET	/api/admin/users?page=1	Get users (paginated)
PATCH	/api/admin/users/:id/status	Activate/Deactivate user

📦 Pagination Details

Server-side pagination

10 users per page

API response includes:

{
  "users": [],
  "total": 0,
  "totalPages": 1,
  "currentPage": 1
}

🐳 Docker Setup
Services

Backend (Node + Express + Prisma)

Frontend (React + Vite)

PostgreSQL handled via Neon Cloud DB

Run Application
docker compose up --build

Backend .env
PORT
DATABASE_URL
JWT_SECRET

Frontend .env
VITE_API_URL


🌐 CORS & Cookie Configuration

Cookies are HTTP-only

Credentials enabled

Frontend origin explicitly allowed

cors({
  origin: "http://localhost:5173",
  credentials: true,
});

🧠 Design Decisions

Redux used instead of Protected Routes for simplicity

Admin UI rendered conditionally based on role

Backend always enforces authorization

Defensive API handling on frontend

Clean separation of concerns

🚀 How to Test

Signup a user

Login as admin

Access admin dashboard

Manage users

Test user profile updates

Refresh page → session persists

📌 Conclusion

This project demonstrates:

Secure backend architecture

Real-world authentication practices

Proper role-based authorization

Clean frontend state management

Production-like Docker setup

👨‍💻 Developed by

Nikhil Singh
Backend Intern Assessment – Purple Merit Technologies