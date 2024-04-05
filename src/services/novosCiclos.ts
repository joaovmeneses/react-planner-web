import { Contest, Position, CicloData } from "@/interfaces/PerCycle";
import api from "../../axiosConfig";

export const getContest = async () => {
    const { data } = await api.get<Contest[]>("/concursos");
  return data;
}

export const getPosition = async (constestId: string) => {
  const { data } = await api.get(`/concursos/${constestId}/cargo`);
  return data.cargos;
}

export const postCiclo = async (ciclo: CicloData, concursoId: string | undefined) => {
  const { data } = await api.post(`/ciclo/concurso/${concursoId}`, ciclo);
  return data;
}