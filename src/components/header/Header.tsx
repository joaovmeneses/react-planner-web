"use client"

import Link from "next/link";
import { useState } from "react";

export default function Header(){
    
    const [ocultarUsuario, setOcultarUsuario] = useState(true);



    return(
        <div className="flex flex-col items-end mx-6 mt-6">
            <header className="flex justify-end w-full bg-white rounded-md gap-7 py-5 px-5">
                <button>
                    <img src="/img/header/moon.svg" alt="Botão de modo escuro" />
                </button>
                <button>
                    <img src="/img/header/bell.svg" alt="Botão de notificações" />
                </button>
                <button>
                    <img src="/img/header/user.svg" alt="Botão de usuário" onClick={()=>setOcultarUsuario(!ocultarUsuario)}/>
                </button>
            </header>
            <div className={ocultarUsuario ? "hidden" : "absolute z-10 flex flex-col w-64 bg-[#9E25D3] rounded-lg text-white mt-16 py-8 px-5"}>
                <div className="flex gap-3 px-3 pb-5">
                    <img src="/img/header/user_white.svg" alt="Icone de usuário" className="pt-2" />
                    <div className="h-8">
                        <p className="text-lg">Nome</p>
                        <p className="text-xs">Email</p>
                    </div>
                </div>
                <hr className=" border border-[#939393]"/>
                <div className="flex flex-col pt-4 pl-3 gap-2">
                    <button className="flex justify-start">Configurações</button>
                    <button className="flex justify-start">Ajuda</button>
                    <button className="flex justify-start">Meus Planos</button>
                    <button className="flex justify-start">Ajuda</button>
                    <button className="flex justify-start">Política de privacidade</button>
                    <button className="flex justify-start"><Link href={"/"}>Sair</Link></button>
                </div>
            </div>
        </div>
    )
}