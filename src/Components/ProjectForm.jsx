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
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-indigo-100 dark:border-gray-700 mb-8 transition-colors duration-300">
            <h2 className={`text-2xl font-bold mb-6 pb-2 border-b flex justify-between items-center transition-colors ${projectToEdit ? 'text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800' : 'text-indigo-800 dark:text-indigo-400 border-indigo-100 dark:border-gray-700'}`}>
                {projectToEdit ? '✏️ Projeyi Düzenle' : '✨ Yeni Fikir Ekle'}

                {projectToEdit && (
                    <button type="button" onClick={resetForm} className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 font-normal transition-colors">
                        iptal et
                    </button>
                )}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors">Proje Başlığı</label>
                    {/* Input dark mode yapıldı */}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Örn: E-Ticaret Sitesi"
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors">Kategori</label>
                    {/* Select dark mode yapıldı */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
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
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors">Açıklama</label>
                {/* Textarea dark mode yapıldı */}
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Proje detaylarını buraya yaz..."
                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    rows="3"
                />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="w-full md:w-1/2">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1 transition-colors">Önem Derecesi</label>
                    <div className="flex gap-2">
                        {['Düşük', 'Orta', 'Yüksek'].map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setPriority(p)}
                                className={`px-3 py-1 rounded-full text-sm border transition-all ${priority === p ?
                                    (p === 'Yüksek' ? 'bg-red-100 dark:bg-red-900/40 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300' : 
                                     p === 'Orta' ? 'bg-yellow-100 dark:bg-yellow-900/40 border-yellow-500 dark:border-yellow-400 text-yellow-700 dark:text-yellow-300' : 
                                     'bg-green-100 dark:bg-green-900/40 border-green-500 dark:border-green-400 text-green-700 dark:text-green-300')
                                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className={`w-full md:w-auto font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 ${projectToEdit ? 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-white' : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white'}`}
                >
                    {projectToEdit ? '💾 Değişiklikleri Kaydet' : '+ Listeye Ekle'}
                </button>
            </div>
        </form>
    );
};

export default ProjectForm;