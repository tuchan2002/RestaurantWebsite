import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Restaurant from "../components/restaurants/Restaurant";
import { RestaurantContext } from "../contexts/RestaurantContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import addIcon from "../assets/addBtn.svg";
import AddModal from "../components/restaurants/AddModal";
import ReactPaginate from "react-paginate";

function Dashboard() {
    // contexts
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);

    const {
        restaurantState: { restaurants, restaurantsLoading },
        getUserRestaurants,
        setShowAddModal,
        lastPage,
    } = useContext(RestaurantContext);

    useEffect(() => {
        getUserRestaurants(1);
    }, []);

    const handlePageClick = (data) => {
        getUserRestaurants(data.selected + 1);
    };

    let body = null;
    if (restaurantsLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (restaurants.length === 0) {
        body = (
            <Card className="text-center mx-5 my-5">
                <Card.Header as="h1">Hi {username} !</Card.Header>
                <Card.Body>
                    <Card.Title>Welcome to FindRest</Card.Title>
                    <Card.Text>
                        Click the button below to post a new restaurant.
                    </Card.Text>
                    <Button
                        variant="primary"
                        onClick={setShowAddModal.bind(this, true)}
                    >
                        Let's start!
                    </Button>
                </Card.Body>
            </Card>
        );
    } else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 row-cols-xl-4 mx-auto mt-1">
                    {restaurants.map((restaurant) => (
                        <Col key={restaurant.id} className="my-1">
                            <Restaurant restaurant={restaurant} />
                        </Col>
                    ))}
                </Row>
                <ReactPaginate
                    onPageChange={handlePageClick}
                    pageCount={lastPage}
                    marginPagesDisplayed={3}
                    containerClassName={
                        "pagination justify-content-center mt-1"
                    }
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                    renderOnZeroPageCount={null}
                />
                <OverlayTrigger
                    placement="left"
                    overlay={<Tooltip>Add a new restaurant</Tooltip>}
                >
                    <Button
                        className="btn-floating"
                        onClick={setShowAddModal.bind(this, true)}
                    >
                        <img
                            src={addIcon}
                            alt="add-post"
                            width="60"
                            height="60"
                        />
                    </Button>
                </OverlayTrigger>
            </>
        );
    }

    return (
        <>
            {body}
            <AddModal />
        </>
    );
}

export default Dashboard;
