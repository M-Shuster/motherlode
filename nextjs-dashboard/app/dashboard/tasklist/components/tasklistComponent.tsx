'use client';
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TasklistForm from './tasklistForm';
import Header from './header';
import TasklistContainer from './tasklistContainer';
import ConfirmModal from './confirmModal';
import ErrorModal from './errorModal';
import {
  CheckBadgeIcon,
  ListBulletIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { tiltNeon } from '@/app/ui/fonts';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const randomRunescapeTasks: string[] = [
  'cook a shark',
  'chop some magic logs',
  'hunt spotted kebbits',
  'complete a quest',
  'craft some nature runes',
  'mine some adamant ore',
  'crush a cyclops',
  'slash a hellhound',
  'complete a lap of the Seers village agility course',
  'plant a mahogany tree',
  'catch an anglerfish',
  'smith a rune longsword',
  'train hitpoints',
  'fletch some bolt tips',
  'craft a prayer potion',
  'bury some blessed dragon bones',
  'defend against a troll',
  'range an ice wyvern',
  'cast tan leather',
  'construct an oak cellar door',
  'slay abyssal demons',
  'craft an amulet of glory',
  'pickpocket an elf',
  'light some redwood logs',
];

const TasklistComponent: React.FC = () => {
  const initialState = (): Task[] => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('Tasks') || '[]') || [];
    }
    return [];
  };
  const [tasks, setTasks] = useState<Task[]>(initialState);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  useEffect(() => {
    const initialTasks = initialState();
    setTasks(initialTasks);
  }, []);
  const [newTask, setNewTask] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

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
    setCompletedTasks([]);
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

  const handleDeleteCompleted = (id: string) => {
    setCompletedTasks((prevState) =>
      prevState.filter((task) => task.id !== id),
    );
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

  const handleUnCheck = (id: string) => {
    const taskToMove = completedTasks.find((task) => task.id === id);
    if (taskToMove) {
      setTasks((prevState) => [
        ...prevState,
        { ...taskToMove, completed: false },
      ]);
      setCompletedTasks((prevState) =>
        prevState.filter((task) => task.id !== id),
      );
    }
  };

  const handleCheck = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        if (updatedTask.completed) {
          setCompletedTasks((prevState) => [...prevState, updatedTask]);
        } else {
          handleUnCheck(id);
        }
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks.filter((task) => task.id !== id));
  };

  const handleGenerateTask = () => {
    let randomIndex = Math.floor(Math.random() * randomRunescapeTasks.length);
    let randomTask = randomRunescapeTasks[randomIndex];
    let tries = 0;
    const maxTries = randomRunescapeTasks.length;

    // Keep generating a new task until a unique one is found or maximum tries is reached
    while (
      tasks.some((task) => task.title === randomTask) &&
      tries < maxTries
    ) {
      randomIndex = Math.floor(Math.random() * randomRunescapeTasks.length);
      randomTask = randomRunescapeTasks[randomIndex];
      tries++;
    }

    if (tries === maxTries) {
      setIsErrorModalOpen(true);
      return;
    }

    const newTaskArr = [
      ...tasks,
      { id: uuidv4(), title: randomTask, completed: false },
    ];
    setTasks(newTaskArr);
  };

  const handleErrorModalClose = () => {
    setIsErrorModalOpen(false);
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
        className="list mb-2 flex w-full flex-row items-center justify-between rounded-lg bg-slate-50 py-2 hover:bg-slate-200"
        style={task.completed ? liStyle : { textDecoration: 'none' }}
        key={task.id}
      >
        <span className="ml-2">{task.title}</span>
        <div className="min-w-[160px]">
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
            className="mr-2 rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
            onClick={() => handleCheck(task.id)}
          >
            <CheckBadgeIcon className="w-3 md:w-4" />
          </button>
        </div>
      </li>
    );
  });
  const CompletedTaskList = completedTasks.map((task) => {
    return (
      <li
        className="list mb-2 flex w-full flex-row items-center justify-between rounded-lg bg-slate-50 py-2 hover:bg-slate-200"
        style={liStyle}
        key={task.id}
      >
        <span className="ml-2">{task.title}</span>
        <div className="flex min-w-[160px] justify-end">
          <button
            title="Delete"
            className="mr-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => handleDeleteCompleted(task.id)}
          >
            <TrashIcon className="w-3 md:w-4" />
          </button>
          <button
            title="Complete"
            className="mr-2 rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
            onClick={() => handleUnCheck(task.id)}
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
        }w-4/6 rounded-xl bg-slate-100 p-4 shadow-md`}
      >
        <div className="TasklistComp_child">
          <Header />
          <TasklistForm
            onSubmit={handleSubmit}
            value={newTask}
            onChange={handleChange}
            onClick={!isEditing ? handleClear : handleCancel}
            isEditing={isEditing}
            reference={inputRef}
            onKeyDown={function (
              event: React.KeyboardEvent<HTMLFormElement>,
            ): void {
              throw new Error('Function not implemented.');
            }}
            onGenerateTask={handleGenerateTask}
          />
          <TasklistContainer>
            {tasks.length > 0 ? (
              <>
                <h2 className={`${tiltNeon.className} mb-3 text-xl`}>
                  Incomplete Tasks
                </h2>
                {/* <h2 className=''></h2> */}
                <ul>{TaskLists}</ul>
              </>
            ) : (
              <span
                className={`${tiltNeon.className}no-task mt-2 flex flex-row `}
              >
                <ListBulletIcon className="md:5 mr-1 w-4" />
                <span className={`${tiltNeon.className} no-task-p `}>
                  Add tasks above
                </span>
              </span>
            )}
          </TasklistContainer>
          {completedTasks.length > 0 && (
            <>
              <h2 className={`${tiltNeon.className} mb-3 text-xl`}>
                Completed Tasks
              </h2>
              <ul>{CompletedTaskList}</ul>
            </>
          )}
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
      <div className="flex flex-col items-center justify-center">
        <ErrorModal
          isOpen={isErrorModalOpen}
          onClose={handleErrorModalClose}
          modalClassName={isModalOpen ? 'modal-open' : ''}
        />
      </div>
    </>
  );
};

export default TasklistComponent;
