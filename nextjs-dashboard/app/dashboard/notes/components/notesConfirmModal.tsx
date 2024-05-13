import { XMarkIcon } from '@heroicons/react/20/solid';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modalClassName: string;
}

const NotesConfirmModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  modalClassName,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className={`modal ${
          modalClassName ? modalClassName : ''
        } fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50`}
      >
        <div className="modal-content rounded-lg bg-white p-8">
          <div className="items-right flex w-full justify-end">
            <button
              className="relative bottom-4 left-4 h-[28px] w-[28px]"
              onClick={onClose}
            >
              <XMarkIcon className="rounded-2xl text-slate-700 transition duration-300 ease-out hover:bg-slate-200 hover:text-slate-900 hover:ease-in peer-focus:text-red-800" />
            </button>
          </div>
          <div className="position: relative bottom-4">
            <p>Are you sure you want to clear all notes?</p>
          </div>
          <button
            className="mr-4 min-w-[100px] rounded bg-red-800 px-2 py-1 text-white placeholder:rounded hover:font-bold"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="min-w-[100px] rounded  bg-slate-200 px-2 py-1 text-slate-700 hover:font-bold hover:text-slate-900"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default NotesConfirmModal;
