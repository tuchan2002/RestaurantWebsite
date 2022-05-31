import "./DetailRestaurantCard.css";
import { BsFillGeoAltFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { RestaurantContext } from "../../contexts/RestaurantContext";
import showToastMessage from "../../utils/toastMessage";
import { useNavigate } from "react-router-dom";

function DetailRestaurantCard({ restaurant }) {
    const navigate = useNavigate();
    const { deleteRestaurant, setShowUpdateModal, getARestaurant } =
        useContext(RestaurantContext);
    const handleDeleteRestaurant = async () => {
        const { success, message } = await deleteRestaurant(restaurant.id);
        showToastMessage(message, success ? "success" : "warning");
        if (success) {
            navigate("/");
        }
    };

    const handleOpenUpdateModal = async () => {
        const { success, message } = await getARestaurant(restaurant.id);
        if (!success) {
            showToastMessage(message, success ? "success" : "warning");
        } else {
            setShowUpdateModal(true);
        }
    };

    return (
        <>
            <Card className="shadow container mt-3">
                <Card.Body className="px-3 py-2 detail-restaurant-wrapper">
                    <div className="detail-restaurant-image">
                        <img src={restaurant.image} alt="" />
                    </div>
                    <div className="detail-restaurant-content">
                        <h2 className="mb-0">{restaurant.name}</h2>
                        <div className="d-flex align-items-center mb-1">
                            <p className="mb-0 me-1">Shared by</p>
                            <Badge pill bg="success">
                                {restaurant.userName}
                            </Badge>
                        </div>

                        <Card.Text>
                            <BsFillGeoAltFill /> {restaurant.address}
                        </Card.Text>
                        <Card.Text>{restaurant.description}</Card.Text>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Button
                        className="me-2"
                        variant="danger"
                        onClick={handleDeleteRestaurant}
                    >
                        Delete
                    </Button>
                    <Button variant="warning" onClick={handleOpenUpdateModal}>
                        Edit
                    </Button>
                </Card.Footer>
            </Card>
        </>
    );
}

export default DetailRestaurantCard;
