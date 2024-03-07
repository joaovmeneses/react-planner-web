export interface Affinity{
    id: string;
    name: string;
    level: "Iniciante" | "Intermediário" | "Avançado" | null;
}

export interface Position{
    id: string;
    name: string;
    affinies: Affinity[];
}

export interface Contest{
    id: string;
    name:string;
    positions: Position[];
}

export const initialAffinities: Affinity[] = [
    {
      id: '1',
      name: 'Portugues',
      level: null
    },
    {
        id: '2',
        name: 'Matemática',
        level: null
      },
      {
        id: '3',
        name: 'Programação',
        level: null
      },
      {
        id: '4',
        name: 'Estadística',
        level: null
      },
      {
        id: '5',
        name: 'Química',
        level: null
      },
      {
        id: '6',
        name: 'Redação',
        level: null
      },
  ];

  export const initialPositions: Position[] = [
    {
      id: '1',
      name: 'Cargo 1',
      affinies: [initialAffinities[2], initialAffinities[3], initialAffinities[5]]
    },
    {
      id: '2',
      name: 'Cargo 2',
      affinies: [initialAffinities[2], initialAffinities[5]]
    },
    {
        id: '3',
        name: 'Cargo 3',
        affinies: [initialAffinities[1], initialAffinities[5]]
      },
      {
        id: '4',
        name: 'Cargo 4',
        affinies: [initialAffinities[3], initialAffinities[4]]
      }
  ];

export const initialContests: Contest[] = [
    {
      id: '1',
      name: 'Concurso 1',
      positions: initialPositions.slice(0,2)
    },
    {
      id: '2',
      name: 'Concurso 2',
      positions: initialPositions.slice(2,4)
    }
  ];




