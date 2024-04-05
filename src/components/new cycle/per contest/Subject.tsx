"use client"

import { Disciplinas } from "@/interfaces/PerCycle"
import { useState } from "react";

interface SubjectProps{
    affinity: Disciplinas;
    onUpdateAffinity: (updatedAffinity: Disciplinas) => void;
    index:number;
}

const Subject: React.FC<SubjectProps> = ({affinity,onUpdateAffinity,index}) =>{

    const [selectedLevel, setSelectedLevel] = useState<"basico" | "intermediario" | "avancado" | null>(affinity.afinidade);

    const handleLevelSelect = (level:"basico" | "intermediario" | "avancado" | null) => {
        setSelectedLevel(level);
        const updatedAffinity: Disciplinas = {...affinity,afinidade: level}
        onUpdateAffinity(updatedAffinity);
    }

    return(
      <div className={`flex justify-between border-y-2 ${index%2===0?`border-[#f3f2f7] bg-[#fafafc]`:`bg-white`} pr-24 pl-4 py-2 text-sm`}>
          <span>{affinity.nome}</span>
          <div className="flex gap-56 px-8">
              <button
                className={`w-5 h-5 rounded-full flex items-center justify-center border border-gray-400 ${selectedLevel === 'basico' && 'bg-[#a855f7] text-white'}`}
                onClick={() => handleLevelSelect('basico')}
              >
              </button>
              <button
                className={`w-5 h-5 rounded-full flex items-center justify-center border mr-4 border-gray-400 ${selectedLevel === 'intermediario' && 'bg-[#a855f7] text-white'}`}
                onClick={() => handleLevelSelect('intermediario')}
              >
              </button>
              <button
                className={`w-5 h-5 rounded-full flex items-center justify-center border border-gray-400 ${selectedLevel === 'avancado' && 'bg-[#a855f7] text-white'}`}
                onClick={() => handleLevelSelect('avancado')}
              >
              </button>
          </div>
    </div>
    )
}

export default Subject