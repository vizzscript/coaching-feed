import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { connectRedis } from './config/redis';
import { initSocket } from './sockets';
import feedRoutes from './routes/feed.routes';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const allowedOrigins = [
  process.env.CLIENT_URL,
].filter((origin): origin is string => Boolean(origin));

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked origin: ${origin}`));
  },
  methods: ['GET', 'POST'],
}));
app.use(helmet());
app.use(express.json());

// Initialize external services
connectDB();
connectRedis();
initSocket(httpServer);

// Routes
app.use('/api/feed', feedRoutes);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
