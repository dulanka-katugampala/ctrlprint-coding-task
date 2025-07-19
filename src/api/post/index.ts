import { Post } from '../../models/post';
import { axiosClient } from '../axiosClient';
// implement all necessary api functions below
// e.g. getPosts...

export const getPosts = async (): Promise<Post[]> => {
    const response = await axiosClient.get<Post[]>('/posts');
    return response.data;
};

export const getPost = async (id: string): Promise<Post> => {
    const response = await axiosClient.get<Post>(`/posts/${id}`);
    return response.data;
};

export const createPost = async (payload: Post): Promise<Post> => {
    const response = await axiosClient.post<Post>('/posts', payload);
    return response.data;
};

export const editPost = async (id: string, payload: Post): Promise<Post> => {
    const response = await axiosClient.put<Post>(`/posts/${id}`, payload);
    return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
    await axiosClient.delete(`/posts/${id}`);
};