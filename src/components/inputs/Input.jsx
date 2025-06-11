import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, placeholder, type, label }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div>
            <label className="text-[13px] text-white">{label}</label>
            <div className="input-box">
                <input type={type ==  'password' ? showPassword ? 'text' : 'password' : type} placeholder={placeholder}
                    className="bg-transparent w-full outline-none" value={value}
                    onChange={(e) => {
                        onChange(e)
                    }}/>
                    {type === "password" && (
                        <>
                            {showPassword ? (
                                <FaRegEye
                                    size={22}
                                    className="text-primary cursor-pointer"
                                    onClick={() => toggleShowPassword()}
                                />
                            ) : (
                                <FaRegEyeSlash
                                    size={22}
                                    className="text-white cursor-pointer"
                                    onClick={() => toggleShowPassword()} 
                                />
                            )}
                        </>
                    )}
            </div>
        </div>
    )
}

export default Input;