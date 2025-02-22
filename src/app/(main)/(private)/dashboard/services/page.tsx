import { authOptions } from "@/app/api/auth/authOptions/authOptions";
import { ServicesService } from "@/app/infrastructure/services/services.service";
import ServicesTemplate from "@/UI/template/servicesTemplate/ServicesTemplate";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ServicesPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const servicesService = new ServicesService();
    const dataService = await servicesService.find();
    const services = Array.isArray(dataService) ? dataService : [dataService];

    return <ServicesTemplate dataResponse={services} />;

}

