import Feed, { IFeed } from '../models/feed.model';
import redisClient from '../config/redis';
import { getIO } from '../sockets';

const FEED_CACHE_KEY = 'feeds:latest';
const CACHE_TTL = 60; // 60 seconds

export const getFeeds = async (): Promise<IFeed[]> => {
  try {
    // Attempt to get from Redis cache
    if (redisClient.isOpen) {
      const cachedFeeds = await redisClient.get(FEED_CACHE_KEY);
      if (cachedFeeds) {
        return JSON.parse(cachedFeeds);
      }
    }
  } catch (error) {
    console.warn('Redis cache get error, falling back to DB', error);
  }

  // Fetch from DB if not cached or Redis failed
  const feeds = await Feed.find().sort({ createdAt: -1 }).limit(50);

  try {
    // Set cache
    if (redisClient.isOpen) {
      await redisClient.setEx(FEED_CACHE_KEY, CACHE_TTL, JSON.stringify(feeds));
    }
  } catch (error) {
    console.warn('Redis cache set error', error);
  }

  return feeds;
};

export const createFeed = async (title: string, description: string): Promise<IFeed> => {
  const newFeed = await Feed.create({ title, description });

  try {
    // Invalidate Cache
    if (redisClient.isOpen) {
      await redisClient.del(FEED_CACHE_KEY);
    }
  } catch (error) {
    console.warn('Redis cache deletion error', error);
  }

  // Broadcast to all connected clients
  const io = getIO();
  if (io) {
    io.emit('new_feed', newFeed);
  }

  return newFeed;
};
