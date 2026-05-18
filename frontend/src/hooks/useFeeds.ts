import { useState, useEffect, useCallback, useRef } from 'react';
import { Feed, getFeeds } from '../lib/api';
import { useSocket } from './useSocket';

export const useFeeds = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [newFeedIds, setNewFeedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socket = useSocket();
  const initialLoadDone = useRef(false);

  const fetchFeeds = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFeeds();
      setFeeds(data);
      setError(null);
      initialLoadDone.current = true;
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
      
      // Mark this feed as "new" for the live badge animation
      setNewFeedIds((prev) => new Set(prev).add(newFeed._id));
      
      // Remove "new" status after 10 seconds
      setTimeout(() => {
        setNewFeedIds((prev) => {
          const next = new Set(prev);
          next.delete(newFeed._id);
          return next;
        });
      }, 10000);
    };

    socket.on('new_feed', handleNewFeed);
    return () => {
      socket.off('new_feed', handleNewFeed);
    };
  }, [socket]);

  return { feeds, newFeedIds, loading, error, refetch: fetchFeeds };
};
