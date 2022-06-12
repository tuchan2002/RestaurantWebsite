import findRestLogo from "../../assets/findRestLogo.png";
import logoutIcon from "../../assets/logout.svg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import "./NavbarMenu.css";

function NavbarMenu() {
    const {
        authState: {
            user: { username, isAdmin },
        },
        logoutUser,
    } = useContext(AuthContext);

    const logout = () => {
        logoutUser();
    };

    let isShowUserList = isAdmin === 0 ? false : true;

    return (
        <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
            <Nav.Link to="/" as={Link}>
                <Navbar.Brand className="text-white">
                    <img
                        src={findRestLogo}
                        alt="findRestLogo"
                        width="42"
                        height="42"
                        className="ms-2"
                    />
                    FindRest
                </Navbar.Brand>
            </Nav.Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link
                        className="text-white ms-3 nav-item-link"
                        to="/"
                        as={Link}
                    >
                        Home
                    </Nav.Link>
                    <Nav.Link
                        className="text-white ms-3 nav-item-link"
                        to="/dashboard"
                        as={Link}
                    >
                        My Restaurant
                    </Nav.Link>
                    <Nav.Link
                        className="text-white ms-3 nav-item-link"
                        to="/about"
                        as={Link}
                    >
                        About
                    </Nav.Link>
                    {isShowUserList && (
                        <Nav.Link
                            className="text-white ms-3 nav-item-link"
                            to="/admin"
                            as={Link}
                        >
                            User Management
                        </Nav.Link>
                    )}
                </Nav>

                <Nav className="mx-2 d-flex align-items-center">
                    Welcome
                    <Nav.Link
                        className="me-2 text-white nav-item-link"
                        to="/dashboard"
                        as={Link}
                    >
                        {username}
                    </Nav.Link>
                    <Button
                        variant="secondary"
                        className="font-weight-bolder text-white"
                        onClick={logout}
                    >
                        <img
                            src={logoutIcon}
                            alt="logoutIcon"
                            width="30"
                            height="30"
                            className="me-1"
                        />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarMenu;
