import Link from "next/link";

export default function LoginLog() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-center font-medium text-sm">
        <h6 className="text-gray-500 text-sm">Não tem uma conta?</h6>
        <Link
          href="/register"
          className="pl-1 text-purple-700 hover:text-purple-900 font-semibold hover:font-extrabold"
        >
          Cadastre-se
        </Link>
      </div>

      <div className="w-full flex flex-row justify-center">
        <hr className="bg-black" />
        <div>
          <h6 className="text-center text-base text-gray-500 py-2">ou</h6>
        </div>
        <hr />
      </div>

      <div className="space-y-2">
        <button
          type="button"
          className="flex fle-row justify-center rounded-lg bg-gray-700 w-full hover:bg-gray-800"
        >
          <img
            src="/img/icons/ggle.png"
            alt="Conecte-se com o Google"
            className="h-7 pt-1"
          />
          <h6 className="font-xs text-gray-400 pl-2 py-1">
            Conecte-se com o Google
          </h6>
        </button>

        <button
          type="button"
          className="flex fle-row justify-center rounded-lg bg-gray-700 w-full hover:bg-gray-800"
        >
          <img
            src="/img/icons/fcbk.png"
            alt="Conecte-se com o Facebook"
            className="h-7 pt-1 pl-5"
          />
          <h6 className="font-xs text-gray-400 pl-2 py-1">
            Conecte-se com o Facebook
          </h6>
        </button>
      </div>
    </div>
  );
}
