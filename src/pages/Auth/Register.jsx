import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstace";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContet";
import uploadImage from "../../utils/uploadImage";

const Register = () => {
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminInviteToken, setAdminInviteToken] = useState('');

    const [error, setError] = useState("");

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Handle Register form submit
    const handleRegister = async (e) => {
        e.preventDefault();

        let profileImageUrl ='';

        if(!name) {
            setError("Please enter full name.");
            return;
        }

        if(!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if(!password) {
            setError("Please enter the password")
            return;
        }

        setError("");

        // Register API call
        try {

            // Upload image if present
            if(profilePic) {
                const imageUploadRes = await uploadImage(profilePic);
                profileImageUrl = imageUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: name,
                email,
                password,
                profileImageUrl,
                adminInviteToken
            });

            const { token, role } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(response.data)

                // Redirect based on role
                if (role === "admin") {
                    navigate('/admin/dashboard')
                } else {
                    navigate("/user/dashboard")
                }
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
        <AuthLayout>
            <div className="w-[100%] h-auto mt-0 flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold text-white mt-[14px]">Create an Account</h3>
                <p className="text-xs text-white mt-[5px] mb-6">
                    Join us today by entering your details below.
                </p>
                <form className="w-lg" onSubmit={handleRegister}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                            label="Full Name"
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
                        <Input
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            label="Password"
                            placeholder="Min 8 characters"
                            type="password"
                        />
                        <Input
                            value={adminInviteToken}
                            onChange={({ target }) => setAdminInviteToken(target.value)}
                            label="Admin Invite Token"
                            placeholder="6 Digit Code"
                            type="text"
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        SIGN UP
                    </button>

                    <p className="text-[13px] text-white mt-3">
                        Already have an account?{" "}
                        <Link className="text-primary font-medium underline" to="/login">
                            Login
                        </Link>    
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Register;