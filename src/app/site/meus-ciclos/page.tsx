"use client"

import Cicle from "@/components/my-cicles/Cicle";
import CicleProps from "@/interfaces/Cicle";
import { useState } from "react"

export default function MeusCiclos(){

const [myCicles,setMyCicles] = useState<CicleProps[]>([{id: "1", title:"Cicle 1"},
{id: "2", title:"Cicle 2"},{id: "3", title:"Cicle 3"},
{id: "4", title:"Cicle 4"}]);

const handleDeleteCicle = (id: string) => {
    setMyCicles(prevCicles => prevCicles.filter(cicle => cicle.id !== id));
};

    return(
        <section className="bg-white text-[#67617a] m-6 p-5 rounded">
            <h2 className="mb-5 text-xl">Meus Ciclos</h2>
            <div className="flex w-full bg-[#f3f2f7] border-t-2 border-[#eceaf1] py-2 text-sm">
                <p className="w-1/2 text-center">NOME</p>
                <p className="w-1/2 text-center">AÇÕES</p>
            </div>
            {myCicles.map((myCicle)=>(
                <Cicle key={myCicle.id} id={myCicle.id} title={myCicle.title} onDelete={handleDeleteCicle}/>
            ))}
        </section>
    )
}