export interface FetchParams {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: any;
}