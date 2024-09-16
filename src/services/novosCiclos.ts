import type { Contest, CicloData } from "@/interfaces/PerCycle";
import api from "../../axiosConfig";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem('token');
  }

  return null; 
}

const config = {
  headers: { Authorization: `Bearer ${getToken()}` } 
};

export const getUserId = async () => {
  const { data } = await api.get('/user/me', config);
  
  return data.id; 
}

export const getContest = async () => {
    const { data } = await api.get<Contest[]>("/concursos",config);

  return data;
}

export const getPosition = async (constestId: string) => {
  const { data } = await api.get(`/concursos/${constestId}/cargo`,config);

  return data.cargos;
}

export const postCiclo = async (ciclo: CicloData, concursoId: string | undefined) => {
  const { data } = await api.post(`/ciclo/concurso/${concursoId}`, ciclo, config);

  return data;
}