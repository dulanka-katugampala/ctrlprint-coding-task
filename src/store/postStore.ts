import { makeAutoObservable, runInAction } from 'mobx';
import { Post } from '../models/post';
import { getPosts, createPost, deletePost, editPost } from '../api/post';
import { LoadingState } from '../models/types';

class PostStore {
    posts: Post[] = [];
    loading: LoadingState = { loading: false, operation: null };

    constructor() {
        makeAutoObservable(this);
    }

    async getPosts() {
        this.loading.loading = true;
        this.loading.operation = "get";
        try {
            const res = await getPosts();
            runInAction(() => {
                this.posts = res;
            });
        } catch (error) {
            console.error(error);
        } finally {
            runInAction(() => {
                this.loading.loading = false;
            });
        }
    }

    getPostById(id: string) {
        return this.posts.find(p => p.id === id);
    }

    async add(data: Omit<Post, 'id'>) {
        this.loading.loading = true;
        this.loading.operation = "add";
        try {
            const payload = {
                ...data,
                id: crypto.randomUUID(),
            }
            const res = await createPost(payload);
            runInAction(() => {
                this.posts = [...this.posts, res];
            });
        } catch (error) {
            console.error(error);
        } finally {
            runInAction(() => {
                this.loading.loading = false;
            });
        }
    }

    async edit(id: string, data: Omit<Post, 'id'>) {
        this.loading.loading = true;
        this.loading.operation = "edit";
        try {
            const res = await editPost(id, data);
            runInAction(() => {
                this.posts = this.posts.map(post => post.id === id ? res : post);
            });
        } catch (error) {
            console.error(error);
        } finally {
            runInAction(() => {
                this.loading.loading = false;
            });
        }
    }

    async deletePost(id: string) {
        this.loading.loading = true;
        this.loading.operation = "delete";
        try {
            await deletePost(id);
            runInAction(() => {
                this.posts = this.posts.filter(post => post.id !== id);
            });
        } catch (error) {
            console.error(error);
        } finally {
            runInAction(() => {
                this.loading.loading = false;
            });
        }
    }
}

export const postStore = new PostStore();