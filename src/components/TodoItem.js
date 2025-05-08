import React, { useState } from 'react';

export default function TodoItem({ task, updateTask, deleteTask, toggleComplete }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleEdit = () => setEditing(true);

  const handleSave = () => {
    if (text.trim() !== '') {
      updateTask(task.id, text);
    }
    setEditing(false);
  };

  return (
    <tr className="hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition">
      <td className="py-3 px-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="w-5 h-5 accent-pink-500 transition"
        />
      </td>
      <td className="py-3 px-4">
        {editing ? (
          <input
            className="border-b-2 border-pink-400 px-2 py-1 w-full focus:outline-none text-lg bg-pink-50 rounded"
            value={text}
            onChange={e => setText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            autoFocus
          />
        ) : (
          <span
            className={`cursor-pointer text-lg font-semibold transition ${
              task.completed
                ? 'line-through text-gray-400'
                : 'text-gray-800 hover:text-pink-600'
            }`}
            // Remove onDoubleClick if you want only the button to trigger edit
          >
            {task.text}
          </span>
        )}
      </td>
      <td className="py-3 px-4 flex gap-2">
        {editing ? (
          <button
            className="text-white bg-green-500 px-3 py-1 rounded-lg font-bold hover:bg-green-600 transition"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="text-white bg-yellow-500 px-3 py-1 rounded-lg font-bold hover:bg-yellow-600 transition"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        <button
          className="text-white bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 rounded-lg font-bold hover:from-pink-600 hover:to-purple-600 shadow transition"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}