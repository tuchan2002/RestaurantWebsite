import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { BsFillGeoAltFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Restaurant.css";

function Restaurant({ restaurant: { id, name, address, image, userName } }) {
    return (
        <Link to={`/restaurant/${id}`} className="card-item-link">
            <Card className="shadow">
                <div className="overflow-hidden rounded-top position-relative">
                    <img src={image} alt="" className="card-img-top" />
                </div>
                <Card.Body className="px-3 py-2">
                    <Card.Title className="mb-0">{name}</Card.Title>
                    <div className="d-flex align-items-center justify-content-between">
                        <Card.Text className="mb-0">
                            <BsFillGeoAltFill /> {address}
                        </Card.Text>
                        <Badge pill bg="success">
                            {userName}
                        </Badge>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default Restaurant;
