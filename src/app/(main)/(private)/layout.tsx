"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/UI/atoms/spinner/Spinner";
import Navbar from "@/UI/organisms/navbar/Navbar";
import Button from "@/UI/atoms/button/Button";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            setIsRedirecting(true);
            router.replace("/login");
            return;
        }

        if (session.user.role === "ADMIN" && pathname !== "/dashboard") {
            setIsRedirecting(true);
            router.replace("/dashboard");
            return;
        }

        if (session.user.role !== "ADMIN" && pathname !== "/users") {
            setIsRedirecting(true);
            router.replace("/users");
            return;
        }

        setIsRedirecting(false);
    }, [session, status, pathname, router]);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" });
    };

    if (status === "loading" || isRedirecting) {
        return <Spinner />;
    }

    return (
        <>
            <Navbar>
                <Button variant="primary" onClick={handleSignOut}>Cerrar sesión</Button>
            </Navbar>
            {children}
        </>
    );
}
