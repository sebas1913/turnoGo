import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthService } from "@/app/infrastructure/services/auth.service";
import { ILoginRequest } from "@/app/core/application/dto/login/login-request.dto";
import { ILoginResponse } from "@/app/core/application/dto/login/login-response.dto";

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

                    return {
                        id: response.user.id.toString(),
                        name: response.user.name,
                        email: credentials.email,
                        image: null,
                        token: response.tokens.access_token,
                        refreshToken: response.tokens.refresh_token,
                        role: response.user.role,
                    };
                } catch {
                    throw new Error("Credenciales inválidas");
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.token = user.token;
                token.refreshToken = user.refreshToken;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    id: token.id,
                    token: token.token,
                    refreshToken: token.refreshToken,
                    role: token.role,
                    name: session.user?.name || null,
                    email: session.user?.email || null,
                    image: session.user?.image || null,
                },
            };
        },
    },
};
