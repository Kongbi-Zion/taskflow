# TaskFlow Documentation

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Features Implemented](#features-implemented)
- [API Endpoints](#api-endpoints)
- [Frontend Features](#frontend-features)
- [Docker Setup](#docker-setup)
- [Bonus Features](#bonus-features)
- [Technical Decisions](#technical-decisions)
- [Deployment Instructions](#deployment-instructions)
- [Planned Features](#planned-features)

## Project Overview

TaskFlow is a task management web application that allows users to create and manage tasks. The app supports authentication, password resets, project management, and real-time task updates. It is built using Next.js for the frontend, Node.js with MongoDB for the backend, and Tailwind CSS for styling.

## Tech Stack

- **Backend:** Node.js (Express) with MongoDB (Mongoose ORM)
- **Frontend:** Next.js with Tailwind CSS
- **Authentication:** JWT with refresh tokens
- **State Management:** Context API
- **Deployment:** Docker & Docker Compose

## Installation & Setup

### Email Configuration

- If using Gmail for sending emails, generate an [App-Specific Password](https://www.nodemailer.com/usage/using-gmail) and use it as the email password in your environment variables.

### Prerequisites

- Docker & Docker Compose installed
- Node.js & npm installed

### Steps

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd taskflow
   ```
2. Create a `.env` file in both backend and frontend directories with required variables.
3. Run the project using Docker:
   ```bash
   docker-compose up --build
   ```
4. Access the application at `http://localhost:3000`.

## Features Implemented

### Backend

- **Authentication & Authorization:**
  - Users can register, log in, and request password resets using JWT tokens.
  - **Password Reset:** Users can request a password reset code, which they use to reset their password.
- **CRUD operations for tasks:**
  - Users can create, read, update, and delete their own tasks. Tasks can also exist independently, without belonging to a project.
- **Project Management:**
  - Users can create and manage projects.
  - Tasks can be assigned to projects or remain standalone.
- **Models:**
  - **User:** Stores user information and credentials.
  - **Token:** Manages JWT tokens for authentication.
  - **Task:** Stores task data, related to users and optional projects.
  - **Project:** Stores project data, and tasks can be associated with projects.
- **MongoDB with Mongoose ORM:** Schema validation and data management.
- **Centralized Error Handling:** Handles errors consistently across the backend.
- **Docker Containerization:** Both frontend and backend services are dockerized for easy deployment.

### Frontend

- **Login/Signup:** User authentication with validation and error handling.
- **Password Reset:** Users can request a reset code and use it to change their password.
- **Task Management:** Users can create, view, update, and delete tasks.
- **Project Management:** Users can create and manage projects.
- **State Management:** Context API for global state management.
- **Responsive UI:** Tailwind CSS for styling and responsiveness.
- **Dark Mode:** Dark mode support for user preference.
- **Drag & Drop:** Tasks can be reordered using `react-beautiful-dnd`.

## API Endpoints

### Auth

- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/login` - Log in a user.
- `POST /api/auth/refresh` - Refresh JWT token.
- `POST /api/auth/password-reset-request` - Request a password reset code.
- `POST /api/auth/password-reset` - Reset password using the provided reset code.

### Tasks

- `POST /api/tasks` - Create a task.
- `GET /api/tasks` - Fetch tasks for the authenticated user.
- `PUT /api/tasks/:id` - Update a task.
- `DELETE /api/tasks/:id` - Delete a task.

### Projects

- `POST /api/projects` - Create a project.
- `GET /api/projects` - Fetch all projects for the authenticated user.
- `PUT /api/projects/:id` - Update a project.
- `DELETE /api/projects/:id` - Delete a project.

## Docker Setup

- **Backend & Database:**
  - `Dockerfile` for API and database.
  - `docker-compose.yml` to manage backend and frontend services.

## Bonus Features

- **WebSockets:** Real-time task updates using Socket.io. Currently, WebSockets are set up on the backend, but I planned to use them in the frontend to automatically update states. For example, sending real-time data about tasks to the frontend as users drag tasks from one section to another.
- **CSV/PDF Export:** Ability to export task lists to CSV or PDF.
- **Performance Optimizations:** Lazy loading and memoization for better performance.

## Technical Decisions

- **Next.js App Router:** Used for scalable routing.
- **React Query:** Optimized data fetching and caching.
- **JWT Authentication:** Secure user authentication and authorization.
- **Refresh Tokens:** Implemented to maintain session security.
- **Mongoose ORM:** Used for MongoDB schema validation and relationships.

## Deployment Instructions

### Steps to Deploy:

1. **Build Docker Images:**
   ```bash
   docker build -t taskflow-backend ./backend
   docker build -t taskflow-frontend ./frontend
   ```
2. **Deploy with Docker Compose:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```
3. **Set up Environment Variables:**
   - Set the appropriate environment variables for production (e.g., database credentials, JWT secrets, etc.).
4. **Restart Containers:** Restart the containers to apply changes.

## Planned Features

### Frontend Testing

- I planned to test the frontend using Jest and create snapshots to ensure UI consistency.

### Task Status Filtering

- I planned to add a variable to hold the status of the tasks, which could be `todo`, `completed`, or `in-progress`, to allow filtering tasks more efficiently.

### Features I Couldn't Complete:

- **ESLint & Husky Setup:**
  - I planned to set up ESLint and Husky for automatic code formatting and linting but didn't manage to complete this.
- **Protected Page Routes:**
  - The goal was to fully protect routes based on user authentication and authorization.
- **React Query:**
  - I initially planned to use React Query to handle static props data on authentication pages using `React.memo`, but opted for Context API instead. I also planned to create an `assets` folder to store all SVG files for better organization. for fetching and managing tasks but opted for Context API instead. I plan to integrate React SQL in the future.
