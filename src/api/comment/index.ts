import { Comment } from '../../models/comment';
import { axiosClient } from '../axiosClient';
// implement all necessary api functions below
// e.g. getComments...

export const getComments = async (): Promise<Comment[]> => {
    const response = await axiosClient.get<Comment[]>('/comments');
    return response.data;
};

export const getComment = async (id: string): Promise<Comment> => {
    const response = await axiosClient.get<Comment>(`/comments/${id}`);
    return response.data;
};

export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
    const response = await axiosClient.get<Comment[]>(`/comments?postId=${postId}`);
    return response.data;
};

export const createComment = async (payload: Comment): Promise<Comment> => {
    const response = await axiosClient.post<Comment>('/comments', payload);
    return response.data;
};

export const editComment = async (id: string, payload: Comment): Promise<Comment> => {
    const response = await axiosClient.put<Comment>(`/comments/${id}`, payload);
    return response.data;
};

export const deleteComment = async (id: string): Promise<void> => {
    await axiosClient.delete(`/comments/${id}`);
};

