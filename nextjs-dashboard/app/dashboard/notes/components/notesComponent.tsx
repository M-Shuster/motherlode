import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NoteForm from './noteForm';
import NotesContainer from './notesContainer';
import { tiltNeon } from '@/app/ui/fonts';
import { ListBulletIcon } from '@heroicons/react/20/solid';
import { TagIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import NotesHeader from './notesHeader';
import NotesConfirmModal from './notesConfirmModal';

interface Note {
  id: string;
  title: string;
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
  const [isColourMenuOpen, setIsColourMenuOpen] = useState(false);

  const tagButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewNote(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNote === '') return;
    if (!isEditing) {
      const newNoteArr = [...notes, { id: uuidv4(), title: newNote }];
      setNotes(newNoteArr);
      setNewNote('');
      if (inputRef.current) inputRef.current.focus();
    } else {
      const newArr = notes.slice();
      const indexArr = newArr.map((arr) => arr.id);
      const index = indexArr.indexOf(editId);
      newArr.splice(index, 1, { id: editId, title: newNote });
      setNotes(newArr);
      setNewNote('');
      setEditId('');
      setIsEditing(false);
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleTag = (id: string) => {
    if (!tagButtonRef.current) return;
    setIsColourMenuOpen(!isColourMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsColourMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    if (notes.length > 0) {
      setIsModalOpen(true);
    }
    return;
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewNote('');
    setEditId('');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleCancelClear = () => {
    setIsModalOpen(false);
  };

  const handleConfirmClear = () => {
    setNotes([]);
    setIsModalOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    localStorage.setItem('Notes', JSON.stringify(notes));
  }, [notes]);

  // created so that the className didn't become unwieldy
  const noteStyle = {
    fontWeight: '400',
    fontStyle: 'italic',
    minHeight: '140px',
    minWidth: '140px',
    padding: '10px',
    display: 'flex',
  };

  const NoteList = notes.map((note) => {
    return (
      <li
        className="list w-full flex-col rounded-lg bg-slate-50"
        style={noteStyle}
        key={note.id}
      >
        <span className="ml-1">{note.title}</span>
        <div className="mt-auto flex justify-end">
          <button
            title="Tag"
            className="mr-1 rounded-2xl p-2 font-bold text-slate-500  hover:bg-slate-300 hover:text-slate-800"
            onClick={() => handleTag(note.id)}
            ref={tagButtonRef}
          >
            <TagIcon className="w-3 md:w-4" />
          </button>
          {isColourMenuOpen && tagButtonRef.current && (
            <div
              ref={menuRef}
              className="absolute z-10 rounded border border-gray-200 bg-white shadow-lg"
              style={{
                top:
                  tagButtonRef.current.offsetTop +
                  tagButtonRef.current.offsetHeight,
                minWidth: '100px',
              }}
            >
              <ul className="py-1">
                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                  Red
                </li>
                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                  Blue
                </li>
                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                  Green
                </li>
              </ul>
            </div>
          )}
          <button
            title="Edit"
            className="mr-1 rounded-2xl p-2 font-bold text-slate-500  hover:bg-slate-300 hover:text-slate-800"
            onClick={() => handleEdit(note.id)}
          >
            <PencilIcon className="w-3 md:w-4" />
          </button>
          <button
            title="Delete"
            className="mr-1 rounded-2xl p-2 font-bold text-slate-500 hover:bg-slate-300 hover:text-slate-800"
            onClick={() => handleDelete(note.id)}
          >
            <TrashIcon className="w-3 md:w-4" />
          </button>
        </div>
      </li>
    );
  });

  return (
    <>
      <div className={`NoteComp ${isModalOpen ? 'modal-open' : ''} w-full`}>
        <div>
          <div className="NotesComp_child">
            <NotesHeader />
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
                  className={`${tiltNeon.className}no-notes flex flex-row `}
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
      {notes.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <NotesConfirmModal
            isOpen={isModalOpen}
            onClose={handleCancelClear}
            onConfirm={handleConfirmClear}
            modalClassName={isModalOpen ? 'modal-open' : ''}
          />
        </div>
      )}
    </>
  );
};

export default NotesComponent;
