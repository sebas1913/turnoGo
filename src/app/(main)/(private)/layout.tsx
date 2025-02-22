"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/UI/atoms/spinner/Spinner";
import Navbar from "@/UI/organisms/navbar/Navbar";
import Button from "@/UI/atoms/button/Button";
import SecondaryNav from "@/UI/organisms/SecondaryNav/SecondaryNav";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === "loading") return;
    
        if (status === "unauthenticated") {
            router.replace("/login");
            return;
        }
    
        const { role } = session?.user || {};
    
        if (role === "ADMIN" && !pathname.startsWith("/dashboard")) {
            router.replace("/dashboard/appointments");
        } else if (role !== "ADMIN" && pathname !== "/users") {
            router.replace("/users");
        }
    }, [status, session, pathname, router]);
    
    
    

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" });
    };

    if (status === "loading") {
        return <Spinner />;
    }

    return (
        <>
            <Navbar>
                <Button variant="primary" onClick={handleSignOut}>Cerrar sesión</Button>
            </Navbar>

            {session?.user.role === "ADMIN" && pathname.startsWith("/dashboard") && <SecondaryNav />}
            
            {children}
        </>
    );
}
