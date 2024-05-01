'use client';
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TaskForm from './tasklist-form';
import Header from './header';
import Tasklist from './tasklist';
import ConfirmModal from './confirm-modal';
import {
  CheckBadgeIcon,
  ListBulletIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const TasklistComp: React.FC = () => {
  const initialState = (): Task[] => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('Tasks') || '[]') || [];
    }
    return [];
  };
  const [tasks, setTasks] = useState<Task[]>(initialState);
  useEffect(() => {
    const initialTasks = initialState();
    setTasks(initialTasks);
  }, []);
  const [newTask, setNewTask] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewTask(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask === '') return;
    if (!isEditing) {
      const newTaskArr = [
        ...tasks,
        { id: uuidv4(), title: newTask, completed: false },
      ];
      setTasks(newTaskArr);
      setNewTask('');
      if (inputRef.current) inputRef.current.focus();
    } else {
      const newArr = tasks.slice();
      const indexArr = newArr.map((arr) => arr.id);
      const index = indexArr.indexOf(editId);
      newArr.splice(index, 1, { id: editId, title: newTask, completed: false });
      setTasks(newArr);
      setNewTask('');
      setEditId('');
      setIsEditing(false);
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleClear = () => {
    setIsModalOpen(true);
  };

  const handleConfirmClear = () => {
    setTasks([]);
    setIsModalOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleCancelClear = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTask('');
    setEditId('');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleDelete = (id: string) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  };

  const handleEdit = (id: string) => {
    const item = tasks.find((task) => task.id === id);
    if (item) {
      setNewTask(item.title);
      setIsEditing(true);
      setEditId(item.id);
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleCheck = (title: string, id: string) => {
    const newArr = tasks.slice();
    const indexArr = newArr.map((arr) => arr.id);
    const index = indexArr.indexOf(id);
    newArr.splice(index, 1, { id, title, completed: !newArr[index].completed });
    setTasks(newArr);
  };

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const liStyle = {
    textDecoration: 'line-through',
    fontWeight: '100',
    fontStyle: 'italic',
  };

  const TaskLists = tasks.map((task) => {
    return (
      <li
        className="list"
        style={task.completed ? liStyle : { textDecoration: 'none' }}
        key={task.id}
      >
        {task.title}
        <div>
          <button
            title="Delete"
            className="mr-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => handleDelete(task.id)}
          >
            <TrashIcon className="w-3 md:w-4" />
          </button>
          <button
            title="Edit"
            className="mr-1 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            onClick={() => handleEdit(task.id)}
          >
            <PencilIcon className="w-3 md:w-4" />
          </button>
          <button
            title="Complete"
            className="mr-1 rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
            onClick={() => handleCheck(task.title, task.id)}
          >
            <CheckBadgeIcon className="w-3 md:w-4" />
          </button>
        </div>
      </li>
    );
  });
  return (
    <>
      <div
        className={`TasklistComp ${
          isModalOpen ? 'modal-open' : ''
        }w-4/6 rounded bg-slate-100 p-4 shadow-md`}
      >
        <div className="TasklistComp_child">
          <Header />
          <TaskForm
            onSubmit={handleSubmit}
            value={newTask}
            onChange={handleChange}
            onClick={!isEditing ? handleClear : handleCancel}
            isEditing={isEditing}
            reference={inputRef}
          />
          <Tasklist>
            {tasks.length > 0 ? (
              TaskLists
            ) : (
              <span className="no-task mt-2 flex flex-row">
                <ListBulletIcon className="md:5 mr-1 w-4" />
                <span className="no-task-p">Add tasks above</span>
              </span>
            )}
          </Tasklist>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={handleCancelClear}
          onConfirm={handleConfirmClear}
          modalClassName={isModalOpen ? 'modal-open' : ''}
        />
      </div>
    </>
  );
};

export default TasklistComp;
