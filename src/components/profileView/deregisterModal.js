import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const DeRegisterModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm to deregister
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ textAlign: "center" }}>Do you want to continue?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={props.handleDeregister}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
