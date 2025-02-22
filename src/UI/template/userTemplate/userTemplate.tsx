"use client";

import { useState } from 'react';
import { IAppointmentResponse } from "@/app/core/application/dto/appointment/appointment-response.dto";
import styles from "./template.module.scss";
import UserGreeting from "@/UI/molecules/userGreeting/UserGreeting";
import TableAppointmentsUsers from '@/UI/organisms/tableAppointmentsUsers/TableAppointmentsUsers';
import Modal from '@/UI/organisms/modal/Modal';
import AppointmentForm from '@/UI/organisms/appoitnmentForm/AppointmentForm';

interface IProps {
    dataResponse: IAppointmentResponse[];
}

const UserTemplate: React.FC<IProps> = ({ dataResponse }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <UserGreeting openModal={openModal} />
                </div>
                <div className={styles.content}>
                    <TableAppointmentsUsers dataResponse={dataResponse} />
                </div>
            </div>

            <Modal isVisible={isModalOpen} onClose={closeModal}>
                <AppointmentForm onClose={closeModal}/>
            </Modal>
        </>
    );
};

export default UserTemplate;

