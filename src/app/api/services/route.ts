import { NextResponse } from "next/server";
import { ServicesService } from "@/app/infrastructure/services/services.service";

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

