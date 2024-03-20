import FormLog from "./FormLog";
import LoginLog from "./LoginLog";

export default function LoginScreen() {

  return (
    <div className="flex flex-col w-1/2 bg-white pt-20">
      <div className="w-1/2 place-self-center">
        <h1 className="font-semibold text-2xl text-center text-gray-800">Seja bem vindo(a) ao <span className="font-bold">DEX</span>!</h1>
        <FormLog/>
        <LoginLog />
      </div>
    </div>
  );
}
