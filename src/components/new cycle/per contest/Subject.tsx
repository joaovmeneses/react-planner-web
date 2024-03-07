"use client"

import { Affinity } from "@/interfaces/PerCycle"
import { useState } from "react";

interface SubjectProps{
    affinity: Affinity;
    onUpdateAffinity: (updatedAffinity: Affinity) => void;
    index:number;
}

const Subject: React.FC<SubjectProps> = ({affinity,onUpdateAffinity,index}) =>{

    const [selectedLevel, setSelectedLevel] = useState<"Iniciante" | "Intermediário" | "Avançado" | null>(affinity.level);

    const handleLevelSelect = (level:"Iniciante" | "Intermediário" | "Avançado" | null) => {
        setSelectedLevel(level);
        const updatedAffinity: Affinity = {...affinity,level: level}
        onUpdateAffinity(updatedAffinity);
    }

    return(
      <div className={`flex justify-between border-y-2 ${index%2===0?`border-[#f3f2f7] bg-[#fafafc]`:`bg-white`} pr-24 pl-4 py-2 text-sm`}>
          <span>{affinity.name}</span>
          <div className="flex gap-56 px-8">
              <button
                className={`w-5 h-5 rounded-full flex items-center justify-center border border-gray-400 ${selectedLevel === 'Iniciante' && 'bg-[#a855f7] text-white'}`}
                onClick={() => handleLevelSelect('Iniciante')}
              >
              </button>
              <button
                className={`w-5 h-5 rounded-full flex items-center justify-center border mr-4 border-gray-400 ${selectedLevel === 'Intermediário' && 'bg-[#a855f7] text-white'}`}
                onClick={() => handleLevelSelect('Intermediário')}
              >
              </button>
              <button
                className={`w-5 h-5 rounded-full flex items-center justify-center border border-gray-400 ${selectedLevel === 'Avançado' && 'bg-[#a855f7] text-white'}`}
                onClick={() => handleLevelSelect('Avançado')}
              >
              </button>
          </div>
    </div>
    )
}

export default Subject