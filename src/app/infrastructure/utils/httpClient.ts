const defaultBaseUrl = "https://fantastic-potato-5jgj7q9gv65f7565-8000.app.github.dev";

export class HttpClient {
    private baseUrl: string;
    private token?: string;

    constructor(token?: string, baseUrl: string = defaultBaseUrl) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    private getHeaders(auth: boolean) {
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (auth && this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }
        return headers;
    }

    private async handleResponse(response: Response) {
        const data = await response.json();

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }
        return data;
    }

    async get<T>(url: string, auth: boolean = true): Promise<T> {
        const headers = this.getHeaders(auth);
        const response = await fetch(`${this.baseUrl}/${url}`, { 
            headers,
            method: "GET",
            cache: "no-store" 
        });
        return this.handleResponse(response);
    }

    async post<T, B>(url: string, body: B, auth: boolean = true): Promise<T> {
        const headers = this.getHeaders(auth);
        const response = await fetch(`${this.baseUrl}/${url}`, { 
            headers, 
            method: "POST", 
            body: JSON.stringify(body) });
        return this.handleResponse(response);
    }

    async put<T, B>(url: string, body: B, auth: boolean = true): Promise<T> {
        const headers = this.getHeaders(auth);
        const response = await fetch(`${this.baseUrl}/${url}`, { 
            headers, 
            method: "PUT", 
            body: JSON.stringify(body) });
        return this.handleResponse(response);
    }

    async delete(url: string, auth: boolean = true): Promise<void> {
        const headers = this.getHeaders(auth);
        const response = await fetch(`${this.baseUrl}/${url}`, { 
            headers, 
            method: "DELETE" 
        });
        await this.handleResponse(response);
    }
}
