import { Post } from '../../models/post';
import { axiosClient } from '../axiosClient';

export const getPosts = async (): Promise<Post[]> => {
    const response = await axiosClient.get<Post[]>('/posts');
    return response.data;
};

export const createPost = async (payload: Post): Promise<Post> => {
    const response = await axiosClient.post<Post>('/posts', payload);
    return response.data;
};

export const editPost = async (id: string, payload: Omit<Post, 'id'>): Promise<Post> => {
    const response = await axiosClient.put<Post>(`/posts/${id}`, payload);
    return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
    await axiosClient.delete(`/posts/${id}`);
};