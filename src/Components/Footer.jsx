import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center py-6 mt-auto">
            <div className="container mx-auto">
                <p className="font-semibold text-lg">🚀 React CRUD Dashboard</p>
                <p className="text-gray-400 text-sm mt-1">
                    Tasarım ve Kodlama: <span className="text-indigo-400 font-bold">Şevval Arslan</span> &copy; 2026
                </p>
                <div className="flex justify-center gap-4 mt-3 text-sm text-gray-500">
                    <span>GitHub</span> • <span>Netlify</span> • <span>ReactJS</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;