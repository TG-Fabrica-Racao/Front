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