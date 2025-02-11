import { ILoginRequest } from "@/app/core/application/dto/login/login-request.dto";
import { AuthService } from "@/app/infrastructure/services/auth.service";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ILoginResponse } from "@/app/core/application/dto/login/login-response.dto";

interface AuthUser extends User {
    id: string;
    token: string;
    refreshToken: string;
    role: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo Electrónico", type: "text" },
                password: { label: "Contraseña", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.password || !credentials.email) {
                    throw new Error("Credenciales inválidas");
                }

                const loginRequest: ILoginRequest = {
                    password: credentials.password,
                    email: credentials.email,
                };

                try {
                    const authService = new AuthService();
                    const response: ILoginResponse = await authService.login(loginRequest);

                    if (!response.tokens || !response.user.role) {
                        throw new Error("Credenciales inválidas");
                    }

                    const user: AuthUser = {
                        id: response.user.id.toString(),
                        name: response.user.name,
                        email: credentials.email,
                        image: null,
                        token: response.tokens.access_token,
                        refreshToken: response.tokens.refresh_token,
                        role: response.user.role,
                    };

                    return user;
                } catch (error) {
                    if (error instanceof Error && error.message.includes("Network Error")) {
                        throw new Error("No se pudo conectar con el servidor");
                    }
                    
                    throw new Error("Credenciales inválidas");
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const authUser = user as AuthUser;
                token.id = authUser.id;
                token.token = authUser.token;
                token.refreshToken = authUser.refreshToken;
                token.role = authUser.role;
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    id: token.id as string,
                    token: token.token as string,
                    refreshToken: token.refreshToken as string,
                    role: token.role as string,
                    name: session.user?.name || null,
                    email: session.user?.email || null,
                    image: session.user?.image || null,
                },
            };
        },
    },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
