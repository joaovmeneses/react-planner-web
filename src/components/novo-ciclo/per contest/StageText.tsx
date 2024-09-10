interface StageTextLogo{
    title: string;
    description: string;
    stage: number;
    moment: number;
}

const StageText: React.FC<StageTextLogo> = ({ title, description, stage, moment }) => {
    return (
        <div className={`${stage === moment ? "text-black" : "text-[#bbbbbb]"} flex flex-col w-40 sm:w-56 mx-2 sm:mx-4 items-center`}>
            <p className="font-semibold text-xs sm:text-lg">{title}</p>
            <p className="text-center text-xs sm:text-sm">{description}</p>
        </div>
    );
};

export default StageText;
