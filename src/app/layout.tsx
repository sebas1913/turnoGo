import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "./authProvider";
import "../styles/globals.scss";

const font = Poppins({
    variable: "--font-principal",
    subsets: ["latin"],
    weight: "500",
});

export const metadata: Metadata = {
    title: "El Barbero",
    description: "Reserva tu cita en El Barbero, la mejor barbería para cortes de cabello y afeitados de calidad. Atención profesional y rápida. ¡Haz tu reserva ahora!",
    keywords: ["barbería", "corte de cabello", "afeitado", "turnos online", "citas barbería", "barberos profesionales"],
    authors: [{ name: "El Barbero", url: "" }],
    openGraph: {
        title: "El Barbero - Reserva tu cita fácil y rápido",
        description: "Reserva tu cita en El Barbero, la mejor barbería para cortes de cabello y afeitados de calidad.",
        url: "",
        siteName: "El Barbero",
        locale: "es_CO",
        type: "website",
    },
    icons: {
        icon: "/favicon.svg",
    }
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={font.className}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
