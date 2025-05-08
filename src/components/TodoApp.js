import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';

const getInitialTasks = () => {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
};

export default function TodoApp() {
  const [tasks, setTasks] = useState(getInitialTasks());
  const [filter, setFilter] = useState('all');
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: input, completed: false }
    ]);
    setInput('');
  };

  const updateTask = (id, newText) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  const deleteTask = id => setTasks(tasks.filter(t => t.id !== id));

  const toggleComplete = id => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = tasks.filter(t =>
    filter === 'all' ? true :
    filter === 'completed' ? t.completed :
    !t.completed
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans">
      <div className="w-full max-w-2xl p-8 bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl backdrop-blur-md border border-white/40 dark:border-gray-700">
        <h1 className="text-4xl font-extrabold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-lg tracking-wide dark:text-white dark:bg-none">
          🌟 Ultimate Todo App
        </h1>
        <p className="text-center text-lg text-gray-500 mb-6 font-semibold dark:text-gray-300">Organize your day with style!</p>
        <div className="flex mb-6">
          <input
            className="flex-1 border-2 border-pink-300 rounded-l-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="Add a new task"
          />
          <button
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-2 rounded-r-xl font-bold text-lg hover:from-pink-600 hover:to-purple-600 transition"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <TodoFilter filter={filter} setFilter={setFilter} />
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden dark:border-gray-700">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                <th className="py-3 px-4 font-extrabold text-left text-gray-700 text-lg dark:text-gray-200">Done</th>
                <th className="py-3 px-4 font-extrabold text-left text-gray-700 text-lg dark:text-gray-200">Task</th>
                <th className="py-3 px-4 font-extrabold text-left text-gray-700 text-lg dark:text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-400 text-lg dark:text-gray-500">No tasks found.</td>
                </tr>
              ) : (
                filteredTasks.map(task => (
                  <TodoItem
                    key={task.id}
                    task={task}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    toggleComplete={toggleComplete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        <footer className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          Made with <span className="text-pink-500">♥</span> using <span className="font-bold text-blue-500">React</span> & <span className="font-bold text-purple-500">TailwindCSS</span>
        </footer>
      </div>
    </div>
  );
}