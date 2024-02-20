import Content from "@/components/menu/Content";

export default function Layout({children}:{children: React.ReactNode;}){
    return(
        <div className="h-screen">
            
            <div className="flex h-full w-screen">
                <Content/>
                <div className="flex flex-col w-10/12">
                    {/* Colocoar aqui o Header */}
                    <div className="h-full bg-gray-100">{children}</div>
                </div>
            </div>
        </div>
    )
}