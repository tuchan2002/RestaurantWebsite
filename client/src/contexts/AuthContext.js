import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    // authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const response = await axios.get(`${API_URL}/auth`);
            if (response.data.success) {
                dispatch({
                    type: "SET_AUTH",
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: "SET_AUTH",
                payload: { isAuthenticated: false, user: null },
            });
        }
    };

    useEffect(() => {
        console.log("loadUser");
        loadUser();
    }, []);

    // login
    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(
                `${API_URL}/auth/login`,
                userForm
            );
            if (response.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );
                await loadUser();
                return response.data;
            }
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else {
                return { success: false, message: error.message };
            }
        }
    };

    // register
    const registerUser = async (userForm) => {
        try {
            const response = await axios.post(
                `${API_URL}/auth/register`,
                userForm
            );
            if (response.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );
                await loadUser();
                return response.data;
            }
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else {
                return { success: false, message: error.message };
            }
        }
    };

    // logout
    const logoutUser = async () => {
        try {
            const response = await axios.post(`${API_URL}/auth/logout`);
            if (response.data.success) {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
                dispatch({
                    type: "SET_AUTH",
                    payload: { isAuthenticated: false, user: null },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // context data
    const authContextData = { loginUser, registerUser, logoutUser, authState };

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
