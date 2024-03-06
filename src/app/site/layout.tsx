import Content from "@/components/menu/Content";
import Header from "@/components/header/Header";

export default function Layout({children}:{children: React.ReactNode;}){
    return(
        <div className="h-screen">
            
            <div className="flex h-full w-screen">
                <Content/>
                <div className="flex flex-col w-10/12 bg-gray-100">
                    <Header/>
                    <div className="h-full ">{children}</div>
                </div>
            </div>
        </div>
    )
}