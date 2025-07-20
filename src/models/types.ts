export interface LoadingState {
    loading: boolean;
    operation: "get" | "add" | "edit" | "delete" | null;
}