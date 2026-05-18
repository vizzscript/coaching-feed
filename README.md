# Real-Time Coaching Feed

A production-focused realtime coaching feed app using a monorepo structure.

## Tech Stack
- **Backend**: Node.js, Express, Socket.IO, Redis, MongoDB (Mongoose)
- **Frontend**: Next.js App Router, TypeScript, TailwindCSS, Socket.IO Client, Axios

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB running on default port (`27017`)
- Redis running on default port (`6379`)

### 1. Monorepo Setup
```bash
git clone <repository_url>
cd coaching-feed
```

### 2. Backend Setup
```bash
cd backend
npm install
```

**`.env` Example** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/coaching-feed
REDIS_URL=redis://localhost:6379
CLIENT_URL=http://localhost:3000
```

Start the backend (Dev mode):
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

**`.env.local` Example** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```
Access the frontend at `http://localhost:3000`

---

## Testing Instructions

### 1. Real-time Testing
- Open two browser tabs: Tab A to `http://localhost:3000` (Feed), Tab B to `http://localhost:3000/admin` (Admin).
- Submit a new feed in Tab B.
- Watch the feed instantly appear in Tab A without a page refresh!

### 2. API Testing (curl)
**GET /api/feed**
```bash
curl http://localhost:5000/api/feed
```

**POST /api/feed**
```bash
curl -X POST http://localhost:5000/api/feed \
-H "Content-Type: application/json" \
-d '{"title": "Test Feed", "description": "This is a test coaching feed."}'
```

---
