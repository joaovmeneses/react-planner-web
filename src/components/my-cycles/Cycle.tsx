"use client"

import CycleProps from "@/interfaces/Cycle";
import ModalDelete from "./ModalDelete";
import { useState } from "react";

const Cycle: React.FC<CycleProps & {onDelete: (id:string) => void}> = ({nome,id,onDelete}) =>{

    const [modalDelete,setModalDelete] = useState(false);

    const onClose: React.MouseEventHandler<HTMLButtonElement> = () =>{
        setModalDelete(!modalDelete);
    }

    const onDeleteModal: React.MouseEventHandler<HTMLButtonElement> = () =>{
        setModalDelete(!modalDelete);
        onDelete(id);
    }

    return(
        <div className="flex text-[#a4a2ad] border-t-2 border-[#eceaf1] py-3">
            <p className="w-1/2 text-center">{nome}</p>
            <div className="flex justify-center w-1/2 gap-5">
                <button>
                    <img src="/img/my-cycles/icon _play_green.png" alt="botão de play" />
                </button>
                <button onClick={onClose}>
                    <img src="/img/my-cycles/icon _trash.png" alt="botão de eliminar ciclo" />
                </button>
            </div>
            {modalDelete &&(
                <ModalDelete onClose={onClose} onDelete={onDeleteModal}/>
            )}
        </div>
    )
}

export default Cycle;