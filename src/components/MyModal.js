import { Modal } from "react-bootstrap";

const MyModal = ({ title, children, openModal, setOpenModal, size }) => {
  return (
    <div className="portfolio-modal">
      <Modal size={size} show={openModal} onHide={setOpenModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
};

export default MyModal;
