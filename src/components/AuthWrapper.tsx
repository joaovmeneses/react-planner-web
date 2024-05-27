'use client'

import { ReactNode } from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type Props = {
    children: ReactNode; // Usamos ReactNode para permitir cualquier tipo de children
};

export default function AuthWrapper({children}:Props){
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                } else {
                    setLoading(false);
                }
            }
        };

        checkAuthentication();
    }, [router]);

    if (loading && usePathname() != '/login') {
        return(
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#7367f0] bg-opacity-75 z-50">
                <div className="bg-[#4c43b9] rounded-lg p-8 max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 border-4 border-t-4 border-[#5e56d8] rounded-full animate-spin"></div>
                </div>
                <div className="text-center text-white">Carregando...</div>
                </div>
            </div>
        )
    }

    return children;

  };

