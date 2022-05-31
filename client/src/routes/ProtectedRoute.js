import { useContext } from "react";
import { Navigate } from "react-router-dom";
import NavbarMenu from "../components/layout/NavbarMenu";
import { AuthContext } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);
    return isAuthenticated ? (
        <>
            <NavbarMenu />
            {children}
        </>
    ) : (
        <Navigate to="/login" />
    );
}

export default ProtectedRoute;
