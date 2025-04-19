import { Eye } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";

type RegisterForm = {
    userid: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<RegisterForm>({
        mode: "onChange",
    });

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const onSubmit = async (data: RegisterForm) => {
        if (data.password !== data.confirmPassword) {
            setErrorMessage("Your passwords do not match.");
            return;
        }
        try {
            const { data: dataRegister, error: errorRegister } = await registerUser(data.userid, data.password);

            console.log("dataRegister", dataRegister);
            console.log("errorRegister", errorRegister);
            navigate("/");
            if (errorRegister) {
                setErrorMessage("An error occurred while registering. Please try again.");
                return;
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setErrorMessage("An error occurred while registering. Please try again.");
        }

        console.log("Register submitted:", data);
        setErrorMessage(""); // clear error if any
        alert("Registration successful!");
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 w-screen text-black"
            style={{
                backgroundImage: "url('/bg-blur-2.webp')",
            }}
        >
            {/* Logo */}
            <div className="absolute top-4 left-4">
                <button className="bg-transparent px-4 py-2 font-bold text-black border border-black rounded-[2px]">
                    LOGO
                </button>
            </div>

            {/* Form card */}
            <div className="max-w-md w-full bg-transparent backdrop-blur-md p-8">
                <h2 className="text-3xl text-center mb-8 text-black">
                    Create your <span className="font-bold underline">myApp</span> account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* User ID */}
                    <div className="flex items-center">
                        <label className="text-sm text-black w-1/4">User ID*</label>
                        <div className="w-3/4">
                            <input
                                type="text"
                                {...register("userid", { required: "User ID is required" })}
                                className="w-full border border-black px-3 py-2 rounded-[2px] bg-transparent text-black"
                            />
                            {errors.userid && (
                                <p className="text-red-500 text-sm mt-1">{errors.userid.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex items-center">
                        <label className="text-sm text-black w-1/4">Password*</label>
                        <div className="w-3/4 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password is required" })}
                                className="w-full border border-black px-3 py-2 rounded-[2px] bg-transparent pr-10 text-black"
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

                    {/* Confirm Password */}
                    <div className="flex items-center">
                        <label className="text-sm text-black w-1/4">Confirm*</label>
                        <div className="w-3/4">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                })}
                                className="w-full border border-black px-3 py-2 rounded-[2px] bg-transparent text-black"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                            {/* Passwords mismatch error */}
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    Your passwords do not match.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`w-48 mx-auto block bg-black text-white py-2 uppercase text-sm ${!isValid && "opacity-50 cursor-not-allowed"}`}
                    >
                        REGISTER
                    </button>
                </form>

                {/* Login link */}
                <p className="text-sm text-left mt-6 text-black">
                    Already have an account?{" "}
                    <Link to="/" className="underline text-black">
                        Login here
                    </Link>
                </p>

                {/* Error Message (final) */}
                {errorMessage && (
                    <div className="mt-4 bg-red-500 text-white text-center py-2 rounded">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
