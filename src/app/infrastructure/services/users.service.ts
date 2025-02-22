import { IUsersResponse } from "@/app/core/application/dto/users/users-response.dto";
import { HttpClient } from "../utils/httpClient";

export class UserService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async find(): Promise<IUsersResponse> {
        try {
            const response = await this.httpClient.get<IUsersResponse>(`/admin/users`);
            return response;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async destroy(id: number) {
        try {
            const response = await this.httpClient.delete(`/admin/delete/${id}`);
            return response;

        } catch (error) {
            console.log("Error delete user:", error);
            throw error;
        }
    }
}