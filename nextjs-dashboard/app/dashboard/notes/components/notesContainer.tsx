import React, { ReactNode } from 'react';

interface NotesProps {
  children: ReactNode;
}

const NotesContainer: React.FC<NotesProps> = ({ children }) => {
  return (
    <div className="Notes-container mt-4  h-full w-full rounded-xl bg-slate-100 p-4 shadow-md">
      {children}
    </div>
  );
};

export default NotesContainer;
