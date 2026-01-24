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

export default api;
