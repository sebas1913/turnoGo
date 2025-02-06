import { HttpClient } from "../utils/httpClient";
import { ILoginRequest } from "@/app/core/application/dto/login/login-request.dto";
import { ILoginResponse } from "@/app/core/application/dto/login/login-response.dto";
import { IRegisterRequest } from "@/app/core/application/dto/register/register-request";
import { IRegisterResponse } from "@/app/core/application/dto/register/register-response";

export class AuthService { 
    private httpClient: HttpClient;

    constructor(){
        this.httpClient = new HttpClient();
    }

    async login(req: ILoginRequest): Promise<ILoginResponse> {
        return this.httpClient.post<ILoginResponse, ILoginRequest>(
            `/login`,
            req,
            false
        );
    }

    async register(req: IRegisterRequest): Promise<IRegisterResponse> {
        return this.httpClient.post<IRegisterResponse, IRegisterRequest>(
            `/register`,
            req,
            false
        );
    }
}
