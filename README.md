# Team Task Manager

A simple, practical app to help small teams track projects and tasks.

What you get here:
- A backend API (Node/Express + MongoDB) that handles users, projects, tasks and a dashboard.
- A React frontend that connects to the API and gives a clean, responsive UI.

I wrote this to be lightweight and easy to run locally or host on services like Render or Railway.

## ✨ Features

### Authentication & Authorization
- ✅ User signup and login with JWT authentication
- ✅ Role-based access control (Admin/Member)
- ✅ Password hashing with bcryptjs
- ✅ Secure token-based sessions (1-day expiration)

### Project Management
- ✅ Admin can create projects with name and description
- ✅ View all projects user is member of or created
- ✅ Project-based task organization
- ✅ Responsive project card grid layout

### Task Management
- ✅ Create tasks with title, description, due date
- ✅ Assign tasks to team members (optional)
- ✅ Task status tracking: To Do → In Progress → Done
- ✅ Status-based color coding (Orange → Purple → Green)
- ✅ Due date tracking with formatted display
- ✅ Overdue task detection and alerting

### Dashboard & Analytics
- ✅ Real-time task statistics dashboard
- ✅ Stat cards: Total, To Do, In Progress, Done, Overdue counts
- ✅ Overdue tasks alert section
- ✅ Color-coded status indicators

### User Interface
- ✅ Clean, modern card-based design
- ✅ Blue theme with intuitive navigation bar
- ✅ Responsive grid layouts
- ✅ Hover effects and smooth transitions
- ✅ Large, readable font sizes (18px base, 16px inputs)

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework with hooks
- **React Router v6** - Client-side routing with private routes
- **Axios** - HTTP client with JWT interceptors
- **CSS3** - Custom styling with CSS variables

### Backend
- **Node.js/Express.js** - REST API server
- **MongoDB Atlas** - Cloud NoSQL database
- **Mongoose v6** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn
- MongoDB Atlas account (connection string)

### Installation

1. **Clone the repository**
```bash
cd Team-Task-Manager
```

# Team Task Manager

A small, no-frills task tracker for teams. Create projects, add tasks, assign people and move tasks through simple statuses.

This repo has two parts:
- `backend/` — API built with Node + Express, uses MongoDB via Mongoose.
- `frontend/` — React app (Create React App) that talks to the API.

I kept the feature set compact so it's easy to run, understand and extend.

If you want screenshots, a short demo script, or a Postman collection added here, tell me and I'll include them.

---

Quick start (run locally)

1) Clone the repo and open it:

```bash
git clone https://github.com/chitranshh/team-task-manager.git
cd team-task-manager
```

2) Start the backend (one terminal):

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add: MONGODB_URI and JWT_SECRET
npm run dev
```

3) Start the frontend (another terminal):

```bash
cd frontend
npm install
cp .env.example .env
# If the backend isn't on localhost:5001, set REACT_APP_API_URL in frontend .env
npm start
```

Open the browser at the port React prints (usually http://localhost:3000).

How the app works (short)

- Sign up as an admin user, create a project and add tasks.
- Assign tasks to team members (optional) and change status: To Do → In Progress → Done.
- Dashboard shows simple counts and highlights overdue tasks.

Useful API calls

Signup (create a user):

```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"name":"Admin","email":"admin@test.com","password":"Admin@123","role":"admin"}'
```

Login (get token):

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@test.com","password":"Admin@123"}'
```

Create a project (admin):

```bash
curl -X POST http://localhost:5001/api/projects \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <TOKEN>' \
  -d '{"name":"Website Redesign","description":"Update marketing site"}'
```

Data quick reference

- `User`: name, email, password (hashed), role
- `Project`: name, description, createdBy, members
- `Task`: title, description, status, dueDate, assignedTo, project

Deployment notes

- Deploy the backend first and set `MONGODB_URI` and `JWT_SECRET` on your host.
- Use the backend URL as `REACT_APP_API_URL` for the frontend build.
- See `DEPLOYMENT.md` for Render / Railway steps.

Troubleshooting

- If the frontend can't reach the API, check `REACT_APP_API_URL` and CORS errors in the browser console.
- If Mongo fails to connect, verify the Atlas user, password and network access.

Want improvements?

- I can add screenshots, a Postman collection, or a set of simple end-to-end tests.
- I can also add project/task edit/delete flows or member management UI if you want.

Tell me which one and I'll add it.

### Dashboard
- `GET /api/dashboard` - Get task statistics

## 📊 Database Schema

### User
- name, email, password (hashed), role (admin/member)

### Project
- name, description, createdBy (User ref), members (User refs)

### Task
- title, description, status (todo/in-progress/done)
- dueDate, assignedTo (User ref), project (Project ref)

## 🎨 Design Features

- **Color Scheme**: Blue (#2563eb) primary, clean grays for backgrounds
- **Task Status Colors**: 
  - Orange (#f59e0b) - To Do
  - Purple (#8b5cf6) - In Progress
  - Green (#10b981) - Done
  - Red (#ef4444) - Overdue/Errors
- **Stat Card Colors**: Blue, Orange, Purple, Green, Red (visual hierarchy)
- **Responsive Grid**: Auto-fill grid for projects and stat cards

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
PORT=5001
```

**Frontend (built-in)**
- API Base URL: http://localhost:5001
- Routes: /login, /signup, /dashboard, /projects, /tasks/:projectId

## 📝 Example Workflows

### Admin Workflow
1. Sign up as Admin
2. Create project "Website Redesign"
3. Create tasks: "Design Mockups", "Develop Frontend"
4. Assign to team members
5. Monitor dashboard for progress

### Member Workflow
1. Sign up as Member
2. View assigned projects (created by admin)
3. Click "View Tasks"
4. Update task status from "To Do" → "In Progress" → "Done"
5. Check dashboard for personal task summary

---

## Full Project README (Human-friendly)

This section is a friendly, practical guide to the project for developers, maintainers, and teammates. It walks through purpose, structure, local setup, API usage, deployment, and troubleshooting in plain language.

### Purpose (in plain words)
Team Task Manager helps small teams coordinate work: admins create projects and tasks, assign tasks to people, and everyone can update task status. The Dashboard provides a quick snapshot of progress and overdue items.

### Who should use this repository
- Developers who will run the app locally or extend it
- DevOps or maintainers who will deploy it to a cloud host
- Reviewers who want to understand the API and data model

### Project structure (what each folder is for)
- `backend/` — Express server, Mongoose models, and API routes. This is where authentication, project & task logic, and dashboard aggregation live.
- `frontend/` — React single-page app (Create React App) that consumes the backend API and provides the UI.
- `DEPLOYMENT.md` — step-by-step hosting instructions for Railway/Render (useful for production deployment).

### Quick local setup (5–10 minutes)
1. Clone the repository:

```bash
git clone https://github.com/chitranshh/team-task-manager.git
cd team-task-manager
```

2. Start the backend (terminal A):

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set MONGODB_URI and JWT_SECRET
npm run dev
```

3. Start the frontend (terminal B):

```bash
cd frontend
npm install
cp .env.example .env
# Optional: set REACT_APP_API_URL=http://localhost:5001
npm start
```

Open the browser at the port shown by React (usually `http://localhost:3000`).

### Environment variables (what to set)
- Backend: set `MONGODB_URI`, `JWT_SECRET`, and optionally `PORT`.
- Frontend: set `REACT_APP_API_URL` to the backend URL when deploying.

### Key API endpoints and examples
- Signup (create user):

```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"name":"Admin","email":"admin@test.com","password":"Admin@123","role":"admin"}'
```

- Login (get token):

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@test.com","password":"Admin@123"}'
```

- Create project (admin):

```bash
curl -X POST http://localhost:5001/api/projects \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <TOKEN>' \
  -d '{"name":"Website Redesign","description":"Update marketing site"}'
```

### Data model quick reference
- `User`: `{ name, email, password (hashed), role }`
- `Project`: `{ name, description, createdBy, members }`
- `Task`: `{ title, description, status, dueDate, assignedTo, project }`

### Deployment summary
1. Deploy backend first (Railway/Render). Set `MONGODB_URI` and `JWT_SECRET` in the host environment.
2. Note the public backend URL.
3. Deploy frontend as a static site or web service. Set `REACT_APP_API_URL` to the backend URL.
4. Test end-to-end (signup, login, create project and tasks, update status, check dashboard).

Detailed instructions are in `DEPLOYMENT.md`.

### Troubleshooting (common problems)
- 404 on backend root: normal; API routes are under `/api/*`.
- Frontend cannot reach backend: check `REACT_APP_API_URL` and CORS settings.
- MongoDB connection errors: verify connection string and Atlas network access.

### Next improvements you can add
- Project and task edit/delete with confirmations
- Member management UI (add/remove members)
- Automated tests and CI
- Better error handling and validation in the UI

### Contributing
If you'd like to contribute, open a fork, work on a branch, and make a pull request. Feel free to ask for an issue or a small task to get started.

---

If you want, I can also generate:
- A short Postman collection of key API calls
- Minimal end-to-end test scripts (Playwright or Cypress)
- A short demo script with screenshots

Tell me which one you'd like next and I'll prepare it.

## 🐛 Troubleshooting

**Backend won't start**
- Check if port 5001 is in use: `lsof -i :5001`
- Verify MongoDB connection string in .env
- Check Node.js version: `node --version`

**Frontend API errors**
- Ensure backend is running on http://localhost:5001
- Check browser console for CORS errors
- Verify JWT token in localStorage

**Tasks not showing**
- Ensure you're logged in as user who has access
- Check MongoDB connection
- Verify project ID in URL

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the Railway deployment steps.

At a high level:

1. Push the repo to GitHub.
2. Create a Railway project from the repo.
3. Deploy the backend from `backend` and set the production environment variables.
4. Deploy the frontend from `frontend` and set `REACT_APP_API_URL` to the backend URL.
5. Test login, project creation, task updates, and the dashboard.

## 📄 License

MIT License - Feel free to use and modify

## 👥 Contributing

Contributions welcome! Please submit pull requests for improvements.

---

**Status**: Fully functional and ready for deployment
- Core features implemented and working
- UI and UX polished and responsive
- Production-ready for Railway
