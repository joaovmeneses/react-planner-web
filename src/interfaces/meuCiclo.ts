export interface Disciplina {
  id: string
  nome: string
  qtd_questoes: number
}

export interface SelectedDisciplina {
  id: string
  nome: string
  horas_objetivo: number
  horas_estudadas: number
  status: string
  indice: number
  tipo_estudo: string[]
}
