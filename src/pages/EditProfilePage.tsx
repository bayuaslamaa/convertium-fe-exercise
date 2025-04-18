import { Menu, Pen, UserRound } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditProfilePage = () => {
    const [activeTab, setActiveTab] = useState("Basic Details");
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            salutation: "",
            firstName: "",
            lastName: "",
            email: "",
        },
    });

    const tabs = ["Basic Details", "Additional Details", "Spouse Details", "Personal Preferences"];

    const onSubmit = (data: any) => {
        console.log("Updated data:", data);
        navigate("/profile");
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center w-screen"
            style={{ backgroundImage: "url('/bg-blur.jpg')" }}
        >
            {/* Top bar */}
            <div className="flex justify-between items-center p-4">
                <div>
                    <button className="bg-transparent px-4 py-2 font-bold text-black border border-black rounded-[2px]">
                        LOGO
                    </button>
                </div>
                <div>
                    <button className="text-black bg-transparent" onClick={() => setDrawerOpen((prev) => !prev)}>
                        <Menu size={34} />
                    </button>
                    {isDrawerOpen && (
                        <div className="absolute top-16 right-4 bg-white shadow-md rounded p-4 space-y-2 text-sm">
                            <Link to="/" className="block hover:underline">Home</Link>
                            <Link to="/profile" className="block hover:underline">My Profile</Link>
                            <Link to="/edit-profile" className="block hover:underline">Edit Profile</Link>
                            <Link to="/" className="block hover:underline">Logout</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Main content layout */}
            <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="w-1/4 p-6 pr-0">
                    <ul className="space-x-6 flex md:flex-col md:space-y-6">
                        {tabs.map((tab, i) => (
                            <li
                                key={tab}
                                className={`border-b-2 py-2 cursor-pointer text-black ${activeTab === tab
                                    ? "border-black font-extrabold border-b-[4px]"
                                    : "border-black"
                                    } ${i === 0 ? "border-t" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Editable form */}
                <div className="flex-1 p-4 md:p-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end pb-2 mb-4 md:mb-8">
                        <h2 className="text-3xl md:text-5xl text-black mb-2 md:mb-0">
                            Edit <span className="font-bold">Profile</span>
                        </h2>
                        <div className="border-b-[3px] border-gray-700 w-full md:w-2/5 my-2 md:my-0"></div>
                        <Link
                            to="/profile"
                            className="text-sm flex justify-end items-center gap-1 text-gray-700 w-full md:w-1/5  md:justify-center font-bold underline mt-2 md:mt-0"
                        >
                            &lt; Go back to My Profile
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="text-black w-full md:w-2/3">
                        <div className="flex flex-col md:flex-row mb-4 md:mb-8">
                            <div className="mb-4 md:mb-0 md:mr-8 flex flex-col justify-center md:justify-start items-center">
                                <div className="w-24 h-24 rounded-full bg-transparent flex items-center justify-center">
                                    <UserRound className="text-gray-700" size={72} />
                                </div>
                                <p className="text-sm underline text-gray-800 cursor-pointer pt-2 ml-2 md:ml-0 md:pt-2">Upload image</p>
                            </div>

                            <div className="flex-1 space-y-4 md:space-y-6">
                                {/* Salutation */}
                                <div>
                                    <label className="font-bold mb-1 block">Salutation*</label>
                                    <select
                                        {...register("salutation", {
                                            required: "Please select your salutation.",
                                        })}
                                        className={`w-full px-3 py-2 border-2 rounded bg-transparent text-black ${errors.salutation ? "border-red-500" : "border-black"}`}
                                    >
                                        <option value="">Select salutation</option>
                                        <option value="Mr.">Mr.</option>
                                        <option value="Ms.">Ms.</option>
                                        <option value="Mrs.">Mrs.</option>
                                    </select>
                                    {errors.salutation && (
                                        <p className="text-red-500 text-sm mt-1">{errors.salutation.message}</p>
                                    )}
                                </div>

                                {/* First Name */}
                                <div>
                                    <label className="font-bold mb-1 block">First name*</label>
                                    <input
                                        {...register("firstName", {
                                            required: "First name is required.",
                                        })}
                                        className={`w-full px-3 py-2 border-2 rounded bg-transparent text-black ${errors.firstName ? "border-red-500" : "border-black"}`}
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="font-bold mb-1 block">Last name*</label>
                                    <input
                                        {...register("lastName", {
                                            required: "Last name is required.",
                                        })}
                                        className={`w-full px-3 py-2 border-2 rounded bg-transparent text-black ${errors.lastName ? "border-red-500" : "border-black"}`}
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="font-bold mb-1 block">Email address*</label>
                                    <input
                                        {...register("email", {
                                            required: "Email is required.",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Invalid email format",
                                            },
                                        })}
                                        className={`w-full px-3 py-2 border-2 rounded bg-transparent text-black ${errors.email ? "border-red-500" : "border-black"}`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>
                                {/* Action buttons */}
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
                                    <button
                                        type="submit"
                                        disabled={!isValid}
                                        className={`bg-gray-700 text-white px-6 py-2 rounded ${!isValid && "opacity-50 cursor-not-allowed"}`}
                                    >
                                        SAVE & UPDATE
                                    </button>
                                    <Link to="/profile" className="sm:inline-block">
                                        <button type="button" className="w-full bg-transparent px-6 py-2 rounded hover:bg-gray-100 border border-black text-black">
                                            CANCEL
                                        </button>
                                    </Link>
                                </div>

                                <p className="text-xs text-gray-600 mt-2">* Mandatory field</p>
                            </div>

                        </div>


                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
