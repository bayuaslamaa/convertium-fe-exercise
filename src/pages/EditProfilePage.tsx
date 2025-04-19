import { Menu, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getProfileByUserId, updateProfileByUserId } from "../services/profile";
import { useUser } from "../context/UserContextFull";

const EditProfilePage = () => {
    const [activeTab, setActiveTab] = useState("Basic Details");
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, watch, formState: { errors, } } = useForm();
    const maritalStatus = watch("maritalStatus");

    const tabs = [
        "Basic Details",
        "Additional Details",
        "Spouse Details",
        "Personal Preferences"
    ];

    const { profile, setProfile } = useUser();

    useEffect(() => {
        if (!profile?.userid) {
            return;
        }
        const userid = profile?.userid as string;
        getProfileByUserId(userid).then(({ data }) => {
            if (data) {
                // Basic Details
                setValue("firstname", data.firstname);
                setValue("lastname", data.lastname);
                setValue("email", data.email);
                setValue("salutation", data.salutation);

                // Additional Details
                setValue("dateOfBirth", data.dateOfBirth);
                setValue("gender", data.gender);
                setValue("phoneNumber", data.phoneNumber);
                setValue("address", data.address);
                setValue("maritalStatus", data.maritalStatus);
                setValue("country", data.country);

                // Spouse Details
                setValue("spouseSalutation", data.spouseSalutation);
                setValue("spouseName", data.spouseName);
                setValue("anniversaryDate", data.anniversaryDate);

                // Personal Preferences
                setValue("hobbies", data.hobbies?.join(", "));
                setValue("favoriteSports", data.favoriteSports?.join(", "));
                setValue("favoriteMusicGenres", data.favoriteMusicGenres?.join(", "));
                setValue("preferredMovies", data.preferredMovies?.join(", "));
            }
        });
    }, [profile, setValue]);

    const onSubmit = async (data: any) => {
        const userid = profile?.userid;
        if (!userid) {
            return;
        }

        // Format array fields properly
        const formattedData = {
            ...data,
            hobbies: data.hobbies ? data.hobbies.split(",").map((item: string) => item.trim()) : [],
            favoriteSports: data.favoriteSports ? data.favoriteSports.split(",").map((item: string) => item.trim()) : [],
            favoriteMusicGenres: data.favoriteMusicGenres ? data.favoriteMusicGenres.split(",").map((item: string) => item.trim()) : [],
            preferredMovies: data.preferredMovies ? data.preferredMovies.split(",").map((item: string) => item.trim()) : [],
        };

        const { profile: updatedProfile, error } = await updateProfileByUserId(userid, formattedData);
        if (!error) {
            alert("Profile updated!");
            navigate("/profile");
        }
        if (updatedProfile) {
            setProfile(updatedProfile);
            localStorage.setItem("profile", JSON.stringify(updatedProfile));
            navigate("/profile");
        }
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
                            className="text-sm flex justify-end items-center gap-1 text-gray-700 w-full md:w-1/5 md:justify-center font-bold underline mt-2 md:mt-0"
                        >
                            &lt; Go back to My Profile
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="text-black w-full md:w-2/3">
                        {/* Basic Details Tab */}
                        {activeTab === "Basic Details" && (
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
                                            <p className="text-red-500 text-sm mt-1">{errors.salutation.message?.toString()}</p>
                                        )}
                                    </div>

                                    {/* First Name */}
                                    <div>
                                        <label className="font-bold mb-1 block">First name*</label>
                                        <input
                                            {...register("firstname", {
                                                required: "First name is required.",
                                            })}
                                            className={`w-full px-3 py-2 border-2 rounded bg-transparent text-black ${errors.firstname ? "border-red-500" : "border-black"}`}
                                        />
                                        {errors.firstname && (
                                            <p className="text-red-500 text-sm mt-1">{errors.firstname.message?.toString()}</p>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="font-bold mb-1 block">Last name*</label>
                                        <input
                                            {...register("lastname", {
                                                required: "Last name is required.",
                                            })}
                                            className={`w-full px-3 py-2 border-2 rounded bg-transparent text-black ${errors.lastname ? "border-red-500" : "border-black"}`}
                                        />
                                        {errors.lastname && (
                                            <p className="text-red-500 text-sm mt-1">{errors.lastname.message?.toString()}</p>
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
                                            <p className="text-red-500 text-sm mt-1">{errors.email.message?.toString()}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Additional Details Tab */}
                        {activeTab === "Additional Details" && (
                            <div className="flex-1 space-y-4 md:space-y-6">
                                {/* Date of Birth */}
                                <div>
                                    <label className="font-bold mb-1 block">Date of birth</label>
                                    <input
                                        type="date"
                                        {...register("dateOfBirth")}
                                        className="w-full px-3 py-2 border-2 rounded bg-transparent text-black border-black"
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="font-bold mb-1 block">Gender</label>
                                    <select
                                        {...register("gender")}
                                        className="w-full px-3 py-2 border-2 rounded bg-transparent text-black border-black"
                                    >
                                        <option value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                    </select>
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="font-bold mb-1 block">Phone number</label>
                                    <input
                                        {...register("phoneNumber")}
                                        className="w-full px-3 py-2 border-2 rounded bg-transparent text-black border-black"
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="font-bold mb-1 block">Address</label>
                                    <textarea
                                        {...register("address")}
                                        className="w-full px-3 py-2 border-2 rounded bg-transparent text-black border-black"
                                        rows={3}
                                    />
                                </div>

                                {/* Marital Status */}
                                <div>
                                    <label className="font-bold mb-1 block">Marital status</label>
                                    <select
                                        {...register("maritalStatus")}
                                        className="w-full px-3 py-2 border-2 rounded bg-transparent text-black border-black"
                                    >
                                        <option value="">Select marital status</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Widowed">Widowed</option>
                                    </select>
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="font-bold mb-1 block">Country</label>
                                    <input
                                        {...register("country")}
                                        className="w-full px-3 py-2 border-2 rounded bg-transparent text-black border-black"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Spouse Details Tab */}
                        {activeTab === "Spouse Details" && (
                            <div className="flex-1 space-y-4 md:space-y-6">
                                {/* Spouse Salutation */}
                                <div>
                                    <label className="font-bold mb-1 block">Spouse salutation</label>
                                    <select
                                        {...register("spouseSalutation")}
                                        className="w-full px-3 py-2 border-2 rounded bg-transparent text-black border-black"
                                        disabled={maritalStatus !== "Married"}
                                    >
                                        <option value="">Select salutation</option>
                                        <option value="Mr.">Mr.</option>
                                        <option value="Ms.">Ms.</option>
                                        <option value="Mrs.">Mrs.</option>
                                    </select>
                                    {maritalStatus !== "Married" && (
                                        <p className="text-amber-600 text-sm mt-1">Please select "Married" in Additional Details to enable spouse information.</p>
                                    )}
                                </div>

                                {/* Spouse Name */}
                                <div>
                                    <label className="font-bold mb-1 block">Spouse name</label>
                                    <input
                                        {...register("spouseName")}
                                        className="w-full px-3 py-2 border-2 rounded bg-transparent text-black border-black"
                                        disabled={maritalStatus !== "Married"}
                                    />
                                </div>

                                {/* Anniversary Date */}
                                <div>
                                    <label className="font-bold mb-1 block">Anniversary date</label>
                                    <input
                                        type="date"
                                        {...register("anniversaryDate")}
                                        className="w-full px-3 py-2 border-2 rounded bg-transparent text-black border-black"
                                        disabled={maritalStatus !== "Married"}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Personal Preferences Tab */}
                        {activeTab === "Personal Preferences" && (
                            <div className="flex-1 space-y-4 md:space-y-6">
                                {/* Hobbies */}
                                <div>
                                    <label className="font-bold mb-1 block">Hobbies and interests</label>
                                    <textarea
                                        {...register("hobbies")}
                                        className="w-full px-3 py-2 border-2 rounded bg-transparent text-black border-black"
                                        rows={2}
                                        placeholder="Separate with commas (e.g. Reading, Swimming, Cooking)"
                                    />
                                </div>

                                {/* Favorite Sports */}
                                <div>
                                    <label className="font-bold mb-1 block">Favorite sports</label>
                                    <textarea
                                        {...register("favoriteSports")}
                                        className="w-full px-3 py-2 border-2 rounded bg-transparent text-black border-black"
                                        rows={2}
                                        placeholder="Separate with commas (e.g. Football, Tennis, Basketball)"
                                    />
                                </div>

                                {/* Favorite Music Genres */}
                                <div>
                                    <label className="font-bold mb-1 block">Favorite music genres</label>
                                    <textarea
                                        {...register("favoriteMusicGenres")}
                                        className="w-full px-3 py-2 border-2 rounded bg-transparent text-black border-black"
                                        rows={2}
                                        placeholder="Separate with commas (e.g. Rock, Jazz, Classical)"
                                    />
                                </div>

                                {/* Preferred Movies */}
                                <div>
                                    <label className="font-bold mb-1 block">Preferred movies</label>
                                    <textarea
                                        {...register("preferredMovies")}
                                        className="w-full px-3 py-2 border-2 rounded bg-transparent text-black border-black"
                                        rows={2}
                                        placeholder="Separate with commas (e.g. Action, Drama, Comedy)"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Action buttons - shown for all tabs */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-8">
                            <button
                                type="submit"
                                className="bg-gray-700 text-white px-6 py-2 rounded"
                            >
                                SAVE & UPDATE
                            </button>
                            <Link to="/profile" className="sm:inline-block">
                                <button type="button" className="w-full bg-transparent px-6 py-2 rounded hover:bg-gray-100 border border-black text-black">
                                    CANCEL
                                </button>
                            </Link>
                        </div>

                        <p className="text-xs text-gray-600 mt-4">* Mandatory field</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
