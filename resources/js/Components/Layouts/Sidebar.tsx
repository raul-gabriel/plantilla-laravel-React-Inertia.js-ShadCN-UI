import React from 'react';
import { Home, Users, Settings, BarChart3, FileText } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

interface MenuItem {
    id: string;
    label: string;
    icon: React.ElementType;
    href: string;
    show?: boolean;
}

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
    { id: 'usuarios', label: 'Usuarios', icon: Users, href: '/usuarios', show: true },
   { id: 'libros', label: 'libros', icon: FileText, href: '/libros' },
    { id: 'analytics', label: 'Analíticas', icon: BarChart3, href: '/analytics', show: false },
    { id: 'settings', label: 'Configuración', icon: Settings, href: '/settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const { url } = usePage();

    return (
        <>
            {/* Overlay para mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-0 h-full w-72 bg-[#081b30] shadow-xl z-50 transform transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:static lg:h-screen
                `}
            >
                {/* Logo */}
                <div className="pt-8 pb-6 px-6 flex flex-col items-center justify-center border-b border-white/10">
                    <img src="/recursos/cusocode.png" alt="Logo" className="h-14 w-auto mb-3" />
                    <h1 className="text-lg font-semibold text-white text-center leading-snug">
                        Corporación Cuscocode
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="mt-6 px-3">
                    <h3 className="mb-3 ml-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                        Menú
                    </h3>

                    <div className="space-y-1">
                        {menuItems
                            .filter((item) => item.show !== false)
                            .map((item) => {
                                const Icon = item.icon;
                                const isActive = url.startsWith(item.href);

                                return (
                                    <Link
                                        href={item.href}
                                        key={item.id}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`
                                            font-medium w-full flex items-center gap-3 px-4 py-3 text-[15px] rounded-lg transition-colors duration-200
                                            ${
                                                isActive
                                                    ? 'bg-[#122c4a] text-white shadow-sm'
                                                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                                            }
                                        `}
                                    >
                                        <Icon className="h-5 w-5 shrink-0" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                    </div>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;