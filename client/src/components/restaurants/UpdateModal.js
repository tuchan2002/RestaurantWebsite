import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { RestaurantContext } from "../../contexts/RestaurantContext";
import showToastMessage from "../../utils/toastMessage";
import { useParams } from "react-router-dom";

const UpdateModal = () => {
    const { id } = useParams();
    const {
        restaurantState: { restaurants },
        showUpdateModal,
        setShowUpdateModal,
        updateRestaurant,
        getUserRestaurants,
    } = useContext(RestaurantContext);

    const [updatedRestaurant, setUpdatedRestaurant] = useState(() => {
        const rest = restaurants.find(
            (restaurant) => -(-restaurant.id) === -(-id)
        );
        return rest;
    });

    // cứ mỗi lần id thay đổi nó sẽ gọi 1 lần, và setState sẽ gọi thêm 1 lần nữa
    useEffect(() => {
        const rest = restaurants.find(
            (restaurant) => -(-restaurant.id) === -(-id)
        );
        setUpdatedRestaurant(rest);
    }, [id]);

    const { name, description, address, image } = updatedRestaurant;
    console.log(updatedRestaurant);

    const onChangeNewRestaurantForm = (e) =>
        setUpdatedRestaurant({
            ...updatedRestaurant,
            [e.target.name]: e.target.value,
        });
    const onChangeNewRestaurantFileImage = (e) => {
        setUpdatedRestaurant({
            ...updatedRestaurant,
            image: e.target.files[0],
        });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("description", description);
        formData.append("image", image);
        console.log("form data", formData);
        const { success, message } = await updateRestaurant(
            formData,
            updatedRestaurant.id
        );
        setShowUpdateModal(false);
        showToastMessage(message, success ? "success" : "warning");
        getUserRestaurants();
    };
    const closeDialog = () => {
        setShowUpdateModal(false);
    };

    return (
        <Modal show={showUpdateModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Restaurant Editing!</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            name="name"
                            required
                            value={name}
                            onChange={onChangeNewRestaurantForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            name="address"
                            required
                            value={address}
                            onChange={onChangeNewRestaurantForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Description"
                            required
                            name="description"
                            value={description}
                            onChange={onChangeNewRestaurantForm}
                        />
                    </Form.Group>
                    <Form.Group className="mt-1">
                        <Form.Control
                            type="file"
                            name="image"
                            required
                            onChange={onChangeNewRestaurantFileImage}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Update!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdateModal;
