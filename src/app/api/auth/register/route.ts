import { NextResponse } from "next/server";
import { AuthService } from "@/app/infrastructure/services/auth.service";
import { IRegisterRequest } from "@/app/core/application/dto/register/register-request";

export async function POST(request: Request){
    const user = new AuthService();

    try {
        const body: IRegisterRequest = await request.json();
        const response = await user.register(body);

        return NextResponse.json(response, {status: 200});

    } catch (error: unknown) {
        return NextResponse.json({message: `Error: ${error}`}, { status: 500})
    }
}