import React, { ReactNode } from 'react';

interface TasklistProps {
  children: ReactNode;
}

const Tasklist: React.FC<TasklistProps> = ({ children }) => {
  return (
    <div className="TodoList-container">
      <ul className="TodoList">{children}</ul>
    </div>
  );
};

export default Tasklist;
