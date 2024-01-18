import Content from "@/components/menu/Content";

export default function Layout({children}:{children: React.ReactNode;}){
    return(
        <div className="grid grid-rows-[auto,1fr,auto] h-screen">
            {/* Lugar para colocar o componente do header */}
            <div className="flex h-full">
                <Content/>
                <div className="flex justify-center items-center w-full">{children}</div>
            </div>
        </div>
    )
}