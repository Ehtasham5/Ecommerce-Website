# E-commerce Project

This project contains:
- frontend shop app
- admin dashboard
- backend API

## Project structure
- frontend/
- admin/
- backend/

## Setup

### 1. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

### 2. Create environment files
Copy the example files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp admin/.env.example admin/.env
```

Then update the values with your own credentials.

### 3. Run locally

```bash
cd backend && npm run server
cd frontend && npm run dev
cd admin && npm run dev
```

## Deployment notes
- Frontend and admin are Vite apps and can be deployed to Vercel / Netlify.
- Backend is an Express app and should be deployed to Render / Railway / VPS.
- Set the production values in the deployed environment variables.
- For frontend/admin production builds, set `VITE_BACKEND_URL` to your deployed backend URL.
