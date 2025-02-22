import { NextResponse } from "next/server";
import { ServicesService } from "@/app/infrastructure/services/services.service";
import { IServiceRequest } from "@/app/core/application/dto/services/service-request.dto";

const services = new ServicesService();

export async function GET() {
    try {
        const data = await services.find();
        return NextResponse.json(data);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Error fetching services" }, { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        const body: IServiceRequest = await request.json();
        const response = await services.create(body);

        return NextResponse.json(response, { status: 200 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message: `Error: ${errorMessage}` }, { status: 500 });
    }
}