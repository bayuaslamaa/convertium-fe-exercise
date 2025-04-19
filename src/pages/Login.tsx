import { Eye } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import { getProfileByUserId } from "../services/profile";
import { useUser } from "../context/UserContextFull";

type LoginForm = {
    userid: string;
    password: string;
    keepLoggedIn: boolean;
};

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginForm>({ mode: "onChange" });

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { setProfile } = useUser();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginForm) => {
        console.log("Login submitted:", data);
        // Simulate login fail
        try {
            const { user, error } = await loginUser(data.userid, data.password);
            if (error) {
                setErrorMessage("Your user ID and/or password does not match.");
                return;
            }
            const { data: profile } = await getProfileByUserId(user.userid);

            console.log("Profile:", { profile });
            setProfile(profile); // stores in context + localStorage
            if (data.keepLoggedIn) {
                // Set a cookie that expires in 1 year for "Keep me logged in"
                const expiryDate = new Date();
                expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                document.cookie = `keepLoggedIn=true; expires=${expiryDate.toUTCString()}; path=/`;
                localStorage.setItem("keepLoggedIn", "true");
            } else {
                // Remove the cookie and localStorage item if not keeping logged in
                document.cookie = "keepLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                localStorage.removeItem("keepLoggedIn");
            }
            navigate("/profile");
        } catch (error) {
            setErrorMessage("Your user ID and/or password does not match.");
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 w-screen"
            style={{
                backgroundImage: "url('/bg-blur-2.webp')",
            }}
        >
            {/* Logo top-left */}
            <div className="absolute top-4 left-4">
                <button className="bg-transparent px-4 py-2 font-bold text-black border border-black rounded-[2px]">
                    LOGO
                </button>
            </div>

            {/* Form card */}
            <div className="max-w-md w-full bg-transparent backdrop-blur-md p-8">
                <h2 className="text-3xl text-center mb-8 text-black">
                    Welcome to <span className="font-bold underline">myApp</span>
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* User ID */}
                    <div className="flex items-center">
                        <label className="text-sm text-black w-1/4">User ID*</label>
                        <div className="w-3/4">
                            <input
                                type="text"
                                {...register("userid", { required: "User ID is required" })}
                                className="w-full border border-black px-3 py-2 rounded-[2px] bg-transparent"
                            />
                            {errors.userid && (
                                <p className="text-red-500 text-sm mt-1">{errors.userid.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Password with toggle */}
                    <div className="flex items-center">
                        <label className="text-sm text-black w-1/4">Password*</label>
                        <div className="w-3/4 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password is required" })}
                                className="w-full border border-black px-3 py-2 rounded-[2px] bg-transparent pr-10"
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                            >
                                <Eye />
                            </span>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Keep me logged in */}
                    <div className="flex items-center ml-[25%]">
                        <input
                            type="checkbox"
                            {...register("keepLoggedIn")}
                            className="mr-2"
                            id="keep"
                        />
                        <label htmlFor="keep" className="text-sm text-black">
                            Keep me logged in
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`w-48 mx-auto block bg-black text-white py-2 uppercase text-sm ${!isValid && "opacity-50 cursor-not-allowed"}`}
                    >
                        LOGIN
                    </button>
                </form>

                {/* Register link */}
                <p className="text-sm text-left mt-6 text-black">
                    No account?{" "}
                    <Link to="/register" className="underline text-black">
                        Register here
                    </Link>
                </p>

                {/* Error Message */}
                {errorMessage && (
                    <div className="mt-4 bg-red-500 text-white text-center py-2 rounded">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
