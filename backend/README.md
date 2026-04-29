# Team Task Manager Backend

## Setup
1. Copy `.env.example` to `.env` and fill in your database credentials.
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Run the server:
   ```bash
   npm run dev
   ```

## Features
- Authentication with JWT signup and login
- Project and team management for admins
- Task creation, assignment, and status tracking
- Dashboard summary for task counts and overdue work
- Role-based access for admin and member users

## Endpoints
- `/api/auth/signup`
- `/api/auth/login`
- `/api/projects`
- `/api/tasks`
- `/api/dashboard`

## Deployment
- Railway-ready
- Set `PORT`, `MONGODB_URI`, and `JWT_SECRET` in Railway variables
- Use `npm start` as the start command
