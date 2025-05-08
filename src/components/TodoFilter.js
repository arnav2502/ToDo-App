import React from 'react';

export default function TodoFilter({ filter, setFilter }) {
  return (
    <div className="flex justify-center mb-6 space-x-2">
      {['all', 'completed', 'pending'].map(f => (
        <button
          key={f}
          className={`px-5 py-2 rounded-xl font-bold border-2 transition text-lg shadow-sm ${
            filter === f
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-pink-500 shadow'
              : 'bg-white text-pink-600 border-pink-200 hover:bg-pink-50'
          }`}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}