import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstace";
import { API_PATHS } from "../../utils/apiPaths";
import LOGO from "../../assets/images/logo.jpeg"

const PracticeLaw = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Handle login form submit
    const handleSubscribe = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if(!name) {
            setError("Please enter full name")
            return;
        }

        setError("");

        // Login API call
        try {
            const response = await axiosInstance.post(API_PATHS.LANDING_PAGE.SUBSCRIBE, {
                name,
                email,
            });

            const { role } = response.data;

            if (role) {
                console.log("Thanks for Subscribing");
                setName("");
                setEmail("");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.")
            }
        }
    }
    return (
        <div className="flex bg-black">
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col justify-center items-center py-6 px-6">
                    <img src={LOGO} alt="Lex Bridge" className="w-[100px] height-[100px] rounded-full border-2 border-white" />
                    <div className="w-md flex flex-col justify-center items-center">
                        <h3 className="text-center text-4xl font-semibold text-white mt-[14px]">Practice Law Before it's Real</h3>
                        <p className="text-sm text-white mt-[5px] text-center">
                            AI generated legal case simulator built for law students. Get realistic scenarios to sharpen your legal thinking.
                        </p>
                        <p className="text-center text-sm text-white mt-[5px] mb-6">
                            Join the waitlist and get 1 month free when we launch
                        </p>
                        <form className="w-md shadow-lg shadow-primary/30 rounded-sm p-6" onSubmit={handleSubscribe}>
                            <Input
                                value={name}
                                onChange={({ target }) => setName(target.value)}
                                label="Name"
                                placeholder="John Doe"
                                type="text"
                            />
                            <Input
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                                label="Email Address"
                                placeholder="john@example.com"
                                type="text"
                            />

                            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                            <button type="submit" className="btn-primary">
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PracticeLaw;