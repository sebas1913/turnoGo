export interface IRegisterResponse{
    msg: string;
    user: User;
}

export interface User {
    created_at: string;
    email:      string;
    id:         number;
    name:       string;
    role:       number;
}
