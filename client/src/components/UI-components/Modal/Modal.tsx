import "./Modal.css";

interface ModalProps {
  modalText: string;
  closeModal: () => void;
  action: () => void;
}

const Modal = ({ modalText, closeModal, action }: ModalProps) => {
  const handleCallAction = () => {
    action();
    closeModal();
  };

  return (
    <div className="modal_overlay">
      <dialog className="dialog_container" open>
        <p>{modalText} </p>
        <div className="modal_buttons">
          <button type="button" onClick={closeModal}>
            Non
          </button>
          <button type="button" onClick={handleCallAction}>
            Oui
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
