"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeedHandler = exports.getFeedsHandler = void 0;
const feed_service_1 = require("../services/feed.service");
const getFeedsHandler = async (req, res) => {
    try {
        const feeds = await (0, feed_service_1.getFeeds)();
        res.status(200).json(feeds);
    }
    catch (error) {
        console.error('Error fetching feeds:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getFeedsHandler = getFeedsHandler;
const createFeedHandler = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }
        const newFeed = await (0, feed_service_1.createFeed)(title, description);
        res.status(201).json(newFeed);
    }
    catch (error) {
        console.error('Error creating feed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.createFeedHandler = createFeedHandler;
//# sourceMappingURL=feed.controller.js.map