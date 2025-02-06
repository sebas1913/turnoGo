export interface ILoginResponse {
    msg:    string;
    role:   Role;
    tokens: Tokens;
}

export interface Role {
    created_at: string;
    id:         number;
    name:       string;
}

export interface Tokens {
    access_token:  string;
    refresh_token: string;
}
