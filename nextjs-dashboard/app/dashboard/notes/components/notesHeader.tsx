import { tiltNeon } from '@/app/ui/fonts';
import React from 'react';

const NotesHeader: React.FC = () => {
  return (
    <div className="notesHeader">
      <h1 className={`${tiltNeon.className} title mb-1 text-2xl font-bold`}>
        Notice me
      </h1>
      <p className="description mb-4">
        A place to jot down any notes worth remembering, or those too important
        to forget.
      </p>
    </div>
  );
};

export default NotesHeader;
