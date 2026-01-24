import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export interface Topic {
  id: number;
  title: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  username: string;
  topic_id: number;
  created_at: string;
}

export const getTopics = async (): Promise<Topic[]> => {
  const response = await api.get<Topic[]>('/topics');
  return response.data;
};

export const getPosts = async (topicId: string): Promise<Post[]> => {
  const response = await api.get<Post[]>(`/topics/${topicId}/posts`);
  return response.data;
};

export const createPost = async (topicId: string, post: {title: string, body: string, username: string}): Promise<void> => {
  await api.post(`/topics/${topicId}/posts`, post);
};

export default api;
