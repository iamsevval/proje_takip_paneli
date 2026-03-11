import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 dark:bg-gray-950 text-white text-center py-6 mt-auto transition-colors duration-300">
            <div className="container mx-auto">
                <p className="font-semibold text-lg">🚀 React CRUD Dashboard</p>
                <p className="text-gray-400 text-sm mt-1">
                    Tasarım ve Kodlama: <span className="text-indigo-400 font-bold">Şevval Arslan</span> &copy; 2026
                </p>
                <div className="flex justify-center gap-4 mt-3 text-sm text-gray-400">
                    {/* GitHub Linki */}
                    <a 
                        href="https://github.com/iamsevval/proje_takip_paneli" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-white hover:underline transition-colors"
                    >
                        GitHub
                    </a> 
                    <span className="text-gray-500">•</span> 
                    
                    {/* Netlify Linki */}
                    <a 
                        href="https://dancing-mermaid-e3f22e.netlify.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-white hover:underline transition-colors"
                    >
                        Netlify
                    </a> 
                    <span className="text-gray-500">•</span> 
                    
                    {/* ReactJS Linki */}
                    <a 
                        href="https://react.dev/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-white hover:underline transition-colors"
                    >
                        ReactJS
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;