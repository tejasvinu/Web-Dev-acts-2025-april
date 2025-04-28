# Task Management Web Application

This project is a task management application with AI-powered task generation capabilities.

## Project Structure

- **Frontend**: React application with Vite
- **Backend**: Express.js API server with MongoDB

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root of the backend directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login a user
- **GET /api/auth/me** - Get current user profile

### Tasks

- **GET /api/tasks** - Get all tasks for the logged-in user
- **POST /api/tasks** - Create a new task
- **PUT /api/tasks/:id** - Update a task
- **DELETE /api/tasks/:id** - Delete a task

### AI Functionality

- **POST /api/ai/generate-tasks** - Generate tasks using AI
- **POST /api/ai/generate-content** - Generate content using AI

## Features

- User authentication (register, login)
- Task management (create, read, update, delete)
- AI-powered task generation
- Priority levels for tasks
- Estimated time for task completion

## Security

- JWT-based authentication
- Secure API key storage (backend only)
- Password hashing
- Protected routes

## Technologies Used

### Frontend
- React
- Vite
- TailwindCSS
- React Router
- Axios

### Backend
- Express.js
- MongoDB with Mongoose
- OpenAI SDK for Gemini API
- JWT Authentication
- bcrypt for password hashing
