import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PrivateRoute } from "../components/PrivateRoute";
import { PublicRoute } from "../components/PublicRoute";

// Lazy load components for better performance
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const EditProfilePage = lazy(() => import("../pages/EditProfilePage"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
    <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    </div>
);

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
                    <Route path="/register" element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    } />

                    {/* Protected routes */}
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    } />
                    <Route path="/edit-profile" element={
                        <PrivateRoute>
                            <EditProfilePage />
                        </PrivateRoute>
                    } />

                    {/* 404 page */}
                    <Route path="/404" element={<NotFound />} />

                    {/* Redirect any unknown routes to 404 */}
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;
