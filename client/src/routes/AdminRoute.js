import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function AdminRoute({ children }) {
    const {
        authState: {
            user: { isAdmin },
        },
    } = useContext(AuthContext);
    return isAdmin ? <>{children}</> : <Navigate to="" />;
}

export default AdminRoute;
