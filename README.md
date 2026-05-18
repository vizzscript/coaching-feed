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

## Common Debugging Fixes
1. **Redis Connection Error**: Ensure Redis server is running locally on port 6379 (`redis-server`). If Redis goes down, the backend is built to gracefully fallback to fetching directly from MongoDB.
2. **MongoDB Connection Error**: Ensure MongoDB is running locally (`mongod`). Check the `MONGODB_URI` connection string.
3. **Socket.IO CORS Error**: Ensure `CLIENT_URL` in backend `.env` perfectly matches the frontend URL (e.g., `http://localhost:3000`).

---

## Scalability Improvements
If we were to scale this system for millions of users:
1. **Socket.IO Scaling**: We would introduce a **Redis Adapter** for Socket.IO (`@socket.io/redis-adapter`) to allow horizontal scaling of Node.js instances. Without it, clients connected to different server instances won't receive the same broadcasts.
2. **Database Sharding**: MongoDB collections could be sharded by `createdAt` or a tenant ID if we supported multiple organizations.
3. **Pagination & Infinite Scroll**: The `GET /api/feed` endpoint currently fetches the latest 50 feeds. We would implement cursor-based pagination for an infinite scroll experience on the frontend to optimize data transfer and render times.
4. **Message Queue (Kafka/RabbitMQ)**: For high-throughput feed creations, we would offload the creation and broadcasting logic to a background worker using a message queue instead of doing it synchronously in the HTTP request.

---

## Architecture Interview Questions & Answers

**Q: Why use Redis for the `GET /api/feed` endpoint?**
**A**: Coaching feeds are generally read-heavy (many users viewing the feed, fewer admins posting). Redis caches the expensive database query, reducing latency to near zero and protecting the MongoDB instance from load spikes. 

**Q: What happens if Redis goes down in this architecture?**
**A**: The backend implements a fallback mechanism (`try/catch` around Redis calls). If Redis is unreachable, it logs a warning and queries MongoDB directly, ensuring high availability (graceful degradation) over complete system failure.

**Q: How do you prevent duplicate feed rendering from socket events on the frontend?**
**A**: In `useFeeds.ts`, when appending a new feed received from Socket.IO, we check if a feed with the same `_id` already exists in the local state. This handles edge cases like Socket.IO reconnecting and re-delivering a recent message.

**Q: Why are we emitting the socket event from the backend controller rather than having the frontend emit it?**
**A**: Security and Authority. The backend acts as the source of truth. A feed is only broadcasted *after* it has been successfully validated and persisted in the database. If clients emitted events directly, they could broadcast malicious or unverified data.
