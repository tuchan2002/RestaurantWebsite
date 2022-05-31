import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailRestaurantCard from "../components/restaurants/DetailRestaurantCard";
import UpdateModal from "../components/restaurants/UpdateModal";
import { RestaurantContext } from "../contexts/RestaurantContext";

function DetailRestaurant() {
    const { id } = useParams();

    const {
        restaurantState: { restaurants },
    } = useContext(RestaurantContext);
    const [detailRestaurant, setDetailRestaurant] = useState([]);

    useEffect(() => {
        const newArr = restaurants.filter(
            (restaurant) => -(-restaurant.id) === -(-id)
        );
        setDetailRestaurant(newArr);
    }, [id, restaurants]);

    return (
        <>
            {detailRestaurant.map((restaurant) => (
                <DetailRestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                />
            ))}
            <UpdateModal />
        </>
    );
}

export default DetailRestaurant;
