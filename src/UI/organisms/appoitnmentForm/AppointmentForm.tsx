"use client";

import { useRouter } from "next/navigation";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { IAppointmentRequest } from "@/app/core/application/dto/appointment/appointment-request.dto";
import { FormField } from "@/UI/molecules/formField/formField";
import { SelectField } from "@/UI/molecules/selectField/SelectField";
import Button from "@/UI/atoms/button/Button";
import Title from "@/UI/atoms/title/Title";
import styles from "./appointment.module.scss";

const appointmentSchema = yup.object().shape({
    service_id: yup.number().required("Debes seleccionar un servicio"),
    date: yup
        .string()
        .required("Debes seleccionar una fecha")
        .test("is-future-date", "No puedes seleccionar esta fecha", (value) => {
            if (!value) return false;
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate >= today;
        }),
    time: yup.string().required("Debes seleccionar una hora"),
});

interface IService {
    id: number;
    name: string;
}

interface AppointmentFormProps {
    onClose: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onClose }) => {
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<IAppointmentRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(appointmentSchema)
    });

    const [services, setServices] = useState<IService[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("/api/services");
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error("Error al cargar servicios", error);
            }
        };

        fetchServices();
    }, []);

    const handleAppointment = async (data: IAppointmentRequest) => {
        try {
            const response = await fetch("/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            onClose();

            if (!response.ok) {
                const errorData: { msg: string } = await response.json();

                if (errorData.msg) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: errorData.msg,
                    });
                }

                return;
            }

            await Swal.fire({
                icon: 'success',
                title: '¡Cita creada!',
                text: 'Tu cita ha sido agendada con éxito.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#fc9137',
            });

            router.refresh();

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al agendar tu cita.",
                confirmButtonColor:'#fc9137'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(handleAppointment)}>
            <Title className={styles.title} level={2}>Agenda tu cita</Title>

            <SelectField
                control={control}
                name="service_id"
                label="Selecciona un servicio"
                options={services.map((service) => ({
                    value: service.id,
                    label: service.name
                }))}
                error={errors.service_id}
            />

            <FormField
                control={control}
                type="date"
                label="Selecciona la fecha"
                name="date"
                error={errors.date}
                placeholder="Ingresa la fecha de tu cita"
                min={new Date().toISOString().split("T")[0]} // Evita fechas pasadas
            />

            <FormField
                control={control}
                type="time"
                label="Selecciona la hora"
                name="time"
                error={errors.time}
                placeholder="Ingresa la hora de tu cita"
            />

            <Button variant="primary" type="submit">Agendar Cita</Button>
        </form>
    );
};

export default AppointmentForm;
