import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p className="text-3xl font-bold justify-center items-center flex">Loading...</p>;

    if (!user) return <Navigate to="/login" />;

    return <Outlet />;
};

export default ProtectedRoute;
