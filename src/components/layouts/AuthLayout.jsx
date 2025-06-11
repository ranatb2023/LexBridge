import React from "react";
import LOGO from "../../assets/images/logo.jpeg"

const AuthLayout = ({ children }) => {
    return (
        <div className="flex bg-black">
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col justify-center items-center border-1 shadow-lg shadow-purple-600/15 rounded-sm py-6 px-6">
                    <img src={LOGO} alt="Lex Bridge" className="w-[100px] height-[100px] rounded-full border-2 border-white" />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;