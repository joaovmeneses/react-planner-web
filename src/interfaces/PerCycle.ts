export interface Disciplinas{
    nome: string;
    qtd_questoes: number;
    horas_objetivo: number;
    indice: number;
    afinidade: "basico" | "intermediario" | "avancado" | null;
    peso: number; 
}

export interface Position{
    _id: string;
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





