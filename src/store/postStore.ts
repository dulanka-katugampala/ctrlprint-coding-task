import { makeAutoObservable, runInAction } from 'mobx';
import { Post } from '../models/post';
import { getPosts, createPost, deletePost, editPost } from '../api/post';

class PostStore {
    posts: Post[] = [];
    loading: boolean = false;
    loadingCreate: boolean = false;
    loadingDelete: boolean = false;
    loadingEdit: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async getPosts() {
        this.loading = true;
        try {
            const res = await getPosts();
            runInAction(() => {
                this.posts = res;
            });
        } catch (error) {
            console.error(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    getPostById(id: string) {
        return this.posts.find(p => p.id === id);
    }

    async add(data: Omit<Post, 'id'>) {
        this.loadingCreate = true;
        try {
            const payload = {
                ...data,
                id: Date.now().toString(),
            }
            const res = await createPost(payload);
            runInAction(() => {
                this.posts.push(res);
            });
        } catch (error) {
            console.error(error);
        } finally {
            runInAction(() => {
                this.loadingCreate = false;
            });
        }
    }

    async edit(id: string, data: Post) {
        this.loadingEdit = true;
        try {
            const res = await editPost(id, data);
            runInAction(() => {
                this.posts = this.posts.map(post => post.id === id ? res : post);
            });
        } catch (error) {
            console.error(error);
        } finally {
            runInAction(() => {
                this.loadingEdit = false;
            });
        }
    }

    async deletePost(id: string) {
        this.loadingDelete = true;
        try {
            await deletePost(`http://localhost:3000/posts/${id}`);
            runInAction(() => {
                this.posts = this.posts.filter(post => post.id !== id);
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

export const postStore = new PostStore();