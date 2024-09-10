interface StageLogoProps{
    logo: string;
    check?: string;
    stage: number;
    moment: number;
    cap?:boolean;
}

const StageLogo: React.FC<StageLogoProps> = ({ logo, check, stage, moment, cap }) => {
    return (
        <>
            {cap === true ? (
                <div className={`${moment === stage ? "bg-[#a855f7]" : "bg-[#bbbbbb]"} flex justify-center items-center rounded-full p-2 sm:py-5 sm:px-4`}>
                    <img src={logo} alt="" className="w-4 sm:w-10 md:w-11" />
                </div>
            ) : (
                <div className={`${moment === stage ? "bg-[#a855f7]" : "bg-[#bbbbbb]"} flex justify-center items-center rounded-full p-2 sm:py-5 sm:px-6`}>
                    <img src={stage > moment ? check : logo} alt="" className="w-2 sm:w-6" />
                </div>
            )}
        </>
    );
};

export default StageLogo;