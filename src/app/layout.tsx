import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.scss";

const font = Poppins({
    variable: "--font-principal",
    subsets: ["latin"],
    weight: "500",
});

export const metadata: Metadata = {
    title: "TurnoGo",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={font.className}>
                <main className="main">
                    {children}
                </main>
            </body>
        </html>
    );
}
