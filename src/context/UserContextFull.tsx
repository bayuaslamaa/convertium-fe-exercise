// src/context/UserContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

type Profile = {
  userid: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  salutation?: string;
  maritalStatus?: string;
  // ... add more fields as needed
};

type UserContextType = {
  profile: Profile | null;
  setProfile: (p: Profile | null) => void;
};

const UserContext = createContext<UserContextType>({
  profile: null,
  setProfile: () => { },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfileState] = useState<Profile | null>(null);

  console.log("UserProvider profile:", profile);
  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) setProfileState(JSON.parse(stored));
  }, []);

  const setProfile = (p: Profile | null) => {
    if (p) localStorage.setItem("profile", JSON.stringify(p));
    else localStorage.removeItem("profile");
    setProfileState(p);
  };

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);