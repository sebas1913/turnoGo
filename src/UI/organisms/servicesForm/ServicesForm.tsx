"use client";

import * as yup from "yup";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IServiceRequest } from "@/app/core/application/dto/services/service-request.dto";
import { FormField } from "@/UI/molecules/formField/formField";
import Button from "@/UI/atoms/button/Button";
import Title from "@/UI/atoms/title/Title";
import styles from "./services.module.scss";

const appointmentSchema = yup.object().shape({
    name: yup
        .string()
        .required("Debes ingresar el nombre del servicio"),
    description: yup
        .string()
        .required("Debes ingresar la descripción del servicio"),
    price: yup
        .number()
        .required("Debes ingresar el precio del servicio")
        .typeError("El precio debe ser un número válido"),
});


interface ServicesFormProps {
    onClose: () => void;
}

const ServicesForm: React.FC<ServicesFormProps> = ({ onClose }) => {
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<IServiceRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(appointmentSchema)
    });


    const handleAppointment = async (data: IServiceRequest) => {
        try {
            const response = await fetch("/api/services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            router.refresh();
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
                title: 'Servicio creado!',
                text: 'Tu servicio ha sido creado con éxito.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#fc9137',
            });

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al crear tu servicio.",
                confirmButtonColor: '#fc9137'
            });
        }
    };


    return (
        <form onSubmit={handleSubmit(handleAppointment)}>
            <Title className={styles.title} level={2}>Crear servicio</Title>

            <FormField
                control={control}
                type="text"
                label="Nombre del servicio"
                name="name"
                error={errors.name}
                placeholder="Ingresa el nombre del servicio"

            />

            <FormField
                control={control}
                type="text"
                label="Descripción del servicio"
                name="description"
                error={errors.description}
                placeholder="Ingresa la descripción de tu servicio"
            />

            <FormField
                control={control}
                type="number"
                label="Precio del servicio"
                name="price"
                error={errors.price}
                placeholder="Ingresa el valor del servicio"
            />

            <Button variant="primary" type="submit">Crear servicio</Button>
        </form>
    );
};

export default ServicesForm;
