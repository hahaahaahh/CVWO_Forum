import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    config.headers["X-Username"] = user;
  }
  return config;
});

export interface Topic {
  id: number;
  title: string;
  username: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  username: string;
  topic_id: number;
  created_at: string;
}

export const getTopics = async (search?: string): Promise<Topic[]> => {
  const response = await api.get<Topic[]>('/topics', {
    params: { q: search }
  });
  return response.data;
};

export const createTopic = async (title: string): Promise<void> => {
  await api.post('/topics', { title });
};

export const deleteTopic = async (id: number): Promise<void> => {
  await api.delete(`/topics/${id}`);
};

export const getPosts = async (topicId: string, search?: string): Promise<Post[]> => {
  const response = await api.get<Post[]>(`/topics/${topicId}/posts`, {
    params: { q: search }
  });
  return response.data;
};

export const createPost = async (topicId: string, post: {title: string, body: string, username: string}): Promise<void> => {
  await api.post(`/topics/${topicId}/posts`, post);
};

export const updatePost = async (id: number, post: {title: string, body: string}): Promise<void> => {
  await api.put(`/posts/${id}`, post);
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

export interface Comment {
  id: number;
  body: string;
  username: string;
  post_id: number;
  created_at: string;
}

export const getComments = async (postId: string): Promise<Comment[]> => {
  const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
  return response.data;
};

export const createComment = async (postId: string, comment: {body: string, username: string}): Promise<void> => {
  await api.post(`/posts/${postId}/comments`, comment);
};

export const deleteComment = async (id: number): Promise<void> => {
  await api.delete(`/comments/${id}`);
};

export const signup = async (username: string, password: string): Promise<void> => {
  await api.post('/signup', { username, password });
};

export const login = async (username: string, password: string): Promise<void> => {
  await api.post('/login', { username, password });
};

export default api;
