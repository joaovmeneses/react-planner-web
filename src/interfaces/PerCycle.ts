

export interface Disciplinas{
    afinidade: "basico" | "intermediario" | "avancado" | null;
    nome: string;
    peso: number;
    qtd_questoes: number;
}

export interface Position{
    qtd_questoes: number;
    nome: string;
    disciplinas: Disciplinas[];
}

export interface Contest{
    _id: string;
    nome:string;
}

export interface CicloData {
  nome: string;
  horas_por_ciclo: number;
  usuario_ref: string | undefined;
  qtd_total_questoes: number | undefined;
  disciplinas: Disciplinas[];
}





