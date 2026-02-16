import React, { useState, useEffect } from 'react';

const ProjectForm = ({ onAdd, projectToEdit, onUpdate, onCancelEdit }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('Yazılım');
    const [priority, setPriority] = useState('Orta');

    // Düzenleme modu aktifse form verilerini doldur
    useEffect(() => {
        if (projectToEdit) {
            setTitle(projectToEdit.title);
            setDesc(projectToEdit.desc);
            setCategory(projectToEdit.category || 'Yazılım');
            setPriority(projectToEdit.priority || 'Orta');
        }
    }, [projectToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        if (projectToEdit) {
            
            onUpdate({
                ...projectToEdit,
                title,
                desc,
                category,
                priority
            });
        } else {
            onAdd({
                title,
                desc,
                category,
                priority,
                id: Date.now(),
                isApi: false
            });
        }
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setDesc('');
        setCategory('Yazılım');
        setPriority('Orta');
        if (projectToEdit) onCancelEdit(); 
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100 mb-8 transition-all duration-300">
            <h2 className={`text-2xl font-bold mb-6 pb-2 border-b flex justify-between items-center ${projectToEdit ? 'text-yellow-600 border-yellow-200' : 'text-indigo-800 border-indigo-100'}`}>
                {projectToEdit ? '✏️ Projeyi Düzenle' : '✨ Yeni Fikir Ekle'}

                {projectToEdit && (
                    <button type="button" onClick={resetForm} className="text-sm text-gray-500 hover:text-red-500 font-normal">
                        iptal et
                    </button>
                )}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Proje Başlığı</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Örn: E-Ticaret Sitesi"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Kategori</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                        <option>Yazılım</option>
                        <option>Tasarım</option>
                        <option>Pazarlama</option>
                        <option>Donanım</option>
                        <option>Veri Analizi</option>
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Açıklama</label>
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Proje detaylarını buraya yaz..."
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="w-full md:w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-1">Önem Derecesi</label>
                    <div className="flex gap-2">
                        {['Düşük', 'Orta', 'Yüksek'].map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setPriority(p)}
                                className={`px-3 py-1 rounded-full text-sm border transition-all ${priority === p ?
                                    (p === 'Yüksek' ? 'bg-red-100 border-red-500 text-red-700' : p === 'Orta' ? 'bg-yellow-100 border-yellow-500 text-yellow-700' : 'bg-green-100 border-green-500 text-green-700')
                                    : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className={`w-full md:w-auto font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 ${projectToEdit ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                >
                    {projectToEdit ? '💾 Değişiklikleri Kaydet' : '+ Listeye Ekle'}
                </button>
            </div>
        </form>
    );
};

export default ProjectForm;