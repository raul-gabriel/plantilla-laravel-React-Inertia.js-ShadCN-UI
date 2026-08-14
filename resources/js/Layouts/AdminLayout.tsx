import React, { useState, ReactNode } from 'react';
import Header from '@/Components/Layouts/Header';
import Sidebar from '@/Components/Layouts/Sidebar';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');

    return (
        <div className="flex h-screen">
            {/* Sidebar fijo a la izquierda */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
            />

            {/* Contenido principal */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Barra superior */}
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    activeMenu={activeMenu}
                />

                {/* Contenido scrollable */}
                <main className="flex-1 overflow-y-auto p-6 bg-slate-100">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;