import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions/authOptions";
import { UserService } from "@/app/infrastructure/services/users.service";
import UsersAdminTemplate from "@/UI/template/usersAdminTemplate/usersAdminTemplate";


export default async function UsersListPage(){
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const userService = new UserService();
    const data = await userService.find();
    const users = Array.isArray(data) ? data : [data];


    return <UsersAdminTemplate dataResponse={users}/>;
}