import { NextResponse } from "next/server";
import { AppointmentService } from "@/app/infrastructure/services/appointment.service";
import { IAppointmentRequest } from "@/app/core/application/dto/appointment/appointment-request.dto";

export async function PUT(request: Request, { params }: { params: Promise<{ id: number }> }) {
    const appointment = new AppointmentService();

    try {
        const body: IAppointmentRequest = await request.json();
        const id = (await params).id;
        const response = await appointment.put(id, body);

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 })
    }
}