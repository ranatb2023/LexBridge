import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstace";
import { API_PATHS } from "../../utils/apiPaths";
import LOGO from "../../assets/images/logo.jpeg";

const PracticeLaw = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle login form submit
  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!name) {
      setError("Please enter full name");
      return;
    }

    setError("");

    // Login API call
    try {
      const response = await axiosInstance.post(
        API_PATHS.LANDING_PAGE.SUBSCRIBE,
        {
          name,
          email,
        }
      );

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
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-black px-4">
      <div className="w-full max-w-lg py-8">
        <div className="flex flex-col items-center">
          <img
            src={LOGO}
            alt="Lex Bridge"
            className="w-[100px] h-[100px] rounded-full border-2 border-white object-cover"
          />
          <div className="w-full flex flex-col justify-center items-center text-center px-2">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mt-4">
              Practice Law Before it's Real
            </h3>
            <p className="text-sm sm:text-base text-white mt-2">
              AI generated legal case simulator built for law students. Get
              realistic scenarios to sharpen your legal thinking.
            </p>
            <p className="text-sm sm:text-base text-white mt-2 mb-6">
              Join the waitlist and get 1 month free when we launch
            </p>

            <form
              className="w-full max-w-sm shadow-lg shadow-primary/30 rounded-sm p-6 bg-[#111]"
              onSubmit={handleSubscribe}
            >
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

              <button type="submit" className="btn-primary mt-2">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeLaw;
