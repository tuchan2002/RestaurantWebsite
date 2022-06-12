import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { userReducer } from "../reducers/userReducer";
import {
    API_URL,
    DELETE_USER,
    USERS_LOADED_FAIL,
    USERS_LOADED_SUCCESS,
} from "./constants";

export const UserContext = createContext();

function UserContextProvider({ children }) {
    const [userState, dispatch] = useReducer(userReducer, {
        users: [],
    });

    const [lastPage, setLastPage] = useState(null);

    const getAllUser = async (pageNumber = 1) => {
        try {
            const response = await axios.get(
                `${API_URL}/users?page=${pageNumber}`
            );
            if (response.data.success) {
                const responseDataUsers = response.data.users;
                dispatch({
                    type: USERS_LOADED_SUCCESS,
                    payload: responseDataUsers.data,
                });
                setLastPage(responseDataUsers.last_page);
            }
        } catch (error) {
            dispatch({ type: USERS_LOADED_FAIL });
        }
    };

    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${API_URL}/users/${userId}`);
            if (response.data.success) {
                dispatch({
                    type: DELETE_USER,
                    payload: userId,
                });
            }
            return response.data;
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    // context data
    const userContextData = { userState, getAllUser, deleteUser, lastPage };

    return (
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
