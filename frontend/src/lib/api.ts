import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Feed {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const getFeeds = async (): Promise<Feed[]> => {
  const response = await axios.get(`${API_URL}/feed`);
  return response.data;
};

export const createFeed = async (title: string, description: string): Promise<Feed> => {
  const response = await axios.post(`${API_URL}/feed`, { title, description });
  return response.data;
};
