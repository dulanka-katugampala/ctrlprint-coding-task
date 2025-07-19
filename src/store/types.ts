export interface LoadingState {
    loading: boolean;
    operation: "get" | "add" | "edit" | "delete" | null;
}

export interface ErrorState {
    error: boolean;
    operation: "get" | "add" | "edit" | "delete" | null;
}