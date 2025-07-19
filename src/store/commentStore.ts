import { makeAutoObservable, runInAction } from 'mobx';
import { Comment } from '../models/comment';
import { getComments, createComment, editComment, deleteComment } from '../api/comment';

class CommentStore {
    comments: Comment[] = [];
    loading: boolean = false;
    loadingCreate: boolean = false;
    loadingDelete: boolean = false;
    loadingEdit: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async getComments() {
        this.loading = true;
        try {
            const res = await getComments();
            runInAction(() => {
                this.comments = res;
            });
        } catch (error) {
            console.error(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    getCommentsByPostId(postId: string) {
        return this.comments.filter(p => p.postId === postId);
    }

    async add(data: Omit<Comment, 'id'>) {
        this.loadingCreate = true;
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
        } finally {
            runInAction(() => {
                this.loadingCreate = false;
            });
        }
    }

    async edit(id: string, data: Omit<Comment, 'id'>) {
        this.loadingEdit = true;
        try {
            const res = await editComment(id, data);
            runInAction(() => {
                this.comments = this.comments.map(comment => comment.id === id ? res : comment);
            });
        } catch (error) {
            console.error(error);
        } finally {
            runInAction(() => {
                this.loadingEdit = false;
            });
        }
    }

    async delete(id: string) {
        this.loadingDelete = true;
        try {
            await deleteComment(id);
            runInAction(() => {
                this.comments = this.comments.filter(comment => comment.id !== id);
            });
        } catch (error) {
            console.error(error);
        } finally {
            runInAction(() => {
                this.loadingDelete = false;
            });
        }
    }
}

export const commentStore = new CommentStore();
