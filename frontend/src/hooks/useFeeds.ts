import { useState, useEffect, useCallback } from 'react';
import { Feed, getFeeds } from '../lib/api';
import { useSocket } from './useSocket';

export const useFeeds = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socket = useSocket();

  const fetchFeeds = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFeeds();
      setFeeds(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch feeds. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  useEffect(() => {
    if (!socket) return;

    const handleNewFeed = (newFeed: Feed) => {
      setFeeds((prevFeeds) => {
        // Prevent duplicate feeds
        if (prevFeeds.some((feed) => feed._id === newFeed._id)) {
          return prevFeeds;
        }
        return [newFeed, ...prevFeeds];
      });
    };

    socket.on('new_feed', handleNewFeed);

    return () => {
      socket.off('new_feed', handleNewFeed);
    };
  }, [socket]);

  return { feeds, loading, error, refetch: fetchFeeds };
};
