"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IRegisterRequest } from "@/app/core/application/dto/register/register-request";
import { FormField } from "@/UI/molecules/formField/formField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Title from "@/UI/atoms/title/Title";
import Button from "@/UI/atoms/button/Button";
import styles from './register.module.scss';
import Link from "next/link";
import Paragraph from "@/UI/atoms/paragraph/Paragraph";

const registerSchema = yup.object().shape({
    name: yup.string().required('Por favor, ingresa tu nombre'),
    email: yup.string().email('Por favor, ingresa un correo válido').required('Este campo es necesario'),
    password: yup.string().min(5, 'La contraseña debe tener al menos 5 caracteres').required('Este campo es necesario'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
        .required("Por favor, confirma tu contraseña"),
});

const RegisterForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IRegisterRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(registerSchema)
    });

    const router = useRouter();

    const handleRegister = async (data: IRegisterRequest) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData: { msg: string } = await response.json();

                if (errorData.msg) {
                    console.log(errorData.msg);
                }

                return;
            }

            router.push("/login");
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    };

    return (
        <div className={styles.containerForm}>
            <form onSubmit={handleSubmit(handleRegister)}>
                <Title className={styles.title} level={2}>Regístrate</Title>

                <FormField<IRegisterRequest>
                    control={control}
                    type="text"
                    label="Nombre"
                    name="name"
                    error={errors.name}
                    placeholder="Ingresa tu nombre"
                />

                <FormField<IRegisterRequest>
                    control={control}
                    type="email"
                    label="Correo electrónico"
                    name="email"
                    error={errors.email}
                    placeholder="Ingresa tu correo"
                />

                <FormField<IRegisterRequest>
                    control={control}
                    type="password"
                    label="Contraseña"
                    name="password"
                    error={errors.password}
                    placeholder="Ingresa tu contraseña"
                />

                <FormField<IRegisterRequest>
                    control={control}
                    type="password"
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    error={errors.confirmPassword}
                    placeholder="Confirma tu contraseña"
                />

                <div className={styles.buttonForm}>
                    <Button variant="primary" type="submit">Registro</Button>
                </div>

                <div className={styles.footerForm}>
                    <Paragraph>¿Ya tienes cuenta?, Inicia sesión <Link className={styles.link} href={'/login'}>aquí.</Link></Paragraph>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
