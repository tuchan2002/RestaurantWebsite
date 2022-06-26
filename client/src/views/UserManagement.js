import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import showToastMessage from "../utils/toastMessage";
import ReactPaginate from "react-paginate";

let dataSelected = 0;
function UserManagement() {
    const navigate = useNavigate();
    const {
        userState: { users },
        getAllUser,
        deleteUser,
        lastPage,
    } = useContext(UserContext);
    useEffect(() => {
        getAllUser(1);
    }, []);
    const handleDeleteUser = async (userId) => {
        const { success, message } = await deleteUser(userId);
        showToastMessage(message, success ? "success" : "warning");
        getAllUser(dataSelected + 1);
    };

    const handlePageClick = (data) => {
        dataSelected = data.selected;
        getAllUser(dataSelected + 1);
    };
    return (
        <>
            <Card className="shadow container mt-3">
                <Card.Body>
                    <Card.Title>User Management</Card.Title>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th style={{ width: "60px" }}>#</th>
                                <th>Username</th>
                                <th style={{ width: "50px" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{dataSelected * 8 + index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => {
                                                handleDeleteUser(user.id);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <ReactPaginate
                        onPageChange={handlePageClick}
                        pageCount={lastPage}
                        marginPagesDisplayed={3}
                        containerClassName={
                            "pagination justify-content-center my-0"
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
                </Card.Body>
            </Card>
        </>
    );
}

export default UserManagement;
