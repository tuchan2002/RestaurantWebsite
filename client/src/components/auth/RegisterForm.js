import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "../layout/AlertMessage";
import { AuthContext } from "../../contexts/AuthContext";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

function RegisterForm() {
    // context
    const { registerUser } = useContext(AuthContext);

    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        password_confirmation: "",
    });

    const onChangeRegisterForm = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    };

    const [alert, setAlert] = useState(null);

    const navigate = useNavigate();
    const register = async (e) => {
        e.preventDefault();

        if (registerForm.password !== registerForm.password_confirmation) {
            setAlert({ type: "danger", message: "Password do not match" });
            setTimeout(() => {
                setAlert(null);
            }, 5000);
            return;
        }
        try {
            const registerData = await registerUser(registerForm);
            if (registerData.success) {
                navigate("/dashboard");
            } else {
                setAlert({ type: "danger", message: registerData.message });
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
            <Form className="my-3" onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-2">
                    <FloatingLabel controlId="floatingInput" label="Username">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={onChangeRegisterForm}
                            value={registerForm.username}
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
                            onChange={onChangeRegisterForm}
                            value={registerForm.password}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-2">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Confirm Password"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="password_confirmation"
                            onChange={onChangeRegisterForm}
                            value={registerForm.password_confirmation}
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Button variant="success" type="submit" size="lg">
                    Register
                </Button>
            </Form>
            <p>
                Already have an account?
                <Link to="/login">
                    <Button variant="info" size="sm" className="mx-2">
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
}

export default RegisterForm;
