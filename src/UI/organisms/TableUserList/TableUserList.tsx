"use client";

import { useState } from "react";
import { IUsersResponse } from "@/app/core/application/dto/users/users-response.dto";
import { Icons } from "@/UI/atoms/icons/Icons";
import styles from "./table.module.scss";
import Table from "@/UI/molecules/table/Table";
import Button from "@/UI/atoms/button/Button";

interface TableProps {
    dataResponseUsers: IUsersResponse[];
}

const TableUserList: React.FC<TableProps> = ({ dataResponseUsers }) => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Calcular total de páginas
    const totalPages = Math.ceil(dataResponseUsers.length / itemsPerPage);

    // Obtener los datos de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = dataResponseUsers.slice(startIndex, startIndex + itemsPerPage);

    // Formatear datos para la tabla
    const formattedData = paginatedData.map((user) => ({
        name: user.name,
        email: user.email,
        date: new Date(user.created_at).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
    }));
    // Encabezados de la tabla
    const headers = [
        { label: <span className={styles.header}>{Icons.user} Name</span>, key: "name" },
        { label: <span className={styles.header}>{Icons.email} Correo</span>, key: "email" },
        { label: <span className={styles.header}>{Icons.calendar} Fecha de registro</span>, key: "date" },
    ];

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div>
            <Table title="Listado de usuarios" headers={headers} data={formattedData} />

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

export default TableUserList;
