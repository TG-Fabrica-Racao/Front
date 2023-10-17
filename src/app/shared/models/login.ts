export interface Login {
    email: string;
    senha: string;
}

export interface LoginResponse {
    message: string;
    token: string;
}