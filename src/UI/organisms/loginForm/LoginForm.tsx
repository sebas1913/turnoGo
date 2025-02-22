"use client";

import * as yup from "yup";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ILoginRequest } from "@/app/core/application/dto/login/login-request.dto";
import { FormField } from "@/UI/molecules/formField/formField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './login.module.scss';
import Title from "@/UI/atoms/title/Title";
import Button from "@/UI/atoms/button/Button";
import Paragraph from "@/UI/atoms/paragraph/Paragraph";
import { Icons } from "@/UI/atoms/icons/Icons";
import Link from "next/link";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('El correo es inválido')
        .required('Por favor, ingresa tu correo'),
    password: yup
        .string()
        .min(5, 'La contraseña debe tener mínimo 5 caracteres')
        .required('La contraseña es obligatoria')
});

const LoginForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ILoginRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(loginSchema)
    });

    const [backendError, setBackendError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (data: ILoginRequest) => {
        setBackendError(null);
    
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password
            });
    
            if (result?.error) {
                let errorMessage = "Ocurrió un error inesperado";
                try {
                    const errorData = JSON.parse(result.error);
                    errorMessage = errorData.msg || errorMessage;
                } catch {
                    errorMessage = result.error;
                }
    
                setBackendError(errorMessage);
                return;
            }
    
            const session = await fetch("/api/auth/session").then((res) => res.json());
    
            if (session?.user?.role === "ADMIN") {
                router.push("/dashboard/appointments");
            } else {
                router.push("/users");
            }
    
        } catch {
            setBackendError("Error de conexión con el servidor");
        }
    };
    


    return (
        <div className={styles.containerForm}>
            <form onSubmit={handleSubmit(handleLogin)}>
                <Title className={styles.title} level={2}>Iniciar sesión</Title>

                <FormField<ILoginRequest>
                    control={control}
                    type="email"
                    label="Correo"
                    name="email"
                    error={errors.email}
                    placeholder="Ingresa tu correo electrónico"
                />

                <FormField<ILoginRequest>
                    control={control}
                    type="password"
                    label="Contraseña"
                    name="password"
                    error={errors.password}
                    placeholder="Ingresa tu contraseña"
                />

                {backendError && <Paragraph className={styles.errorMessage}>{backendError}</Paragraph>}

                <div className={styles.buttonForm}>
                    <Button variant="primary" type="submit">Iniciar sesión</Button>
                </div>

                <div className={styles.footerForm}>
                    <Paragraph>¿No tienes cuenta?, Regístrate <Link className={styles.link} href={'/register'}>aquí.</Link></Paragraph>
                </div>
            </form>
            <div className={styles.icons}>
                {Icons.scissors}
                {Icons.razor}
                {Icons.beard}
                {Icons.comb}
                {Icons.spray}
            </div>
        </div>
    );
}

export default LoginForm;
