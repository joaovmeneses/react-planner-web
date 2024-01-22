import { ReactNode } from "react";

interface ButtonProps {
  image: string;
  children: ReactNode;
  root?: string;
  show?: boolean;
}

const Button: React.FC<ButtonProps> = ({ root, image, children, show }) => {
  return (
    <button className={show ? "hidden" : "flex pl-7 py-4 gap-4"} >
      <img src={image} alt="" />
      <a href={root}>{children}</a>
    </button>
  );
};

export default Button;
