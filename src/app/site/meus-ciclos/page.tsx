"use client"

import Cicle from "@/components/my-cycles/Cycle";
import CicleProps from "@/interfaces/Cycle";
import { useState, useEffect } from "react"
import api from "../../../../axiosConfig";

export default function MeusCiclos(){

const [myCycles,setMyCycles] = useState<CicleProps[]>([]);

useEffect (() => {
    const data = async () =>{
        try{
            const token = localStorage.getItem("token");
            const response = await api.get("/ciclo",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });
            setMyCycles(response.data);
        }
        catch(error){
            console.log(error);
        }
    }
    data();
},[])


const handleDeleteCycle = (id: string) => {
    setMyCycles(prevCycles => prevCycles.filter(cycle => cycle.id !== id));
};

    return(
        <section className="bg-white text-[#67617a] m-6 p-5 rounded">
            <h2 className="mb-5 text-xl">Meus Ciclos</h2>
            <div className="flex w-full bg-[#f3f2f7] border-t-2 border-[#eceaf1] py-2 text-sm">
                <p className="w-1/2 text-center">NOME</p>
                <p className="w-1/2 text-center">AÇÕES</p>
            </div>
            {myCycles.map((myCycle)=>(
                <Cicle key={myCycle.id} id={myCycle.id} nome={myCycle.nome} onDelete={handleDeleteCycle}/>
            ))}
        </section>
    )
}