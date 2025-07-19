import { makeAutoObservable, runInAction } from 'mobx';
import { Comment } from '../models/comment';
import { getComments, createComment, editComment, deleteComment } from '../api/comment';
import { ErrorState, LoadingState } from './types';

class CommentStore {
    comments: Comment[] = [];
    loading: LoadingState = { loading: false, operation: null };
    error: ErrorState = { error: false, operation: null };

    constructor() {
        makeAutoObservable(this);
    }

    async getComments() {
        this.loading.loading = true;
        this.loading.operation = "get";
        try {
            const res = await getComments();
            runInAction(() => {
                this.comments = res;
            });
        } catch (error) {
            console.error(error);
            this.error.error = true;
            this.error.operation = "get";
        } finally {
            runInAction(() => {
                this.loading.loading = false;
            });
        }
    }

    getCommentsByPostId(postId: string) {
        return this.comments.filter(p => p.postId === postId);
    }

    async add(data: Omit<Comment, 'id'>) {
        this.loading.loading = true;
        this.loading.operation = "add";
        try {
            const payload = {
                ...data,
                id: crypto.randomUUID(),
            }
            const res = await createComment(payload);
            runInAction(() => {
                this.comments = [...this.comments, res];
            });
        } catch (error) {
            console.error(error);
            this.error.error = true;
            this.error.operation = "add";
        } finally {
            runInAction(() => {
                this.loading.loading = false;
            });
        }
    }

    async edit(id: string, data: Omit<Comment, 'id'>) {
        this.loading.loading = true;
        this.loading.operation = "edit";
        try {
            const res = await editComment(id, data);
            runInAction(() => {
                this.comments = this.comments.map(comment => comment.id === id ? res : comment);
            });
        } catch (error) {
            console.error(error);
            this.error.error = true;
            this.error.operation = "edit";
        } finally {
            runInAction(() => {
                this.loading.loading = false;
            });
        }
    }

    async delete(id: string) {
        this.loading.loading = true;
        this.loading.operation = "delete";
        try {
            await deleteComment(id);
            runInAction(() => {
                this.comments = this.comments.filter(comment => comment.id !== id);
            });
        } catch (error) {
            console.error(error);
            this.error.error = true;
            this.error.operation = "delete";
        } finally {
            runInAction(() => {
                this.loading.loading = false;
            });
        }
    }
}

export const commentStore = new CommentStore();
