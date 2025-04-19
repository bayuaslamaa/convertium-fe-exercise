import { useUser } from "../context/UserContextFull";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { profile } = useUser();
    if (profile?.userid) {
        return <Navigate to="/profile" />;
    }
    return children;
};