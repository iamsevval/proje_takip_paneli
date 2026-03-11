import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects, loading, onEdit, onDelete }) => {
  // Veriler yükleniyorsa animasyonu göster
  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700 dark:border-indigo-400 mx-auto mb-4"></div>
        <p className="text-indigo-600 dark:text-indigo-400 font-semibold transition-colors">Veriler Yükleniyor...</p>
      </div>
    );
  }

  // Eğer filtreleme sonucu proje bulunamazsa
  if (projects.length === 0) {
    return (
      <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-dashed border-gray-300 dark:border-gray-600 transition-colors">
        <p className="text-gray-400 dark:text-gray-500">Aradığınız kriterde proje bulunamadı.</p>
      </div>
    );
  }

  // Veriler varsa listele
  return (
    <div className="space-y-4">
      {projects.map((proj) => (
        <ProjectCard 
          key={proj.id} 
          proj={proj} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default ProjectList;