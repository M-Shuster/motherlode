import { TrashIcon } from '@heroicons/react/20/solid';
import React from 'react';

interface NoteFormProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  reference: React.RefObject<HTMLInputElement>;
  onClick: () => void;
  isEditing: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLFormElement>) => void;
}

const NoteForm: React.FC<NoteFormProps> = (props) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.onSubmit(e);
    }
  };
  const handleButtonClick = () => {
    const syntheticEvent = {
      target: {
        value: '',
      },
    } as React.ChangeEvent<HTMLInputElement>;

    props.onChange(syntheticEvent);
  };

  return (
    <div className="NoteFormContainer w-full rounded-xl bg-slate-100 p-4 shadow-md ">
      <form
        className="NoteForm"
        onSubmit={props.onSubmit}
        onKeyDown={handleKeyDown}
      >
        <div className="align-center flex flex-row">
          <input
            className="form-input mb-1 mr-1 w-full rounded"
            type="text"
            placeholder="Add a note..."
            value={props.value}
            onChange={props.onChange}
            ref={props.reference}
            required
          />
          <button
            className="clearInput-btn mb-1 rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
            onClick={handleButtonClick}
          >
            <TrashIcon className="w-5" />
          </button>
        </div>
        <div className="btn-container mt-2 flex flex-row justify-between">
          <button
            className="mr-1 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            type="submit"
          >
            {!props.isEditing ? 'Take note' : 'Edit note'}
          </button>

          <button
            className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
            type="button"
            onFocus={props.onClick}
          >
            {!props.isEditing ? 'Clear notes' : 'Cancel'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
