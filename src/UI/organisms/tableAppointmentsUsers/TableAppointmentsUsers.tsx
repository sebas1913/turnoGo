import { useState } from "react";
import { Icons } from "@/UI/atoms/icons/Icons";
import { IAppointmentResponse } from "@/app/core/application/dto/appointment/appointment-response.dto";
import Table from "@/UI/molecules/table/Table";
import styles from "./table.module.scss";
import Button from "@/UI/atoms/button/Button";

interface TableProps {
    dataResponse: IAppointmentResponse[];
}

const TableAppointmentsUsers: React.FC<TableProps> = ({ dataResponse }) => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Ordenar las citas por fecha de más reciente a más antigua
    const sortedData = [...dataResponse].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Calcular el total de páginas
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    // Obtener los datos de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    const formattedData = paginatedData.map((appointment) => ({
        date: appointment.date,
        time: appointment.time,
        status: (
            <span
                className={`
                    ${appointment.status === "pending" ? styles.pending : ""}
                    ${appointment.status === "confirmed" ? styles.confirmed : ""}
                    ${appointment.status === "canceled" ? styles.canceled : ""}
                `}
            >
                {appointment.status}
            </span>
        )
    }));

    const headers = [
        { label: <span className={styles.header}>{Icons.calendar} Fecha</span>, key: "date" },
        { label: <span className={styles.header}>{Icons.time} Hora</span>, key: "time" },
        { label: <span className={styles.header}>{Icons.status} Estado</span>, key: "status" },
    ];

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div>
            <Table title="Histórico de citas" headers={headers} data={formattedData} />
            
            <div className={styles.pagination}>
                <Button variant="pagination" onClick={prevPage} disabled={currentPage === 1}>
                    {Icons.before}
                </Button>
                <span>
                    Página {currentPage} de {totalPages}
                </span>
                <Button variant="pagination" onClick={nextPage} disabled={currentPage === totalPages}>
                    {Icons.next}
                </Button>
            </div>
        </div>
    );
};


export default TableAppointmentsUsers;
