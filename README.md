# Where To Watch

Full-stack movie discovery app with:
- `frontend` (React + Vite UI)
- `backend` (Node.js + Express API)

## Project Structure

- `frontend`: UI, auth screens, trending/search/watchlist pages
- `backend`: auth APIs, TMDB proxy routes, watchlist APIs, MongoDB models

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string (Atlas or local)
- TMDB API key

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000
```

## Run Locally

Open 2 terminals from project root.

### Terminal 1 - Backend

```bash
cd backend
npm install
npx nodemon server.js
```

### Terminal 2 - Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` by default.

## Main API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/movies/trending`
- `GET /api/movies/search?q=<query>`
- `GET /api/watchlist` (auth required)
- `POST /api/watchlist` (auth required)
- `DELETE /api/watchlist/:movieId` (auth required)
