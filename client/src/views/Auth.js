import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";

function Auth({ authRoute }) {
    const {
        authState: { isAuthenticated, authLoading },
    } = useContext(AuthContext);

    let body = null;
    if (authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (isAuthenticated) {
        return <Navigate to="/" />;
    } else {
        body = (
            <>
                {authRoute === "login" && <LoginForm />}
                {authRoute === "register" && <RegisterForm />}
            </>
        );
    }
    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>FindRest</h1>
                    <h4>Help you better understand the restaurants</h4>
                    {body}
                </div>
            </div>
        </div>
    );
}

export default Auth;
