"use client";

import { useState } from "react";
import styles from "./table.module.scss";
import { IServiceResponse } from "@/app/core/application/dto/services/service-response.dto";
import Table from "@/UI/molecules/table/Table";
import Button from "@/UI/atoms/button/Button";
import { Icons } from "@/UI/atoms/icons/Icons";

interface TableProps {
    dataResponseServices: IServiceResponse[];
}

const TableServices: React.FC<TableProps> = ({ dataResponseServices }) => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Calcular total de páginas
    const totalPages = Math.ceil(dataResponseServices.length / itemsPerPage);

    // Obtener los datos de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = dataResponseServices.slice(startIndex, startIndex + itemsPerPage);

    // Formatear datos para la tabla
    const formattedData = paginatedData.map((service) => ({
        name: service.name,
        description: service.description,
        price: `$${service.price}`,
    }));

    // Encabezados de la tabla
    const headers = [
        { label: <span className={styles.header}>{Icons.razor} Servicio</span>, key: "name" },
        { label: <span className={styles.header}>{Icons.description} Descripción</span>, key: "description" },
        { label: <span className={styles.header}>{Icons.price} Precio</span>, key: "price" },
    ];

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div>
            <Table headers={headers} data={formattedData} />

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

export default TableServices;
