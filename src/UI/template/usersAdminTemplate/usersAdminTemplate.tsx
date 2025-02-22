"use client";

import { IUsersResponse } from "@/app/core/application/dto/users/users-response.dto";
import TableUserList from "@/UI/organisms/TableUserList/TableUserList";


interface IProps {
    dataResponse: IUsersResponse[];
}

const UsersAdminTemplate: React.FC<IProps> = ({ dataResponse }) => {

    return (
        <>
            <TableUserList dataResponseUsers={dataResponse} />
        </>
    )
}

export default UsersAdminTemplate;