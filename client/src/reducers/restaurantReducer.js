import {
    RESTAURANTS_LOADED_SUCCESS,
    RESTAURANTS_LOADED_FAIL,
    FIND_RESTAURANT,
    ADD_RESTAURANT,
    DELETE_RESTAURANT,
    UPDATE_RESTAURANT,
} from "../contexts/constants";

export const restaurantReducer = (state, action) => {
    const { type, payload } = action;
    console.log(state);
    switch (type) {
        case RESTAURANTS_LOADED_SUCCESS:
            return {
                ...state,
                restaurants: payload,
                restaurantsLoading: false,
            };
        case RESTAURANTS_LOADED_FAIL:
            return {
                ...state,
                restaurants: [],
                restaurantsLoading: false,
            };
        case ADD_RESTAURANT:
            return {
                ...state,
                restaurants: [...state.restaurants, payload],
            };
        case DELETE_RESTAURANT:
            return {
                ...state,
                restaurants: state.restaurants.filter(
                    (rest) => rest.id !== payload
                ),
            };
        case UPDATE_RESTAURANT:
            const newRests = state.restaurants.map((rest) => {
                return rest.id === payload.id ? payload : rest;
            });

            return {
                ...state,
                posts: newRests,
            };
        case FIND_RESTAURANT:
            console.log("find restaurant");
            return {
                ...state,
                restaurant: payload,
            };
        default:
            return state;
    }
};
