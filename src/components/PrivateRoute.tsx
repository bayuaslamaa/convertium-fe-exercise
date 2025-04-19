// src/components/PrivateRoute.tsx
import { useUser } from "../context/UserContextFull";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useUser();
  console.log("PrivateRoute profile:", profile);
  if (!profile?.userid) {
    return <Navigate to="/" />;
  }
  return children;
};