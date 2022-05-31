import { createContext, useReducer, useState } from "react";
import { restaurantReducer } from "../reducers/restaurantReducer";
import {
    API_URL,
    RESTAURANTS_LOADED_FAIL,
    RESTAURANTS_LOADED_SUCCESS,
    ADD_RESTAURANT,
    DELETE_RESTAURANT,
    UPDATE_RESTAURANT,
} from "./constants";
import axios from "axios";

export const RestaurantContext = createContext();
const RestaurantContextProvider = ({ children }) => {
    const [restaurantState, dispatch] = useReducer(restaurantReducer, {
        restaurant: null,
        restaurants: [],
        restaurantsLoading: true,
    });

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [lastPage, setLastPage] = useState(null);
    // get all restaurants
    const getRestaurants = async (pageNumber = 1) => {
        console.log("GET ALL REST");
        try {
            const response = await axios.get(
                `${API_URL}/restaurants?page=${pageNumber}`
            );
            if (response.data.success) {
                const responseDataRest = response.data.restaurants;
                dispatch({
                    type: RESTAURANTS_LOADED_SUCCESS,
                    payload: responseDataRest.data,
                });
                setLastPage(responseDataRest.last_page);
            }
        } catch (error) {
            dispatch({ type: RESTAURANTS_LOADED_FAIL });
        }
    };

    // get all restaurants
    const getUserRestaurants = async (pageNumber = 1) => {
        console.log("GET USER REST");
        try {
            const response = await axios.get(
                `${API_URL}/restaurants/owned?page=${pageNumber}`
            );
            if (response.data.success) {
                const responseDataRest = response.data.restaurants;
                dispatch({
                    type: RESTAURANTS_LOADED_SUCCESS,
                    payload: responseDataRest.data,
                });
                setLastPage(responseDataRest.last_page);
            }
        } catch (error) {
            dispatch({ type: RESTAURANTS_LOADED_FAIL });
        }
    };

    // add restaurant
    const addRestaurant = async (newRestaurant) => {
        try {
            const response = await axios.post(
                `${API_URL}/restaurants`,
                newRestaurant
            );
            if (response.data.success) {
                dispatch({
                    type: ADD_RESTAURANT,
                    payload: response.data.newRestaurant,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    // delete restaurant
    const deleteRestaurant = async (restaurantId) => {
        try {
            const response = await axios.delete(
                `${API_URL}/restaurants/${restaurantId}`
            );
            if (response.data.success) {
                dispatch({ type: DELETE_RESTAURANT, payload: restaurantId });
            }
            return response.data;
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    // update restaurant
    const updateRestaurant = async (updatedRestaurant, restaurantId) => {
        try {
            // PUT METHOD
            const response = await axios.post(
                `${API_URL}/restaurants/${restaurantId}`,
                updatedRestaurant
            );

            if (response.data.success) {
                dispatch({
                    type: UPDATE_RESTAURANT,
                    payload: response.data.restaurant,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    // get a restaurant
    const getARestaurant = async (restaurantId) => {
        try {
            const response = await axios.get(
                `${API_URL}/restaurants/${restaurantId}`
            );
            return response.data;
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    const restaurantContextData = {
        restaurantState,
        getRestaurants,
        getUserRestaurants,
        showAddModal,
        setShowAddModal,
        addRestaurant,
        deleteRestaurant,
        updateRestaurant,
        showUpdateModal,
        setShowUpdateModal,
        getARestaurant,
        lastPage,
        setLastPage,
    };

    return (
        <RestaurantContext.Provider value={restaurantContextData}>
            {children}
        </RestaurantContext.Provider>
    );
};

export default RestaurantContextProvider;
