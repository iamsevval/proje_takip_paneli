import React from 'react';

const ProjectCard = ({ proj, onEdit, onDelete }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden group ${proj.priority === 'Yüksek' ? 'border-l-4 border-l-red-400 dark:border-l-red-500' : proj.priority === 'Orta' ? 'border-l-4 border-l-yellow-400 dark:border-l-yellow-500' : 'border-l-4 border-l-green-400 dark:border-l-green-500'}`}>
      
      {proj.isApi && <span className="absolute top-0 right-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-[10px] font-bold px-2 py-1 rounded-bl-lg transition-colors">API</span>}

      <div className="flex-1 w-full">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white transition-colors">{proj.title}</h3>
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] px-2 py-1 rounded border border-gray-200 dark:border-gray-600 transition-colors">{proj.category}</span>
          <span className={`text-[10px] px-2 py-1 rounded border font-bold transition-colors ${
              proj.priority === 'Yüksek' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800' : 
              proj.priority === 'Orta' ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800' : 
              'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'
          }`}>
            {proj.priority}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors">{proj.desc}</p>
      </div>

      <div className="flex gap-2 mt-4 md:mt-0 md:ml-4 w-full md:w-auto justify-end">
        <button 
          onClick={() => onEdit(proj)}
          className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 px-3 py-2 rounded-lg font-semibold hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition text-sm flex items-center gap-1 border border-yellow-200 dark:border-yellow-800"
        >
          ✏️ Düzenle
        </button>
        <button 
          onClick={() => onDelete(proj.id)}
          className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 px-3 py-2 rounded-lg font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition text-sm flex items-center gap-1 border border-red-200 dark:border-red-800"
        >
          🗑 Sil
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;