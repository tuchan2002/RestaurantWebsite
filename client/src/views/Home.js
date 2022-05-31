import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Restaurant from "../components/restaurants/Restaurant";
import { RestaurantContext } from "../contexts/RestaurantContext";
import { useContext, useEffect } from "react";
import ReactPaginate from "react-paginate";

function Home() {
    const {
        restaurantState: { restaurant, restaurants },
        getRestaurants,
        lastPage,
    } = useContext(RestaurantContext);

    useEffect(() => {
        getRestaurants(1);
    }, []);

    const handlePageClick = (data) => {
        getRestaurants(data.selected + 1);
    };
    return (
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
                containerClassName={"pagination justify-content-center mt-1"}
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
        </>
    );
}

export default Home;
