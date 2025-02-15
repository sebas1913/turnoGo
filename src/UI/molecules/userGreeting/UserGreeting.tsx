"use client";

import { useSession } from "next-auth/react";
import Title from "@/UI/atoms/title/Title";
import styles from './greeting.module.scss';
import Paragraph from "@/UI/atoms/paragraph/Paragraph";
import { Icons } from "@/UI/atoms/icons/Icons";
import Button from "@/UI/atoms/button/Button";

interface UserGreetingProps {
    openModal: () => void;
}

const UserGreeting: React.FC<UserGreetingProps> = ({ openModal }) => {
    const { data: session } = useSession();

    return (
        <div className={styles.container}>
            <Title className={styles.title} level={2}>
                Hola, {session?.user?.name}
            </Title>
            <Paragraph className={styles.paragraph}>¡Agenda tu cita de forma rápida y sencilla!</Paragraph>
            <Paragraph className={styles.paragraph}>Ir al barbero nunca fue tan fácil :)</Paragraph>
            <div className={styles.containerButton}>
                <Button variant="primary" onClick={openModal}>
                    ¡PIDE TU CITA AQUÍ!
                </Button>
            </div>
            <div className={styles.icons}>
                {Icons.scissors}
                {Icons.beard}
                {Icons.razor}
                {Icons.comb}
                {Icons.spray}
            </div>
        </div>
    );
};


export default UserGreeting;
