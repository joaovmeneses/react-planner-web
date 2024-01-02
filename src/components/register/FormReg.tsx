import React from "react";
import Link from 'next/link';

export default function FormReg() {
    return (<form>
        <div className="flex flex-col pt-5 pb-3 ">
            <label for="name">
                <input
                    type="text"
                    id="name"
                    className="border border-gray-300 bg-gray-200 focus:bg-white focus:ring-2 focus:ring-purple-600 text-gray-900 appearance-none inline-block w-full rounded py-2 px-4 focus:outline-none shadow-inner" 
                    placeholder="Nome de usuário"
                /></label>
            <div className="flex flex-col pt-3 pb-3">
                <label for="email">
                    <input
                        type="email"
                        id="email"
                        className="border border-gray-300 bg-gray-200 focus:bg-white focus:ring-2 focus:ring-purple-600 text-gray-900 appearance-none inline-block w-full rounded py-2 px-4 focus:outline-none shadow-inner"
                        placeholder="Email"
                    /></label>
            </div>
            <div className="flex flex-col pb-4">
                <label for="psswd">
                    <input
                        type="password"
                        id="psswd"
                        className="border border-gray-300 bg-gray-200 focus:bg-white focus:ring-2 focus:ring-purple-600 text-gray-900 appearance-none inline-block w-full rounded py-2 px-4 focus:outline-none shadow-inner" 
                        placeholder="Senha"
                        minlength="4"
                        maxlength="12"
                        size="12" required
                    /></label>
            </div>

            <div>
                <h6 className="text-gray-500 text-sm text-center">Ao se cadastrar, você concorda com os
                    <Link href='/login' className='text-purple-700 hover:text-purple-900 text-bold text-sm'> Termos e  Políticas de Privacidade.</Link>
                </h6>
            </div>

            <div className="justify-center w-full pt-4">
                <button
                    type="submit"
                    className="rounded-lg bg-purple-600 w-full p-2 hover:bg-purple-900 font-semibold text-white"
                >
                    Cadastrar
                </button>
            </div>
        </div>
    </form>
    );


}