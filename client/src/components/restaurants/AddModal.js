import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { RestaurantContext } from "../../contexts/RestaurantContext";
import showToastMessage from "../../utils/toastMessage";

const AddModal = () => {
    // contexts
    const { showAddModal, setShowAddModal, addRestaurant } =
        useContext(RestaurantContext);

    // state
    const [newRestaurant, setNewRestaurant] = useState({
        name: "",
        address: "",
        description: "",
        image: "",
    });
    const { name, address, description, image } = newRestaurant;

    const onChangeNewRestaurantForm = (e) => {
        setNewRestaurant({ ...newRestaurant, [e.target.name]: e.target.value });
    };

    const onChangeNewRestaurantFileImage = (e) => {
        setNewRestaurant({
            ...newRestaurant,
            image: e.target.files[0],
        });
    };

    const closeDialog = () => {
        resetAddRestaurantData();
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("description", description);
        formData.append("image", image);
        const { success, message } = await addRestaurant(formData);
        resetAddRestaurantData();
        showToastMessage(message, success ? "success" : "warning");
    };

    const resetAddRestaurantData = () => {
        setNewRestaurant({
            name: "",
            address: "",
            description: "",
            image: "",
        });
        setShowAddModal(false);
    };
    return (
        <Modal show={showAddModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Create the restaurant you want!</Modal.Title>
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
                            name="description"
                            required
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
                        Create!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddModal;
