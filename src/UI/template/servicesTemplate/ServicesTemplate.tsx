"use client";

import { useState } from "react";
import { IServiceResponse } from "@/app/core/application/dto/services/service-response.dto";
import TableServices from "@/UI/organisms/tableServices/TableServices";
import Modal from "@/UI/organisms/modal/Modal";
import Button from "@/UI/atoms/button/Button";
import styles from './services.module.scss';
import { Icons } from "@/UI/atoms/icons/Icons";
import ServicesForm from "@/UI/organisms/servicesForm/ServicesForm";

interface IProps {
    dataResponse: IServiceResponse[];
}

const ServicesTemplate: React.FC<IProps> = ({ dataResponse }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <>
            <div className={styles.containerButton}>
                <Button variant="primary" onClick={openModal}>Crear servicio {Icons.add}</Button>
            </div>

            <TableServices dataResponseServices={dataResponse} />
            <Modal isVisible={isModalOpen} onClose={closeModal}>
                <ServicesForm onClose={closeModal}/>
            </Modal>
        </>
    )
}

export default ServicesTemplate;