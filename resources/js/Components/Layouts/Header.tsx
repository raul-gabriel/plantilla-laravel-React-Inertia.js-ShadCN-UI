import { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import UserMenu from './UserMenu';
import NotificationsDropdown from './NotificationsDropdown';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    activeMenu: string;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen, activeMenu }) => {
    const [notifications] = useState([
        { text: 'Nuevo usuario registrado', time: 'Hace 5 min' },
        { text: 'Reporte generado', time: 'Hace 1 hora' },
        { text: 'Configuración actualizada', time: 'Hace 2 horas' },
    ]);

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Abrir menú"
                        className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <div className="ml-2 lg:ml-0">
                        <h1 className="text-xl font-semibold text-texto-500 capitalize">
                            {activeMenu}
                        </h1>
                        <p className="text-sm text-gray-500">Gestiona tu aplicación</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search Bar */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar…"
                            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg text-sm outline-none transition-colors focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <NotificationsDropdown notifications={notifications} />

                    <UserMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;