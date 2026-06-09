# TaskFlow Pro

> Manage tasks smarter. Work faster.

TaskFlow Pro is a premium, internship-winning MERN Stack Task Management SaaS application. It features a stunning, Stripe/Linear/Apple-inspired glassmorphic dark-mode-ready UI, secure JWT authorization, task sorting/searching/filtering, pagination, and real-time visual analytics built with Recharts.

https://github.com/user-attachments/assets/746ca7f0-a59b-47ca-ae3b-7a84820737a7

---

## Folder Structure

```
TaskFlow-Pro (root)
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Auth & Task controller logic
│   ├── middleware/      # Auth security & error handling middlewares
│   ├── models/          # User & Task mongoose schemas
│   ├── routes/          # Express route registrations
│   ├── validators/      # express-validator schemes
│   ├── server.js        # Entry server script
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/  # Layout cards, loaders, togglers
│   │   ├── context/     # Auth & Tasks state providers
│   │   ├── layouts/     # Dashboard container layouts
│   │   ├── pages/       # Landing, Login, Profile, etc.
│   │   ├── services/    # Axios instance with JWT interceptor
│   │   ├── App.jsx      # Router & main rendering
│   │   ├── index.css    # Tailwind layer imports & custom styles
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── package.json         # Root orchestrator package configuration
└── README.md
```

---

## Tech Stack

### Frontend
- **React 19** & **Vite** (Next-gen bundling)
- **React Router DOM** (Single-page routing)
- **Axios** (API requests with automatic token headers)
- **Tailwind CSS** (Utility-first styling with custom palette)
- **Framer Motion** (Page transitions & floating animations)
- **React Hook Form** & **Zod** (Real-time schema validations)
- **Recharts** (Interactive charting components)
- **Lucide React** (Clean design SVG icons)
- **React Hot Toast** (Premium notification alerts)

### Backend
- **Node.js** & **Express.js** (Web server framework)
- **MongoDB Atlas** & **Mongoose** (Database modeling & mapping)
- **JWT (JsonWebToken)** (Secure session validation tokens)
- **bcryptjs** (Password hashing algorithm)
- **Helmet** (Secure HTTP headers wrapper)
- **Express Rate Limit** (Anti-brute force request caps)
- **Express Validator** (Strict controller request validation)
- **CORS** & **Dotenv** (Cross-origin sharing & env file manager)

---

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com) running locally or a MongoDB Atlas URI

### 1. Clone & Setup Workspace
Navigate to the root project directory:
```bash
npm run install-all
```
This script will concurrently install dependencies in both the `/backend` and `/frontend` directories.

### 2. Configure Environment Variables

#### Backend (`/backend/.env`)
Create a `.env` file inside the `backend` folder matching `backend/.env.example`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=taskflowpro_premium_secret_key_2026_jwt
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

#### Frontend (`/frontend/.env` - Optional)
Vite proxies `/api` requests to `http://localhost:5000` automatically during development. If you need to point to a production backend:
```env
VITE_API_URL=https://your-backend-render-app.onrender.com/api
```

---

## Running the Application

### Running Both Frontend & Backend Concurrently
From the root workspace directory, run:
```bash
npm run dev
```
- **Backend Server** starts on [http://localhost:5000](http://localhost:5000)
- **Vite Frontend Dev Server** starts on [http://localhost:5173](http://localhost:5173)

---

## API Documentation

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user. Expects `name`, `email`, `password`. Returns JWT token.
- `POST /login` - Log in a user. Expects `email`, `password`. Returns JWT token.
- `GET /profile` - Retrieve current logged-in user profile (Authorization header required).

### Task Routes (`/api/tasks`)
All routes require standard Authorization Bearer headers:
- `POST /` - Create a task. Expects `title`, `description`, `priority`, `dueDate`, `status`.
- `GET /` - Get all tasks. Supports pagination, filter, search, and sort parameters:
  - Query parameters: `?page=1&limit=10&search=test&status=pending&priority=high&sortBy=dueDate`
- `GET /stats` - Retrieve stats (Total, Completed, Pending, rates) and charting data for Recharts.
- `GET /:id` - Get a single task by ID.
- `PUT /:id` - Update task details.
- `DELETE /:id` - Delete task by ID.
- `PATCH /:id/status` - Toggle status. Expects `status` ('pending' or 'completed') in body.

---

## Security Best Practices Implemented
1. **Helmet protection:** Sets headers to block cross-site scripting and hijack attempts.
2. **Rate Limiting:** Prevents API brute-forcing by restricting IP calls to 100 requests per 15 minutes.
3. **Mongoose strict validation:** Validates type parameters.
4. **Bcrypt hashing:** Stores passwords safely with 10 salt rounds.
5. **Centralized Error Boundary:** Catches CastErrors, JWT expirations, and mongo validation fails, return user-friendly descriptions.

---

## Deployment Instructions

### Database (MongoDB Atlas)
1. Register on MongoDB Atlas and set up a free shared cluster.
2. Under Database Access, create a database user and record the username/password.
3. Under Network Access, allow access from anywhere (`0.0.0.0/0`) for Render/Vercel serverless connections.
4. Copy the connection string and paste it into your production environments.

### Backend (Render)
1. Create a Web Service on Render and link it to your GitHub Repository.
2. Select **Node** environment.
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node backend/server.js`
5. Under Environment Variables, add:
   - `MONGODB_URI` (your MongoDB Atlas connection string)
   - `JWT_SECRET` (your JWT encryption secret)
   - `JWT_EXPIRES_IN` (e.g. `7d`)
   - `FRONTEND_URL` (your deployed Vercel frontend URL)

### Frontend (Vercel)
1. Log in to Vercel and create a new project import.
2. Set root directory path to: `frontend`
3. Vercel automatically detects Vite configurations.
4. Set Build Command: `npm run build`
5. Set Output Directory: `dist`
6. Add Environment Variable:
   - `VITE_API_URL` (pointing to your Render backend URL, e.g. `https://taskflow-api.onrender.com/api`)
7. Click Deploy.

---

## Screenshots Placeholder

*Sleek glassmorphic components, Recharts diagrams, and statistics cards display beautifully on both Light and Dark mode options.*
