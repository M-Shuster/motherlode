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
  color: string;
}

const colorPresets: { [key: string]: string } = {
  Red: 'bg-red-500',
  Orange: 'bg-orange-500',
  Yellow: 'bg-yellow-500',
  Green: 'bg-green-500',
  Blue: 'bg-blue-500',
  Indigo: 'bg-indigo-500',
  Violet: 'bg-violet-500',
};

const NotesComponent: React.FC = () => {
  const initialNoteState = (): Note[] => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('Notes') || '[]') || [];
    }
    return [];
  };

  const [notes, setNotes] = useState<Note[]>(initialNoteState);
  const [selectedNoteColor, setSelectedNoteColor] = useState<{
    [key: string]: string;
  }>();

  useEffect(() => {
    const initialNotes = initialNoteState();
    setNotes(initialNotes);
  }, []);

  const [newNote, setNewNote] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openColorMenus, setOpenColorMenus] = useState<{
    [key: string]: boolean;
  }>({});
  const [newColor, setNewColor] = useState<string>('');

  const tagButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewNote(value);
    setNewColor(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNote === '') return;
    let newNoteArr: Note[] = [];
    if (!isEditing) {
      newNoteArr = [
        ...notes,
        {
          id: uuidv4(),
          title: newNote,
          color: newColor,
        },
      ];
      setNotes(newNoteArr);
      setNewNote('');
      setNewColor('');
      if (inputRef.current) inputRef.current.focus();
    } else {
      const newArr = notes.slice();
      const indexArr = newArr.map((arr) => arr.id);
      const index = indexArr.indexOf(editId);
      newArr.splice(index, 1, {
        id: editId,
        title: newNote,
        color: newColor,
      });
      newNoteArr = newArr;
      setNotes(newArr);
      setNewNote('');
      setNewColor('');
      setEditId('');
      setIsEditing(false);
      if (inputRef.current) inputRef.current.focus();
    }
    localStorage.setItem('Notes', JSON.stringify(newNoteArr));
  };

  const shouldCloseMenuRef = useRef<boolean>(false);

  const handleTagOpen = (id: string) => {
    setOpenColorMenus((prev) => ({
      ...prev,
      [id]: true,
    }));
    shouldCloseMenuRef.current = true;
  };

  const handleTagClose = (id: string) => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRefs.current[id] &&
        !menuRefs.current[id]?.contains(event.target as Node)
      ) {
        setOpenColorMenus((prev) => ({
          ...prev,
          [id]: false,
        }));
        shouldCloseMenuRef.current = false;
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    setOpenColorMenus((prev) => ({
      ...prev,
      [id]: false,
    }));
    shouldCloseMenuRef.current = false;
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

  const handleColorClick = (id: string, color: string) => {
    console.log(`Colour ${color} has been clicked`);
    setSelectedNoteColor((prev) => ({
      ...prev,
      [id]: color,
    }));
    handleTagClose(id);
  };

  useEffect(() => {
    const initialColors = notes.reduce(
      (acc, note) => {
        acc[note.id] = note.color;
        return acc;
      },
      {} as { [key: string]: string },
    );
    setSelectedNoteColor(initialColors);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('Notes', JSON.stringify(notes));
    localStorage.setItem(
      'SelectedNoteColor',
      JSON.stringify(selectedNoteColor),
    );
  }, [notes, selectedNoteColor]);

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
    const storedColor = JSON.parse(
      localStorage.getItem(`NoteColor_${note.id}`) || '""',
    );
    const noteColor = storedColor || 'bg-slate-50';
    return (
      <li
        className={`list w-full flex-col rounded-lg ${noteColor}`}
        style={noteStyle}
        key={note.id}
      >
        <span className="ml-1">{note.title}</span>
        <div className="mt-auto flex justify-end">
          <button
            title="Tag"
            className="mr-1 rounded-2xl p-2 font-bold text-slate-600  hover:bg-slate-300 hover:text-slate-800"
            onClick={() =>
              openColorMenus[note.id]
                ? handleTagClose(note.id)
                : handleTagOpen(note.id)
            }
            ref={(el) => (tagButtonRefs.current[note.id] = el)}
          >
            <TagIcon className="w-3 md:w-4" />
          </button>
          {openColorMenus[note.id] && tagButtonRefs.current[note.id] && (
            <div
              ref={(el) => (menuRefs.current[note.id] = el)}
              className="absolute z-10 rounded border border-gray-200 bg-white shadow-lg"
              style={{
                top:
                  (tagButtonRefs.current[note.id]?.offsetTop ?? 0) +
                  (tagButtonRefs.current[note.id]?.offsetHeight ?? 0),

                minWidth: '100px',
              }}
            >
              <ul className="py-1">
                {Object.entries(colorPresets).map(
                  ([color, className], index) => (
                    <li
                      key={index}
                      className="flex cursor-pointer flex-row items-center px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        localStorage.setItem(
                          `NoteColor_${note.id}`,
                          JSON.stringify(className),
                        );
                        handleColorClick(note.id, className);
                      }}
                    >
                      <div
                        className={`mr-2 h-4 w-4 rounded-2xl ${className}`}
                      ></div>
                      <span>{color}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
          <button
            title="Edit"
            className="mr-1 rounded-2xl p-2 font-bold text-slate-600  hover:bg-slate-300 hover:text-slate-800"
            onClick={() => handleEdit(note.id)}
          >
            <PencilIcon className="w-3 md:w-4" />
          </button>
          <button
            title="Delete"
            className="mr-1 rounded-2xl p-2 font-bold text-slate-600 hover:bg-slate-300 hover:text-slate-800"
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
