import { tiltNeon } from '@/app/ui/fonts';
import React from 'react';

const TasklistHeader: React.FC = () => {
  return (
    <div className="tasklistHeader">
      <h1 className={`${tiltNeon.className} title mb-1 text-2xl font-bold`}>
        Task List
      </h1>
      <p className=" description">
        Write all of your worldly tasks below and get that sweet dopamine hit as
        you cross them off.
      </p>
      <p className=" description-alt mb-2">
        Alternatively, click the generate tasks button to automatically generate
        a task, because writing is too much effort.
      </p>
    </div>
  );
};

export default TasklistHeader;
