import React from "react";
import LOGO from "../../assets/images/logo.jpeg"

const AuthLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-black items-center justify-center p-4">
            <div className="w-full max-w-md flex flex-col justify-center items-center border shadow-lg shadow-purple-600/15 rounded-sm py-6 px-6 bg-[#111]">
                <img
                    src={LOGO}
                    alt="Lex Bridge"
                    className="w-[100px] h-[100px] rounded-full border-2 border-white object-cover"
                />
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;