import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "../styles/globals.scss";

const raleway = Raleway({
    variable: "--font-raleway",
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
            <body className={raleway.className}>
                <main className="main">
                    {children}
                </main>
            </body>
        </html>
    );
}
