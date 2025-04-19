import { useUser } from "../context/UserContextFull";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useUser();

  // Check for profile or "Keep me logged in" cookie/localStorage
  const keepLoggedIn = localStorage.getItem("keepLoggedIn") === "true" &&
    document.cookie.includes("keepLoggedIn=true");

  if (!profile?.userid && !keepLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};