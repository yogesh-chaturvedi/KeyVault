import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Loading...
    </div>

    if (!user) return <Navigate to="/login" />;

    return <Outlet />;
};

export default ProtectedRoute;
