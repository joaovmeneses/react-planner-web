"use client"

import React from "react";
import api from "../../../axiosConfig";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalError from '../shared/ModalError';

export default function FormLog() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { email, password };
    api
      .post("/auth/login", data)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("email",email);
        router.push("/site/meus-ciclos");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400 && error.response.data.message === "Senha incorreta.") {
          setError("Email ou senha errado.");
        }
        else if(error.response && error.response.status === 404 && error.response.data.message === "Usuário não cadastrado.") {
          setError("Email ou senha errado.");
        }
      });
  }

  const handleClose = () => {
    setError("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col pt-5 pb-3 ">
        <div className="flex flex-col pt-3 pb-3">
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              className="border border-gray-300 bg-gray-200 focus:bg-white focus:ring-2 focus:ring-purple-600 text-gray-900 appearance-none inline-block w-full rounded py-2 px-4 focus:outline-none shadow-inner"
              placeholder="Email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="psswd">
            <input
              type="password"
              id="psswd"
              className="border border-gray-300 bg-gray-200 focus:bg-white focus:ring-2 focus:ring-purple-600 text-gray-900 appearance-none inline-block w-full rounded py-2 px-4 focus:outline-none shadow-inner"
              placeholder="Senha"
              onChange={(event) => setPassword(event.target.value)}
              minLength={4}
              maxLength={12}
              size={12}
              required
            />
          </label>
        </div>
        <div className="justify-center w-full pt-4">
          <button
            type="submit"
            className="rounded-lg bg-purple-700 w-full p-2 hover:bg-purple-900 font-semibold text-white"
          >
            Entrar
          </button>
        </div>
      </div>
      <ModalError error={error} handleClose={handleClose}/>
    </form>
  );
}
