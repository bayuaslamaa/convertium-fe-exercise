import { Menu, Pen, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContextFull";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("Basic Details");
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const user = {
        salutation: "Mr.",
        firstName: "John",
        lastName: "Doe Jr.",
        email: "johndoe@anyemail.com",
        maritalStatus: "Married", // for spouse tab
    };

    const tabs = [
        "Basic Details",
        "Additional Details",
        ...(user.maritalStatus === "Married" ? ["Spouse Details"] : []),
        "Personal Preferences",
    ];
    const { profile, setProfile } = useUser();

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
                            <Link to="/" className="block hover:underline">
                                Home
                            </Link>
                            <Link to="/profile" className="block hover:underline">
                                My Profile
                            </Link>
                            <Link to="/edit-profile" className="block hover:underline">
                                Edit Profile
                            </Link>
                            <Link to="/" className="block hover:underline" onClick={() => {
                                localStorage.removeItem("keepLoggedIn");
                                document.cookie = "keepLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                setProfile(null);
                            }}>
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Layout */}
            <div className="flex flex-col md:flex-row">
                {/* Left Sidebar - Categories */}
                <div className="w-1/4 p-6 pr-0">
                    <ul className="space-x-6 flex md:flex-col md:space-y-6">
                        {tabs.map((tab, i) => (
                            <li
                                key={tab}
                                className={`border-b-2 py-2 cursor-pointer text-black ${activeTab === tab ? "border-black font-extrabold border-b-[4px]" : "border-black"
                                    } ${i === 0 ? "border-t" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 md:p-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end pb-2 mb-4 md:mb-8">
                        <h2 className="text-3xl md:text-5xl text-black mb-2 md:mb-0">
                            My <span className="font-bold">Profile</span>
                        </h2>
                        <div className="border-b-[3px] border-gray-700 w-full md:w-2/5 my-2 md:my-0"></div>
                        <Link
                            to="/edit-profile"
                            className="text-sm flex items-center justify-end gap-1 text-gray-700 w-full md:w-1/5  md:justify-center font-bold underline mt-2 md:mt-0"
                        >
                            Edit profile <span><Pen /></span>
                        </Link>
                    </div>

                    {/* Profile Details */}
                    {activeTab === "Basic Details" && (
                        <div className="flex flex-col md:flex-row">
                            <div className="mb-4 md:mb-0 md:mr-8 flex justify-center md:justify-start">
                                <div className="w-24 h-24 rounded-full bg-transparent flex items-center justify-center">
                                    <UserRound className="text-gray-700" size={72} />
                                </div>
                            </div>
                            <div className="flex-1 space-y-4 md:space-y-6 text-black">
                                <div>
                                    <div className="font-bold mb-1">Salutation*</div>
                                    <div>{profile?.salutation || "-"}</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">First name*</div>
                                    <div>{profile?.firstName || "-"}</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">Last name*</div>
                                    <div>{profile?.lastName || "-"}</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">Email address*</div>
                                    <div>{profile?.email || "-"}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placeholder tabs */}
                    {activeTab !== "Basic Details" && (
                        <p className="text-gray-600">[ {activeTab} content here ]</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
