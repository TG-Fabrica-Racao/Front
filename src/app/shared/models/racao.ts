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

export interface BuyRacao {
    data_compra: string;
    id_racao: number;
    quantidade: number;
    valor_unitario: number;
    numero_nota: string;
    fornecedor: string;
}

export interface LogProducao {
    id: number | string;
    racao: string;
    data: string;
    usuario: string;
    quantidade: string;
}

export interface LogAcertos {
    id: number | string;
    racao: string;
    data: string;
    usuario: string;
    quantidade: number | string;
}

export interface HistoricoCompraRacao {
    id: number | string;
    data_compra: string;
    racao: string;
    quantidade: number | string;
    valor_unitario: number | string;
    valor_total: number | string;
    numero_nota: string;
    fornecedor: string;
}