import React from "react";
import FormReg from "./FormReg";
import LoginReg from "./LoginReg";

export default function RegScreen() {
  return (
    <div className="flex flex-col w-1/2 bg-white pt-20">
      <div className="w-1/2 place-self-center">
        <h1 className="font-semibold text-gray-800">Faça o seu cadastro!</h1>
        <FormReg />
        <LoginReg />
      </div>
    </div>
  );
}
