export interface Disciplina {
  id: string
  nome: string
}

export interface SelectedDisciplina {
  id: string
  nome: string
  horas_objetivo: number
  horas_estudadas: number
  status: string
  indice: number
}
