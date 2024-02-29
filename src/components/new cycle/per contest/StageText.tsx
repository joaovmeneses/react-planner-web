

interface StageTextLogo{
    title: string;
    description: string;
    stage: number;
    moment: number;
}

const StageText: React.FC<StageTextLogo> = ({title,description,stage,moment})=>{
    return(
    <div className={stage === moment? "flex flex-col w-56 mx-3 items-center":"flex flex-col w-56 mx-3 items-center text-[#bbbbbb]"}>
            <p className="font-semibold text-lg">{title}</p>
            <p className="text-center">{description}</p>
        </div>
    )
}

export default StageText;