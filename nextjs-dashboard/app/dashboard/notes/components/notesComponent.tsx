import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NoteForm from './noteForm';
import NotesContainer from './notesContainer';
import { tiltNeon } from '@/app/ui/fonts';
import {
  ListBulletIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';

interface Note {
  id: string;
  title: string;
  visible: boolean;
}

const NotesComponent: React.FC = () => {
  const initialNoteState = (): Note[] => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('Notes') || '[]') || [];
    }
    return [];
  };

  const [notes, setNotes] = useState<Note[]>(initialNoteState);

  useEffect(() => {
    const initialNotes = initialNoteState();
    setNotes(initialNotes);
  }, []);

  const [newNote, setNewNote] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewNote(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNote === '') return;
    if (!isEditing) {
      const newNoteArr = [
        ...notes,
        { id: uuidv4(), title: newNote, visible: true },
      ];
      setNotes(newNoteArr);
      setNewNote('');
      if (inputRef.current) inputRef.current.focus();
    } else {
      const newArr = notes.slice();
      const indexArr = newArr.map((arr) => arr.id);
      const index = indexArr.indexOf(editId);
      newArr.splice(index, 1, { id: editId, title: newNote, visible: true });
      setNotes(newArr);
      setNewNote('');
      setEditId('');
      setIsEditing(false);
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleEdit = (id: string) => {
    const item = notes.find((note) => note.id === id);
    if (item) {
      setNewNote(item.title);
      setIsEditing(true);
      setEditId(item.id);
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleDelete = (id: string) => {
    setNotes((prevState) => prevState.filter((note) => note.id !== id));
  };

  const handleClear = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewNote('');
    setEditId('');
    if (inputRef.current) inputRef.current.focus();
  };

  const noteStyle = {
    fontWeight: '400',
    fontStyle: 'italic',
    display: 'inline-block',
    minHeight: '150px',
    minWidth: '150px',
  };

  const NoteList = notes.map((note) => {
    return (
      <li
        className="list mb-2 flex  w-full flex-row items-center justify-between rounded-lg bg-slate-50 hover:bg-slate-200"
        style={note.visible ? noteStyle : { display: 'none' }}
        key={note.id}
      >
        <span className="ml-2">{note.title}</span>
        <div className="min-w-[160px]">
          <button
            title="Delete"
            className="mr-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => handleDelete(note.id)}
          >
            <TrashIcon className="w-3 md:w-4" />
          </button>
          <button
            title="Edit"
            className="mr-1 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            onClick={() => handleEdit(note.id)}
          >
            <PencilIcon className="w-3 md:w-4" />
          </button>
        </div>
      </li>
    );
  });

  return (
    <>
      <div className={`NoteComp ${isModalOpen ? 'modal-open' : ''}w-full`}>
        <div>
          <div className="NotesComp_child">
            <NoteForm
              onSubmit={handleSubmit}
              value={newNote}
              onChange={handleChange}
              onClick={!isEditing ? handleClear : handleCancel}
              isEditing={isEditing}
              reference={inputRef}
              onKeyDown={function (
                event: React.KeyboardEvent<HTMLFormElement>,
              ): void {
                throw new Error('Function not implemented.');
              }}
            />
            <NotesContainer>
              {notes.length > 0 ? (
                <>
                  <h2 className={`${tiltNeon.className} mb-3 text-xl`}>
                    Noteworthy List
                  </h2>
                  <ul className="Notes grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-6">
                    {NoteList}
                  </ul>
                </>
              ) : (
                <span
                  className={`${tiltNeon.className}no-notes mt-2 flex flex-row `}
                >
                  <ListBulletIcon className="md:5 mr-1 w-4" />
                  <span className={`${tiltNeon.className} no-task-p `}>
                    Add some notes above for future reference
                  </span>
                </span>
              )}
            </NotesContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesComponent;
