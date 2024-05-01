import React from 'react';

export default function Header() {
  return (
    <div className="Header">
      <h1 className="title mb-1 text-xl font-bold">Task List</h1>
      <p className="description">
        Write all of your worldly tasks below and get that sweet dopamine hit as
        you cross them off.
      </p>
      <p className="description alt mb-2">
        Alternatively, click the generate tasks to automatically generate 5
        tasks because writing is too much effort.
      </p>
    </div>
  );
}
