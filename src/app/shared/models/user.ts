export interface User {
  id: number | string;
  nome: string;
  email: string;
  telefone: string;
  status_usuario: string;
  cargo: string;
}

export interface CreateUser {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
}

export interface UpdateUser {
  nome: string;
  email: string;
  telefone: string;
  status_usuario: string;
  cargo: string;
}