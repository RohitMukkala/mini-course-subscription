## Project overview

This is a full‑stack **course subscription platform** built as a portfolio project. It offers a simple user experience for browsing courses, viewing details, and subscribing with a promo code, backed by a secure FastAPI/PostgreSQL API and a React/Tailwind frontend. The app demonstrates production‑style patterns such as JWT authentication, protected routes, cloud deployment, and a clean separation between frontend and backend services.

## Live demo

- **Live frontend**: `[https://your-frontend-url.vercel.app]`
- **Live backend API**: `[https://your-backend-url.onrender.com]`
- **API docs (Swagger)**: `[https://your-backend-url.onrender.com/docs]`

> Replace the URLs above with your actual deployed links.

## Tech stack

### Frontend

- **React** (Vite)
- **TypeScript** (if applicable)
- **React Router**
- **Context API** for auth and user state
- **Axios** for HTTP requests
- **Tailwind CSS** for styling

### Backend

- **FastAPI**
- **Python**
- **SQLAlchemy** (ORM)
- **PostgreSQL** (Neon)
- **JWT** authentication
- **bcrypt** for password hashing

### Infrastructure / DevOps

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Neon PostgreSQL
- **Environment configuration** via `.env` files

## Architecture

### High-level architecture (ASCII)

```text
+---------------------+        HTTPS         +----------------------+
|     Browser /       | <------------------> |      Vercel          |
|   React Frontend    |                      |  (React + Vite app)  |
+---------------------+                       +----------+-----------+
                                                        |
                                                        | Axios REST (JSON, JWT)
                                                        v
                                             +----------+-----------+
                                             |       Render         |
                                             |    FastAPI Backend   |
                                             +----------+-----------+
                                                        |
                                             SQLAlchemy | (ORM)
                                                        v
                                             +----------+-----------+
                                             |        Neon          |
                                             |   PostgreSQL DB      |
                                             +----------------------+
```

- **JWT-based auth**: Access tokens are issued by the FastAPI backend and stored client‑side; included in the `Authorization: Bearer <token>` header.
- **Protected routes**: The React app checks auth context before allowing users to access dashboards and subscription flows.
- **Single source of truth**: All persistent data (users, courses, subscriptions) lives in Neon PostgreSQL, accessed via SQLAlchemy models.

## Features

- **User authentication**
  - Signup/login with **JWT** access tokens
  - Secure password hashing using **bcrypt**
  - Authenticated “My Courses” dashboard
- **Course browsing**
  - Public course catalog
  - Course details page with description and metadata
- **Subscriptions**
  - Subscribe to a course from its details page
  - Promo code support: **`BFSALE25`** (50% discount)
- **Protected routes**
  - Only authenticated users can access “My Courses” and subscription actions
  - Route guarding implemented with React Router + Context API
- **Cloud deployment**
  - Frontend deployed to **Vercel**
  - Backend deployed to **Render**
  - Database hosted on **Neon PostgreSQL**

## Folder structure

```text
.
├── backend/                # FastAPI application
│   ├── app/
│   │   ├── main.py         # FastAPI entrypoint
│   │   ├── api/            # Routers (auth, courses, subscriptions, etc.)
│   │   ├── models.py       # SQLAlchemy models
│   │   ├── schemas.py      # Pydantic schemas
│   │   ├── deps.py         # Dependencies (DB session, auth)
│   │   ├── core/           # Settings, security, config
│   │   └── db/             # DB session and init
│   ├── tests/              # Backend tests (if present)
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Backend env example
│
├── frontend/               # React (Vite) application
│   ├── src/
│   │   ├── main.tsx / jsx  # React entrypoint
│   │   ├── App.tsx         # App shell + routes
│   │   ├── pages/          # Page-level components
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth context, providers
│   │   ├── api/            # Axios instances, API helpers
│   │   └── styles/         # Tailwind config / global styles
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   └── .env.example        # Frontend env example
│
└── README.md               # Project documentation
```

> The exact structure may vary slightly from this overview.

## Pages & screenshots (placeholders)

### Public pages

- **Landing / Courses list**: `/`
- **Course details**: `/courses/:courseId`
- **Login**: `/login`
- **Signup**: `/signup`

### Authenticated pages

- **My Courses dashboard**: `/dashboard` (or similar)
- **Profile / Account settings** (if implemented)

### Screenshot placeholders

Replace the image paths with your actual screenshots.

- **Landing page**

  `![Landing page](./docs/screenshots/landing.png)`

- **Course details**

  `![Course details](./docs/screenshots/course-details.png)`

- **Signup / Login**

  `![Auth pages](./docs/screenshots/auth.png)`

- **My Courses dashboard**

  `![My Courses](./docs/screenshots/my-courses.png)`

## Environment variables

### Backend (`backend/.env`)

```dotenv
# FastAPI
APP_ENV=development
BACKEND_CORS_ORIGINS=http://localhost:5173,https://your-frontend-url.vercel.app

# Security
SECRET_KEY=your_jwt_secret_key
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Database (Neon)
DATABASE_URL=postgresql+psycopg2://user:password@host/dbname

# Optional
PROMO_CODE_BFSALE25=BFSALE25
PROMO_CODE_DISCOUNT_PERCENT=50
```

### Frontend (`frontend/.env`)

```dotenv
# API base URL for local dev
VITE_API_BASE_URL=http://localhost:8000

# API base URL for production (set in Vercel project settings)
# VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

> Always commit only `.env.example` files and keep actual `.env` files out of version control.

## Local setup guide

### Prerequisites

- **Node.js** (LTS)
- **npm** or **yarn**
- **Python** 3.10+ (check your actual version)
- **PostgreSQL** (local or Neon connection string)
- **Git**

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Backend setup

```bash
cd backend

# Create and activate a virtual environment (recommended)
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Copy env example and configure
cp .env.example .env  # or copy manually on Windows
# Edit .env to set DATABASE_URL, SECRET_KEY, etc.

# Run database migrations / create tables
# (Adjust this to your actual migration flow.)
# Example: Alembic or a custom script
# alembic upgrade head

# Start FastAPI (development)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend should now be running at `http://localhost:8000` with docs at `http://localhost:8000/docs`.

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install    # or: yarn

# Copy env example and configure
cp .env.example .env  # or copy manually on Windows
# Ensure VITE_API_BASE_URL matches your backend URL

# Start the dev server
npm run dev
```

The frontend should now be available at `http://localhost:5173` (default Vite port).

### 4. Test the flow

1. Open the frontend in your browser.
2. Create a new account (signup).
3. Log in to receive a JWT token.
4. Browse courses and open a course details page.
5. Subscribe to a course using promo code **`BFSALE25`**.
6. Confirm that the course appears in “My Courses”.

## API endpoints

> Base URL examples:
> - Local: `http://localhost:8000`
> - Production: `https://your-backend-url.onrender.com`

All protected endpoints expect an `Authorization: Bearer <access_token>` header.

### Auth

| Method | Path                 | Auth | Description                   |
|--------|----------------------|------|-------------------------------|
| POST   | `/api/auth/register` | No   | Register a new user           |
| POST   | `/api/auth/login`    | No   | Obtain JWT access token       |
| GET    | `/api/auth/me`       | Yes  | Get current authenticated user |

### Courses

| Method | Path                 | Auth | Description                          |
|--------|----------------------|------|--------------------------------------|
| GET    | `/api/courses`       | No   | List all available courses           |
| GET    | `/api/courses/{id}`  | No   | Get details for a single course      |

### Subscriptions / My Courses

| Method | Path                 | Auth | Description                                        |
|--------|----------------------|------|----------------------------------------------------|
| POST   | `/api/subscriptions` | Yes  | Subscribe to a course (optionally with promo code) |
| GET    | `/api/my-courses`    | Yes  | List courses the user is subscribed to             |

### Example payloads

- **Login request**

```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **Subscribe with promo code**

```json
POST /api/subscriptions
{
  "course_id": "course-id-here",
  "promo_code": "BFSALE25"
}
```

> Exact field names may differ depending on your implementation; adjust this section to match your actual schema.

## Deployment guide

### Backend (Render)

1. **Create a new Web Service** on Render.
2. Connect the repository and select the `backend` directory (or use a monorepo build command).
3. Set the environment:
   - `PYTHON_VERSION` (if required)
   - `SECRET_KEY`, `DATABASE_URL`, `ACCESS_TOKEN_EXPIRE_MINUTES`, etc.
4. Set the **start command**, for example:

   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

5. Ensure Render health checks pass and note the public URL.

### Database (Neon)

1. Create a new Neon PostgreSQL project.
2. Create a database and a database user.
3. Copy the connection string and set it as `DATABASE_URL` in:
   - `backend/.env` (local)
   - Render service environment variables (production).
4. Run migrations or initialization script to create tables.

### Frontend (Vercel)

1. Import the GitHub repo into Vercel.
2. Set the root directory to `frontend`.
3. Vercel will detect Vite automatically or you can specify:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Set environment variables:
   - `VITE_API_BASE_URL=https://your-backend-url.onrender.com`
5. Deploy; the generated URL becomes your production frontend.

## Future roadmap

- **Payments integration** (Stripe or similar) for real transactions
- **Roles & permissions** (e.g., admin dashboards, instructors)
- **Course progress tracking** (completed lessons, progress bars)
- **Content types** (videos, quizzes, downloadable resources)
- **Improved error handling and observability** (logging, metrics)
- **Automated tests** (unit/integration tests for backend and frontend)
- **Accessibility and performance audits**

## Author

- **Name**: Your Name
- **GitHub**: `[https://github.com/your-username]`
- **LinkedIn**: `[https://www.linkedin.com/in/your-profile/]`
- **Email**: `you@example.com`

If you have feedback or questions about this project, feel free to reach out or open an issue in the repository.
"# mini-course-subscription" 
