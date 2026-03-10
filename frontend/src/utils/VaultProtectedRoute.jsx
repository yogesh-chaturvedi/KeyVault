import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const VaultProtectedRoute = () => {
    const { user, vaultUnlocked, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-2xl font-semibold">
                Loading...
            </div>
        );
    }

    // 🔥 If not logged in, do nothing.
    // ProtectedRoute will handle redirect.
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (!vaultUnlocked) {
        return <Navigate to="/vaultLocked" replace />;
    }

    return <Outlet />;
};

export default VaultProtectedRoute;