import { Request, Response } from 'express';
import { getFeeds, createFeed } from '../services/feed.service';

export const getFeedsHandler = async (req: Request, res: Response) => {
  try {
    const feeds = await getFeeds();
    res.status(200).json(feeds);
  } catch (error) {
    console.error('Error fetching feeds:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createFeedHandler = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newFeed = await createFeed(title, description);
    res.status(201).json(newFeed);
  } catch (error) {
    console.error('Error creating feed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
