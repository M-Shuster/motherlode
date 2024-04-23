import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to clear all tasks?</p>
        <p>This will delete all tasks, even completed ones.</p>
        <button className="mr-1" onClick={onConfirm}>
          Confirm
        </button>
        <button className="mr-1" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
