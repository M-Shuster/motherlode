import { TrashIcon } from '@heroicons/react/20/solid';
import React from 'react';

interface TaskFormProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  reference: React.RefObject<HTMLInputElement>;
  onClick: () => void;
  isEditing: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLFormElement>) => void;
}

const TaskForm: React.FC<TaskFormProps> = (props) => {
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
    <div className="TasklistFormContainer">
      <form
        className="TasklistForm"
        onSubmit={props.onSubmit}
        onKeyDown={handleKeyDown}
      >
        <div className="align-center flex flex-row">
          <input
            className="form-input mb-1 mr-1 w-full rounded"
            type="text"
            placeholder="Add a task..."
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
        <div className="btn-container mt-2">
          <button
            className="mr-1 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            type="submit"
          >
            {!props.isEditing ? 'Add a task' : 'Edit Task'}
          </button>
          <button
            className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
            type="button"
            onFocus={props.onClick}
          >
            {!props.isEditing ? 'Clear tasks' : 'Cancel'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
