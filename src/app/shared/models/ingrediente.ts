export interface Ingrediente {
    id: number | string;
    nome: string;
    grupo: string;
    id_grupo: number | string;
    estoque_minimo: string;
    estoque_atual?: number | string | undefined;
}

export interface CreateIngrediente {
    nome: string;
    id_grupo: number | string;
    estoque_minimo: string;
}

export interface UpdateIngrediente {
    id: number | string;
    nome: string;
    id_grupo: number | string;
    estoque_minimo: string;
}

export interface BuyIngrediente {
    data_compra: string;
    id_ingrediente: number;
    quantidade_bruta: number;
    pre_limpeza: number;
    valor_unitario: number;
    numero_nota: string;
    fornecedor: string;
}

export interface HistoricoCompraIngrediente {
    id: number | string;
    data_compra: string;
    ingrediente: string;
    quantidade_bruta: string;
    pre_limpeza: string;
    quantidade_liquida: string;
    valor_unitario: string;
    valor_total: string;
    numero_nota: string;
    fornecedor: string;
}