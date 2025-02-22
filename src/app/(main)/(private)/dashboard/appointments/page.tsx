import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions/authOptions";
import { AppointmentService } from "@/app/infrastructure/services/appointment.service";
import AppointmentsTemplate from "@/UI/template/appointmentsTemplate/AppointmentsTemplate";


export default async function AppointmentsPage(){
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const appointmentService = new AppointmentService();
    const data = await appointmentService.find();
    const appointments = Array.isArray(data) ? data : [data];


    return <AppointmentsTemplate dataResponse={appointments} />;
}