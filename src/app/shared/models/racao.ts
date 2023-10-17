export interface Racao {
    id: number | string;
    nome: string;
    id_categoria: number | string;
    categoria: string;
    tipo_racao: string;
    fase_utilizada: string;
    batida: number | string;
    estoque_minimo: number | string;
    estoque_atual: number | string;
    ingredientes?: RacaoIngrediente[];
}

export interface RacaoIngrediente {
    id?: number | string;
    nome?: string;
    quantidade?: number | string;
}

export interface CreateRacao {
    nome: string;
    id_categoria: number;
    tipo_racao: string;
    fase_utilizada: number;
    estoque_minimo: number;
    ingredientes?: RacaoIngrediente[]
}

export interface ProduzirRacao {
    id_racao: number;
    quantidade: number;
}