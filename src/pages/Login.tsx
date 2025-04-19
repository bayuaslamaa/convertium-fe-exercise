import { Eye, EyeOff } from "lucide-react";
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
        formState: { errors, isValid, isSubmitting },
    } = useForm<LoginForm>({ mode: "onChange" });

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { setProfile } = useUser();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginForm) => {
        try {
            setErrorMessage("");
            const { user, error } = await loginUser(data.userid, data.password);
            if (error) {
                setErrorMessage("Your user ID and/or password does not match.");
                return;
            }
            const { data: profile } = await getProfileByUserId(user.userid);

            setProfile(profile);

            if (data.keepLoggedIn) {
                const expiryDate = new Date();
                expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                document.cookie = `keepLoggedIn=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict; Secure`;
                localStorage.setItem("keepLoggedIn", "true");
            } else {
                document.cookie = "keepLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure";
                localStorage.removeItem("keepLoggedIn");
            }
            navigate("/profile");
        } catch (error) {
            setErrorMessage("Your user ID and/or password does not match.");
        }
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 w-screen"
            style={{
                backgroundImage: "url('/bg-blur-2.webp')",
            }}
        >
            {/* Logo top-left */}
            <div className="absolute top-4 left-4">
                <button
                    className="bg-transparent px-4 py-2 font-bold text-black border border-black rounded-[2px] focus:outline-none focus:ring-2 focus:ring-black"
                    aria-label="Logo"
                >
                    LOGO
                </button>
            </div>

            {/* Form card */}
            <div className="max-w-md w-full bg-white/50 backdrop-blur-md p-8 shadow-lg rounded-sm">
                <h1 className="text-3xl text-center mb-8 text-black">
                    Welcome to <span className="font-bold underline">myApp</span>
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    {/* User ID */}
                    <div className="flex flex-col sm:flex-row sm:items-center">
                        <label className="text-sm text-black w-full sm:w-1/4 mb-1 sm:mb-0" htmlFor="userid">User ID<span className="text-red-500" aria-hidden="true">*</span></label>
                        <div className="w-full sm:w-3/4">
                            <input
                                id="userid"
                                type="text"
                                {...register("userid", { required: "User ID is required" })}
                                className="w-full border border-black px-3 py-2 rounded-[2px] bg-transparent focus:outline-none focus:ring-2 focus:ring-black"
                                aria-invalid={errors.userid ? "true" : "false"}
                                aria-describedby={errors.userid ? "userid-error" : undefined}
                                autoComplete="username"
                            />
                            {errors.userid && (
                                <p className="text-red-500 text-sm mt-1" id="userid-error" role="alert">{errors.userid.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Password with toggle */}
                    <div className="flex flex-col sm:flex-row sm:items-center">
                        <label className="text-sm text-black w-full sm:w-1/4 mb-1 sm:mb-0" htmlFor="password">Password<span className="text-red-500" aria-hidden="true">*</span></label>
                        <div className="w-full sm:w-3/4 relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password is required" })}
                                className="w-full border border-black px-3 py-2 rounded-[2px] bg-transparent pr-10 focus:outline-none focus:ring-2 focus:ring-black"
                                aria-invalid={errors.password ? "true" : "false"}
                                aria-describedby={errors.password ? "password-error" : undefined}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 focus:outline-none bg-transparent"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1" id="password-error" role="alert">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Keep me logged in */}
                    <div className="flex items-center ml-0 sm:ml-[25%]">
                        <input
                            type="checkbox"
                            id="keepLoggedIn"
                            {...register("keepLoggedIn")}
                            className="mr-2 h-4 w-4 accent-black"
                        />
                        <label htmlFor="keepLoggedIn" className="text-sm text-black">
                            Keep me logged in
                        </label>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="mt-4 bg-red-500 text-white text-center py-2 px-3 rounded" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`w-48 mx-auto block bg-black text-white py-2 uppercase text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${(!isValid || isSubmitting) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
                        aria-busy={isSubmitting}
                    >
                        {isSubmitting ? "SIGNING IN..." : "LOGIN"}
                    </button>

                    {/* Register link */}
                    <p className="text-sm text-center mt-6 text-black">
                        No account?{" "}
                        <Link to="/register" className="underline text-black hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:rounded">
                            Register here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
