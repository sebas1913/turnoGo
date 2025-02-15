import { NextResponse } from "next/server";
import { AppointmentService } from "@/app/infrastructure/services/appointment.service";
import { IAppointmentRequest } from "@/app/core/application/dto/appointment/appointment-request.dto";

const appointmentService = new AppointmentService();

export async function GET() {
    try {
        const data = await appointmentService.find();
        return NextResponse.json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Error fetching appointments" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body: IAppointmentRequest = await request.json();
        const response = await appointmentService.create(body);

        return NextResponse.json(response, { status: 200 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message: `Error: ${errorMessage}` }, { status: 500 });
    }
}

