'use client';

import NotesComponent from './components/notesComponent';

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <NotesComponent />
    </div>
  );
}
