"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeed = exports.getFeeds = void 0;
const feed_model_1 = __importDefault(require("../models/feed.model"));
const redis_1 = __importDefault(require("../config/redis"));
const sockets_1 = require("../sockets");
const FEED_CACHE_KEY = 'feeds:latest';
const CACHE_TTL = 60; // 60 seconds
const getFeeds = async () => {
    try {
        // Attempt to get from Redis cache
        if (redis_1.default.isOpen) {
            const cachedFeeds = await redis_1.default.get(FEED_CACHE_KEY);
            if (cachedFeeds) {
                return JSON.parse(cachedFeeds);
            }
        }
    }
    catch (error) {
        console.warn('Redis cache get error, falling back to DB', error);
    }
    // Fetch from DB if not cached or Redis failed
    const feeds = await feed_model_1.default.find().sort({ createdAt: -1 }).limit(50);
    try {
        // Set cache
        if (redis_1.default.isOpen) {
            await redis_1.default.setEx(FEED_CACHE_KEY, CACHE_TTL, JSON.stringify(feeds));
        }
    }
    catch (error) {
        console.warn('Redis cache set error', error);
    }
    return feeds;
};
exports.getFeeds = getFeeds;
const createFeed = async (title, description) => {
    const newFeed = await feed_model_1.default.create({ title, description });
    try {
        // Invalidate Cache
        if (redis_1.default.isOpen) {
            await redis_1.default.del(FEED_CACHE_KEY);
        }
    }
    catch (error) {
        console.warn('Redis cache deletion error', error);
    }
    // Broadcast to all connected clients
    const io = (0, sockets_1.getIO)();
    if (io) {
        io.emit('new_feed', newFeed);
    }
    return newFeed;
};
exports.createFeed = createFeed;
//# sourceMappingURL=feed.service.js.map