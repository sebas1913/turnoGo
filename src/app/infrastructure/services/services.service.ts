import { IServiceResponse } from "@/app/core/application/dto/services/service-response.dto";
import { HttpClient } from "../utils/httpClient";
import { IServiceRequest } from "@/app/core/application/dto/services/service-request.dto";

export class ServicesService{
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async find(): Promise<IServiceResponse> {
        try {
            const response = await this.httpClient.get<IServiceResponse>(`/services`);
            return response;
        } catch (error) {
            console.error("Error fetching services:", error);
            throw error;
        }
    }

    async create(body: IServiceRequest) {
        try {
            const newService = await this.httpClient.post<IServiceResponse, IServiceRequest>('/admin/services', body);
            return newService;
        } catch (error) {
            console.log("Error al crear el servicio:", error);
            throw error;
        }
    }
}