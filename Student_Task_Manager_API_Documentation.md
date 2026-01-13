
# Student Task Manager – API Documentation

## Base URL
Production:
https://student-task-manager-i3n9.onrender.com/api

## Authentication
All protected routes require:
Authorization: Bearer <JWT_TOKEN>

## Auth APIs

### POST /api/auth/signup
Registers a new user.

Request:
{
  "name": "Yash Kumar",
  "email": "yash@example.com",
  "password": "password123"
}

### POST /api/auth/login
Authenticates user and returns JWT token.

Request:
{
  "email": "yash@example.com",
  "password": "password123"
}

Response:
{
  "token": "<jwt_token>",
  "user": {
    "id": "userId",
    "name": "Yash Kumar",
    "email": "yash@example.com"
  }
}

## Task APIs (Protected)

### POST /api/tasks
Creates a task.

### GET /api/tasks
Fetch all tasks for logged-in user.

### GET /api/tasks/:id
Fetch a single task.

### PUT /api/tasks/:id
Update a task.

### DELETE /api/tasks/:id
Delete a task.

## Task Schema
{
  title: String,
  description: String,
  priority: "low | medium | high",
  dueDate: Date,
  completed: Boolean
}

## Summary
This API supports full CRUD functionality with JWT authentication and MongoDB persistence.
