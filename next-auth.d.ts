import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            token?: string;
            refreshToken?: string;
            role?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }

    interface User {
        id: string;
        token: string;
        refreshToken: string;
        role: string;
        name: string | null;
        email: string | null;
        image: string | null;
    }
}
