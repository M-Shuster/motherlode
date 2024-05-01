import React, { ReactNode } from 'react';

interface TasklistProps {
  children: ReactNode;
}

const Tasklist: React.FC<TasklistProps> = ({ children }) => {
  return (
    <div className="Tasklist-container mt-4">
      <ul className="Tasklist">{children}</ul>
    </div>
  );
};

export default Tasklist;
