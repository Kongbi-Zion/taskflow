# TaskFlow Documentation

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Installation and Setup](#installation-and-setup)
- [Implemented Features](#implemented-features)
- [API Endpoints](#api-endpoints)
- [Frontend Features](#frontend-features)
- [Docker Configuration](#docker-configuration)
- [Additional Features](#additional-features)
- [Technical Considerations](#technical-considerations)
- [Deployment Guidelines](#deployment-guidelines)
- [Future Enhancements](#future-enhancements)

## Project Overview

TaskFlow is a robust task management web application designed to enhance productivity through seamless task creation and organization. Key features include authentication, password recovery, project management, and real-time task updates. The application is built using Next.js for the frontend, Node.js with MongoDB for the backend, and Tailwind CSS for styling.

## Technology Stack

- **Backend:** Node.js (Express) with MongoDB (Mongoose ORM)
- **Frontend:** Next.js with Tailwind CSS
- **Authentication:** JWT with refresh tokens
- **State Management:** Context API & React Query
- **Date Handling:** Moment.js for date formatting
- **Deployment:** Docker & Docker Compose

## Installation and Setup

### Email Configuration

- When using Gmail for email notifications, generate an [App-Specific Password](https://www.nodemailer.com/usage/using-gmail) and configure it in the environment variables.

### Prerequisites

- Docker & Docker Compose installed
- Node.js & npm installed

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Kongbi-Zion/taskflow
   cd taskflow
   ```
2. Create a `.env` file in both backend and frontend directories with required variables.
3. Start the application using Docker:
   ```bash
   docker-compose up --build
   ```
4. Access the application at `http://localhost:3000`.

## Implemented Features

### Backend

- **Authentication & Authorization:**
  - User registration, login, and password reset via JWT tokens.
- **Task Management:**
  - Users can create, retrieve, update, and delete tasks.
- **Project Management:**
  - Users can organize tasks into projects or keep them independent.
- **Database Models:**
  - **User:** Stores user credentials and details.
  - **Token:** Manages JWT authentication tokens.
  - **Task:** Stores task-related data.
  - **Project:** Manages project-related information.
- **MongoDB with Mongoose ORM:** Schema validation and database management.
- **Centralized Error Handling:** Consistent error handling across the backend.
- **Docker Support:** Backend services are containerized for easy deployment.
- **WebSockets:** Enables real-time task updates using Socket.io.

### Frontend

- **User Authentication:**
  - Signup, login, and profile management.
- **Password Recovery:**
  - Users can request and utilize reset codes.
- **Task & Project Management:**
  - Users can manage their tasks and projects efficiently.
- **State Management:**
  - Context API & React Query for data fetching and state management.
- **React Query Implementation:**
  - Optimized data fetching and caching using React Query.
  - Reduces unnecessary API calls and improves performance.
  - Automatic background data synchronization and caching for enhanced user experience.
- **User Interface:**
  - Responsive design using Tailwind CSS.
  - Dark mode support.
- **Drag & Drop:**
  - Task reordering with `react-beautiful-dnd`.
- **Real-time Updates:**
  - WebSockets integration for instant UI updates.
- **Route Protection & State Management:**
  - Secure Access Control: Authentication-based route protection.
- **Date Formatting:**
  - Enhanced readability using Moment.js.
- **Task Status Filtering:**
  - Introduce task status categories (`To-Do`, `In Progress`, `Completed`).
  - Implement filtering functionality to allow users to sort tasks based on status.
- **ESLint & Husky Integration:**
  - Automated code formatting and linting.

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/login` - Authenticate a user.
- `POST /api/auth/refresh` - Refresh JWT token (Planned for future implementation).
- `POST /api/auth/forgot-password` - Request a password reset code.
- `POST /api/auth/password-reset` - Reset password.
- `PUT /api/auth/profile` - Update user profile.

### Tasks

- `POST /api/tasks` - Create a task.
- `GET /api/tasks` - Retrieve user tasks.
- `PUT /api/tasks/:id` - Modify a task.
- `DELETE /api/tasks/:id` - Remove a task.

### Projects (Planned Implementation)

- `POST /api/projects` - Create a project.
- `GET /api/projects` - Retrieve user projects.
- `PUT /api/projects/:id` - Update project details.
- `DELETE /api/projects/:id` - Delete a project.

## Docker Configuration

- **Backend & Database:**
  - `Dockerfile` and `docker-compose.yml` manage backend and frontend services.

## Additional Features

- **CSV Export:**
  - Task lists can be exported as CSV.
- **Performance Optimizations:**
  - Lazy loading and memoization enhance efficiency.

## Technical Considerations

- **Next.js over React with Vite:**
  - Provides built-in server-side rendering (SSR) and static site generation (SSG) for improved SEO and performance.
  - Simplifies API integration and authentication handling.
- **React Query over SWR:**
  - More extensive caching and background synchronization capabilities.
  - Handles pagination, prefetching, and automatic retries effectively.
- **JWT Authentication:**
  - Stateless authentication method that enhances scalability and security.
  - Eliminates the need for session storage on the server.
- **Mongoose ORM with MongoDB instead of PostgreSQL & Prisma:**
  - Designed for NoSQL databases, making it more flexible for task-based applications.
  - Simplifies schema modeling and provides built-in validation.
- **Moment.js for Date Formatting:**
  - Robust and widely used library for handling date manipulation and formatting.
  - Provides extensive support for internationalization and time zone handling.

## Deployment Guidelines

### Deployment Steps

1. **Build Docker Images:**
   ```bash
   docker build -t taskflow-backend ./backend
   docker build -t taskflow-frontend ./frontend
   ```
2. **Deploy with Docker Compose:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```
3. **Environment Variables:**
   - Configure production environment variables (database credentials, JWT secrets, etc.).
4. **Restart Services:**
   - Restart containers to apply changes.

## Future Enhancements

### Frontend Testing

- Implement Jest-based testing to ensure UI consistency.
