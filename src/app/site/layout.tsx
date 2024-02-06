import Content from "@/components/menu/Content";

export default function Layout({children}:{children: React.ReactNode;}){
    return(
        <div className="h-screen">
            
            <div className="flex h-full">
                <Content/>
                <div className="flex flex-col ">
                    {/* Colocoar aqui o Header */}
                    <div className="mt-64 ml-64 flex justify-center items-center w-full">{children}</div>
                </div>
            </div>
        </div>
    )
}