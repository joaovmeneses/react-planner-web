import { ReactNode } from "react";

interface CardProps {
  title: string;
  text: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, text, children }) => {
  return (
    <div className="bg-white rounded-2xl px-8 py-6 w-80">
      <h3 className="text-lg text-purple-400">{title}</h3>
      <div className="text-gray-300 text-sm mt-2 mb-4">
        {text}
      </div>
      {children}
    </div>
  );
};

export default Card;
