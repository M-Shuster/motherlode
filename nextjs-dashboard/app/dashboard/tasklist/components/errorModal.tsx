import { XMarkIcon } from '@heroicons/react/20/solid';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalClassName: string;
}

const ErrorModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
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
              className="relative bottom-4 left-4 h-6 w-6"
              onClick={onClose}
            >
              <XMarkIcon className="text-red-800 peer-focus:text-red-800" />
            </button>
          </div>
          <div className="position: relative bottom-4">
            <p>All random tasks already exist in the list.</p>
            <p>Please complete some before generating more.</p>
          </div>
          <button
            className="rounded bg-red-800 px-2 py-1 text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ErrorModal;
