import React from 'react';

const Stats = ({ total, apiCount, localCount, onReset }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border-l-4 border-blue-500 text-center transition-colors">
        <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">Toplam</h3>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">{total}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border-l-4 border-green-500 text-center transition-colors">
        <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">API</h3>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">{apiCount}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border-l-4 border-purple-500 text-center transition-colors">
        <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">Lokal</h3>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">{localCount}</p>
      </div>
      <button onClick={onReset} className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl shadow flex flex-col items-center justify-center transition group">
        <span className="text-xl group-hover:rotate-180 transition duration-500">🔄</span>
        <span className="text-xs font-bold mt-1">Sıfırla</span>
      </button>
    </div>
  );
};

export default Stats;