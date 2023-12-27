import React from "react"

export default function LogoHF() {
    return (
        <div className="w-1/2 h-screen">
            <div className="flew flex-col w-full h-full bg-gradient-to-r from-purple-800 via-purple-600 to-pink-600">
                <div className='h-1/3'></div>
                <div className="flex flex-row justify-center w-full py-8">
                    <img src="./img/logo-675x209.png" alt="" className="w-3/5" />
                </div>
                <div className='h-1/3'></div>
            </div>
        </div>
    );
}