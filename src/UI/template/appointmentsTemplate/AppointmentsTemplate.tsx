"use client";

import { IAppointmentResponse } from "@/app/core/application/dto/appointment/appointment-response.dto";
import TableAppointmentsAdmin from "@/UI/organisms/tableAppointmentsAdmin/TableAppointmentsAdmin";

interface IProps {
    dataResponse: IAppointmentResponse[];
}

const AppointmentsTemplate: React.FC<IProps> = ({ dataResponse }) => {
    return (
        <div>
            <TableAppointmentsAdmin dataResponse={dataResponse} />
        </div>
    )
}

export default AppointmentsTemplate;