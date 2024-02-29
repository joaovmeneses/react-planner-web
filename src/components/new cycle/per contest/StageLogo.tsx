


interface StageLogoProps{
    logo: string;
    check?: string;
    stage: number;
    moment: number;
    cap?:boolean;
}

const StageLogo: React.FC<StageLogoProps> = ({logo,check,stage,moment,cap})=>{
    return(
        <>
            {cap === true ?(
            <div className={moment===stage?"flex justify-center align-middle rounded-full py-5 px-4 bg-[#a855f7]":"flex justify-center align-middle rounded-full py-5 px-4 bg-[#bbbbbb]"}>
            <img src={logo} alt="" />
        </div>
        ):(
            <div className={moment===stage?"flex justify-center align-middle rounded-full py-5 px-6 bg-[#a855f7]":"flex justify-center align-middle rounded-full py-5 px-6 bg-[#bbbbbb]"}>
                <img src={stage>moment?check:logo} alt="" />
            </div>
        ) 
        }
        </>
    )
}

export default StageLogo;