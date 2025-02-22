import { IAppointmentResponse } from "@/app/core/application/dto/appointment/appointment-response.dto";
import { HttpClient } from "../utils/httpClient";
import { IAppointmentRequest } from "@/app/core/application/dto/appointment/appointment-request.dto";

export class AppointmentService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async find(): Promise<IAppointmentResponse> {
        try {
            const response = await this.httpClient.get<IAppointmentResponse>(`/appointments`);
            return response;
        } catch (error) {
            console.error("Error fetching appointments:", error);
            throw error;
        }
    }

    async create(body: IAppointmentRequest) {
        try {
            const newService = await this.httpClient.post<IAppointmentResponse, IAppointmentRequest>('/appointments', body);
            return newService;
        } catch (error) {
            console.log("Error al crear la cita:", error);
            throw error;
        }
    }

    async put(id: number, body: IAppointmentRequest) {
		try {
            const response = this.httpClient.put<IAppointmentResponse, IAppointmentRequest>(`/admin/appointments/${id}`, body);
			return response;

		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}