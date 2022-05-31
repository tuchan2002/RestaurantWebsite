import Alert from "react-bootstrap/Alert";
function AlertMessage({ info }) {
    return info === null ? null : (
        <Alert variant={info.type}>{info.message}</Alert>
    );
}

export default AlertMessage;
