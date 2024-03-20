'use client'

import Content from "@/components/menu/Content";
import Header from "@/components/header/Header";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";



export default function Layout({children}:{children: React.ReactNode;}){

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          if (!token) {
              router.push('/login');
          } else {
              setLoading(false);
          }
      }
  }, []);

  if (loading) {
      return <div>Cargando...</div>;
  }

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