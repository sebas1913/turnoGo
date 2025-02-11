export interface ILoginResponse {
    msg:    string;
    tokens: Tokens;
    user:   User;
}

export interface Tokens {
    access_token:  string;
    refresh_token: string;
}

export interface User {
    id:   number;
    name: string;
    role: string;
}