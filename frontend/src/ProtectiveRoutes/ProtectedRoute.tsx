
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store/Store";

export const ProtectedRoutes = () => {
    const user = useSelector((state: RootState) => state.user.user);
    return user?._id ? <Outlet /> : <Navigate to="/signin" />;
};

export const NormalRoutes = () => {
    const user = useSelector((state: RootState) => state.user.user);
    return !user?._id ? <Outlet /> : <Navigate to="/" />;
};



