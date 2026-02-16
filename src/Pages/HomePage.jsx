import React, { useState, useEffect } from 'react';
import ProjectForm from '../Components/ProjectForm';
import Footer from '../Components/Footer';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState(""); 
  const [projectToEdit, setProjectToEdit] = useState(null); 
  const [notification, setNotification] = useState(null); 

  useEffect(() => {
    const localData = localStorage.getItem('myProjects');
    
    setTimeout(() => {
      if (localData) {
        setProjects(JSON.parse(localData));
        setLoading(false);
      } else {
        fetchApiData();
      }
    }, 800);
  }, []);

  // LocalStorage Güncelleme
  useEffect(() => {
    if(!loading) {
      localStorage.setItem('myProjects', JSON.stringify(projects));
    }
  }, [projects, loading]);

  // Bildirim gösterme fonksiyonu
  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // API Çekme
  const fetchApiData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      
      const priorities = ['Düşük', 'Orta', 'Yüksek'];
      const categories = ['Yazılım', 'Pazarlama', 'Tasarım', 'Veri Analizi'];

      const formattedData = data.slice(0, 6).map(user => ({
        id: user.id,
        title: user.name,
        desc: `Bu proje ${user.company.name} şirketi için geliştirilmektedir.`,
        category: categories[Math.floor(Math.random() * categories.length)], 
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        isApi: true
      }));

      setProjects(formattedData);
      showNotification("Veriler API'den başarıyla çekildi!");
    } catch (error) {
      console.error("Hata:", error);
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

  const totalProjects = projects.length;
  const apiProjects = projects.filter(p => p.isApi).length;
  const localProjects = projects.filter(p => !p.isApi).length;

  // filtreleme ve sıralama 
  const filteredProjects = projects
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase())) 
    .sort((a, b) => { 
      const priorityOrder = { "Yüksek": 3, "Orta": 2, "Düşük": 1 };
      return priorityOrder[b.priority || "Düşük"] - priorityOrder[a.priority || "Düşük"];
    });

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col relative">
      
      {/* Bildirim (Toast) */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-xl text-white font-bold animate-bounce ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {notification.msg}
        </div>
      )}

      <div className="flex-grow py-10 px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-2">🚀 React Proje Paneli</h1>
            <p className="text-gray-600">Gelişmiş CRUD, Arama ve Filtreleme Sistemi</p>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500 text-center">
              <h3 className="text-gray-500 text-xs font-bold uppercase">Toplam</h3>
              <p className="text-2xl font-bold text-gray-800">{totalProjects}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500 text-center">
              <h3 className="text-gray-500 text-xs font-bold uppercase">API</h3>
              <p className="text-2xl font-bold text-gray-800">{apiProjects}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-purple-500 text-center">
              <h3 className="text-gray-500 text-xs font-bold uppercase">Lokal</h3>
              <p className="text-2xl font-bold text-gray-800">{localProjects}</p>
            </div>
            <button onClick={resetData} className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl shadow flex flex-col items-center justify-center transition group">
                <span className="text-xl group-hover:rotate-180 transition duration-500">🔄</span>
                <span className="text-xs font-bold mt-1">Sıfırla</span>
             </button>
          </div>

          {/* Hem ekleme hem de güncelleme için form */}
          <ProjectForm 
            onAdd={addProject} 
            projectToEdit={projectToEdit}
            onUpdate={updateProject}
            onCancelEdit={() => setProjectToEdit(null)}
          />

          {/* Arama Çubuğu */}
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              🔍
            </div>
            <input
              type="text"
              placeholder="Proje adı ile ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
            />
          </div>

          {/* Liste Başlığı */}
          <div className="flex items-center justify-between mb-4 border-b pb-2 border-gray-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">📂 Proje Listesi</h2>
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
              {filteredProjects.length} Sonuç
            </span>
          </div>

          {/* Liste veya Loading */}
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700 mx-auto mb-4"></div>
              <p className="text-indigo-600 font-semibold">Veriler Yükleniyor...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                  <p className="text-gray-400">Aradığınız kriterde proje bulunamadı.</p>
                </div>
              ) : (
                filteredProjects.map((proj) => (
                  <div key={proj.id} className={`bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden group ${proj.priority === 'Yüksek' ? 'border-l-4 border-l-red-400' : proj.priority === 'Orta' ? 'border-l-4 border-l-yellow-400' : 'border-l-4 border-l-green-400'}`}>
                    
                    {proj.isApi && <span className="absolute top-0 right-0 bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-bl-lg">API</span>}

                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-800">{proj.title}</h3>
                        <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded border border-gray-200">{proj.category}</span>
                        <span className={`text-[10px] px-2 py-1 rounded border font-bold ${
                            proj.priority === 'Yüksek' ? 'bg-red-50 text-red-600 border-red-200' : 
                            proj.priority === 'Orta' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 
                            'bg-green-50 text-green-600 border-green-200'
                        }`}>
                          {proj.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{proj.desc}</p>
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0 md:ml-4 w-full md:w-auto justify-end">
                      <button 
                        onClick={() => handleEditClick(proj)}
                        className="bg-yellow-50 text-yellow-600 px-3 py-2 rounded-lg font-semibold hover:bg-yellow-100 transition text-sm flex items-center gap-1 border border-yellow-200"
                      >
                        ✏️ Düzenle
                      </button>
                      <button 
                        onClick={() => deleteProject(proj.id)}
                        className="bg-red-50 text-red-500 px-3 py-2 rounded-lg font-semibold hover:bg-red-100 transition text-sm flex items-center gap-1 border border-red-200"
                      >
                        🗑 Sil
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;