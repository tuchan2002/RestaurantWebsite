import {
    USERS_LOADED_SUCCESS,
    USERS_LOADED_FAIL,
    DELETE_USER,
} from "../contexts/constants";

export const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case USERS_LOADED_SUCCESS:
            return {
                ...state,
                users: payload,
            };
        case USERS_LOADED_FAIL:
            return {
                ...state,
                users: [],
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== payload),
            };
        default:
            return state;
    }
};
