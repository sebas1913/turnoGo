import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions/authOptions";
import { AppointmentService } from "@/app/infrastructure/services/appointment.service";
import UserTemplate from "@/UI/template/userTemplate/userTemplate";
import { redirect } from "next/navigation";

export default async function UsersPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const appointmentService = new AppointmentService();
    const data = await appointmentService.find();
    const appointments = Array.isArray(data) ? data : [data];

    return <UserTemplate dataResponse={appointments} />;
}
