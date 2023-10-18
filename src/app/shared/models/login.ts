export interface Login {
    email: string;
    senha: string;
}

export interface LoginResponse {
    message: string;
    token: string;
}

export interface ChangePassword {
    email: string;
    senha_atual: string;
    senha_nova: string;
}