import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

function LoginForm() {
    // context
    const { loginUser } = useContext(AuthContext);

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    const [alert, setAlert] = useState(null);

    const onChangeLoginForm = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                navigate("/");
            } else {
                setAlert({ type: "danger", message: loginData.message });
                setTimeout(() => {
                    setAlert(null);
                }, 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Form className="my-3" onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-2">
                    <FloatingLabel controlId="floatingInput" label="Username">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={onChangeLoginForm}
                            value={loginForm.username}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-2">
                    <FloatingLabel controlId="floatingInput" label="Password">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={onChangeLoginForm}
                            value={loginForm.password}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Button variant="success" type="submit" size="lg">
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?
                <Link to="/register">
                    <Button variant="info" size="sm" className="mx-2">
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
}

export default LoginForm;
