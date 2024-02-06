import { ReactNode } from "react";
import { usePathname} from "next/navigation";
import Link from "next/link";

interface ButtonProps {
  image: string;
  image2?: string;
  children: ReactNode;
  root: string;
  show?: boolean;
}

const Button: React.FC<ButtonProps> = ({ root, image, children, show, image2 }) => {

  const paginaAtual = usePathname()

  return (
    <button className={show ? "hidden" : (paginaAtual === root? "bg-purple-500 text-white flex w-full rounded-2xl pl-7 h-11 py-3 gap-4" : "flex pl-7 h-11 py-3 gap-4")} >
      {paginaAtual === root?(
        <img src={image2} alt="" />):(
        <img src={image} alt="" />) 
      }
      <Link href={root}>{children}</Link>
    </button>
  );
};

export default Button;
