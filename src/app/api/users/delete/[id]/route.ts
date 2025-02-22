import { NextResponse } from "next/server";
import { UserService } from "@/app/infrastructure/services/users.service";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: number }> }) {
    const user = new UserService();

    try {
        const id = (await params).id
        await user.destroy(id);

        return NextResponse.json({ message: 'Eliminado' }, { status: 200 });

    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 })
    }
}