
📘 Student Task Manager – API Documentation

This document explains all backend APIs used in the Student Task Manager full-stack MERN application.
The backend is built using Node.js, Express, MongoDB, and JWT authentication.

🌐 Base URL

Development
http://localhost:10000/api

Production
https://student-task-manager-i3n9.onrender.com/api

🔐 Authentication Overview

Authentication is handled using JWT (JSON Web Tokens)

After login, a token is returned

This token must be sent in the Authorization header for protected routes

Authorization Header Format
Authorization: Bearer <JWT_TOKEN>

👤 AUTH APIs

1️⃣ User Signup

Endpoint
POST /api/auth/signup

Purpose
Registers a new user

Request Body
{
  "name": "Yash Kumar",
  "email": "yash@example.com",
  "password": "password123"
}

Success Response
{
  "message": "User registered successfully"
}

Possible Errors
Email already exists
Missing required fields

2️⃣ User Login

Endpoint
POST /api/auth/login

Purpose
Authenticates user and returns JWT token

Request Body
{
  "email": "yash@example.com",
  "password": "password123"
}

Success Response
{
  "token": "jwt_token_here",
  "user": {
    "id": "userId",
    "name": "Yash Kumar",
    "email": "yash@example.com"
  }
}

Notes
Token is stored in frontend localStorage
Used for all authenticated requests

✅ TASK APIs (Protected Routes)

⚠️ All task routes require a valid JWT token

3️⃣ Create Task

Endpoint
POST /api/tasks

Purpose
Creates a new task for the logged-in user

Headers
Authorization: Bearer <JWT_TOKEN>

Request Body
{
  "title": "Prepare presentation",
  "description": "Create slides for quarterly review",
  "priority": "high",
  "dueDate": "2026-01-15"
}

Success Response
{
  "_id": "taskId",
  "title": "Prepare presentation",
  "description": "Create slides for quarterly review",
  "priority": "high",
  "dueDate": "2026-01-15",
  "completed": false,
  "createdAt": "2026-01-10T10:00:00Z"
}

4️⃣ Get All Tasks

Endpoint
GET /api/tasks

Purpose
Fetches all tasks for the logged-in user

Headers
Authorization: Bearer <JWT_TOKEN>

Success Response
[
  {
    "_id": "taskId",
    "title": "Buy groceries",
    "priority": "medium",
    "completed": true
  },
  {
    "_id": "taskId",
    "title": "Fix production bug",
    "priority": "high",
    "completed": false
  }
]

5️⃣ Get Single Task

Endpoint
GET /api/tasks/:id

Purpose
Fetches a specific task by ID

URL Example
GET /api/tasks/65a1bc9f

6️⃣ Update Task

Endpoint
PUT /api/tasks/:id

Purpose
Updates task details or completion status

Request Body (example – mark completed)
{
  "completed": true
}

Request Body (example – edit task)
{
  "title": "Updated title",
  "priority": "low"
}

7️⃣ Delete Task

Endpoint
DELETE /api/tasks/:id

Purpose
Permanently deletes a task

Behavior
Frontend shows confirmation popup
Task is removed from database on confirmation

Success Response
{
  "message": "Task deleted successfully"
}

🗃️ Database Models

🧾 Task Schema
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  description: String,
  priority: "low" | "medium" | "high",
  dueDate: Date,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}

👤 User Schema
{
  _id: ObjectId,
  name: String,
  email: String,
  passwordHash: String,
  createdAt: Date
}

🧪 API Testing
APIs tested using Postman
All CRUD operations verified
Authentication tested with valid and invalid tokens

🔒 Security Measures
Passwords hashed using bcrypt
JWT authentication for protected routes
User-specific data isolation
Environment variables for secrets

🚀 Deployment
Backend deployed on Render
MongoDB hosted on MongoDB Atlas
Auto-deployment enabled via GitHub

✅ Summary
✔ Full CRUD APIs
✔ JWT Authentication
✔ Secure & scalable structure
✔ Beginner-friendly & real-world ready
