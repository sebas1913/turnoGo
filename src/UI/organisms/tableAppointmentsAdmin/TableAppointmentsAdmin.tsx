import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "@/UI/atoms/icons/Icons";
import { IAppointmentResponse } from "@/app/core/application/dto/appointment/appointment-response.dto";
import Table from "@/UI/molecules/table/Table";
import styles from "./table.module.scss";
import Button from "@/UI/atoms/button/Button";

interface TableProps {
    dataResponse: IAppointmentResponse[];
}

const TableAppointmentsAdmin: React.FC<TableProps> = ({ dataResponse }) => {
    const router = useRouter();

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [appointments] = useState(dataResponse);

    // Ordenar las citas por fecha de más reciente a más antigua
    const sortedData = [...appointments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Calcular el total de páginas
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    // Obtener los datos de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    const handleUpdateStatus = async (id: number, newStatus: "confirmed" | "canceled") => {
        try {
            const response = await fetch(`/api/appointments/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el estado");
            }

            router.refresh();

        } catch (error) {
            console.error("Error al actualizar el estado:", error);
        }
    };

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
        ),
        actions: (
            <div className={styles.actions}>
                {appointment.status === "pending" && (
                    <>
                        <Button variant="confirmed" onClick={() => handleUpdateStatus(appointment.id, "confirmed")}>
                            {Icons.confirm}
                        </Button>
                        <Button variant="canceled" onClick={() => handleUpdateStatus(appointment.id, "canceled")}>
                            {Icons.cancel}
                        </Button>
                    </>
                )}
            </div>
        )
    }));

    const headers = [
        { label: <span className={styles.header}>{Icons.calendar} Fecha</span>, key: "date" },
        { label: <span className={styles.header}>{Icons.time} Hora</span>, key: "time" },
        { label: <span className={styles.header}>{Icons.status} Estado</span>, key: "status" },
        { label: <span className={styles.header}>{Icons.edit} Editar</span>, key: "actions" },
    ];

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div>
            <Table title="Turnos pendientes" headers={headers} data={formattedData} />

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

export default TableAppointmentsAdmin;
