import { Comment } from '../../models/comment';
import { axiosClient } from '../axiosClient';

export const getComments = async (): Promise<Comment[]> => {
    const response = await axiosClient.get<Comment[]>('/comments');
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

