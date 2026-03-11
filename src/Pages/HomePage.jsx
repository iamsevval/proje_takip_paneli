import React, { useState, useEffect } from 'react';
import ProjectForm from '../Components/ProjectForm';
import ProjectList from '../Components/ProjectList';
import Footer from '../Components/Footer';
import Stats from '../Components/Stats'; 
import Notification from '../Components/Notification'; 

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState(""); 
  const [projectToEdit, setProjectToEdit] = useState(null); 
  const [notification, setNotification] = useState(null); 

  useEffect(() => {
    const localData = localStorage.getItem('myProjects');
    setTimeout(() => {
      if (localData && JSON.parse(localData).length > 0) {
        setProjects(JSON.parse(localData));
        setLoading(false);
      } else {
        fetchApiData();
      }
    }, 800);
  }, []);

  useEffect(() => {
    if(!loading) {
      localStorage.setItem('myProjects', JSON.stringify(projects));
    }
  }, [projects, loading]);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchApiData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      const priorities = ['Yüksek', 'Orta', 'Düşük'];
      const categories = ['Yazılım', 'Pazarlama', 'Tasarım', 'Veri Analizi', 'Donanım'];

      const formattedData = data.slice(0, 6).map((user, index) => ({
        id: user.id,
        title: user.name,
        desc: `Bu proje ${user.company.name} şirketi için geliştirilmektedir.`,
        category: categories[index % categories.length],
        priority: priorities[index % priorities.length],
        isApi: true
      }));

      setProjects(formattedData);
      showNotification("Veriler API'den başarıyla çekildi!");
    } catch (error) {
      showNotification("Veri çekilemedi!", "error");
    } finally {
      setLoading(false);
    }
  };

  const addProject = (newProject) => {
    setProjects((prevProjects) => [newProject, ...prevProjects]);
    showNotification("Yeni proje başarıyla eklendi.");
  };

  const deleteProject = (id) => {
    if(window.confirm("Bu projeyi silmek istediğine emin misin?")) {
      setProjects((prevProjects) => prevProjects.filter(p => p.id !== id));
      showNotification("Proje silindi.", "error");
    }
  };

  const handleEditClick = (project) => {
    setProjectToEdit(project);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const updateProject = (updatedProject) => {
    setProjects((prevProjects) => 
      prevProjects.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
    setProjectToEdit(null); 
    showNotification("Proje güncellendi.");
  };

  const resetData = () => {
    if(window.confirm("Verileri sıfırlayıp API'den çekmek istiyor musun?")) {
      localStorage.removeItem('myProjects');
      fetchApiData();
    }
  };

  const filteredProjects = projects
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase())) 
    .sort((a, b) => { 
      const priorityOrder = { "Yüksek": 3, "Orta": 2, "Düşük": 1 };
      return priorityOrder[b.priority || "Düşük"] - priorityOrder[a.priority || "Düşük"];
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans flex flex-col relative transition-colors duration-300">
      
      <Notification data={notification} />

      <div className="flex-grow py-10 px-4">
        <div className="max-w-4xl mx-auto">
          
          <header className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-indigo-800 dark:text-indigo-400 mb-2 transition-colors">🚀 React Proje Paneli</h1>
            <p className="text-gray-600 dark:text-gray-400 transition-colors">Gelişmiş CRUD, Arama ve Filtreleme Sistemi</p>
          </header>

          <Stats 
            total={projects.length} 
            apiCount={projects.filter(p => p.isApi).length}
            localCount={projects.filter(p => !p.isApi).length}
            onReset={resetData}
          />

          <ProjectForm 
            onAdd={addProject} 
            projectToEdit={projectToEdit}
            onUpdate={updateProject}
            onCancelEdit={() => setProjectToEdit(null)}
          />

          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">🔍</div>
            <input
              type="text"
              placeholder="Proje adı ile ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-colors"
            />
          </div>

          <ProjectList 
            projects={filteredProjects} 
            loading={loading} 
            onEdit={handleEditClick} 
            onDelete={deleteProject} 
          />

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;