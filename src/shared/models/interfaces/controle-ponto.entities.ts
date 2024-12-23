export interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    codigo: string;
    image?: string;
    marcacoes?: Marcacao[];
}

export interface Marcacao {
    id: number;
    inicio: string;
    termino: string | null;
    dataInicio: Date;
    dataTermino?: Date;
    observacao: string;
    usuarioId: number;
}

export interface Login {
    status: number;
    user?: Usuario;
    error?: Error;
}

export interface GraficoData {
    categories: string[];
    series: {
        name: string;
        data: number[];
        color: string;
    }[];
}

export interface GraficoDiario {
    data: { dia: string; Trabalhadas: number; Ausentes: number }[];
    series: { name: string; color: string }[];
}
