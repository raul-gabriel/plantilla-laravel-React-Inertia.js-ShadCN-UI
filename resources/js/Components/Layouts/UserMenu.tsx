import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { User, Settings, LogOut, ChevronDown, Route } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';


export default function UserMenu() {
  const { auth } = usePage().props as any;
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logout = () => {
    router.post('/logout');
  };

  const getInitials = (nombres: string): string => {
    return nombres
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };





  if (!auth?.user) {
    console.log('No hay usuario autenticado.',auth?.user);
    return null;
  }

  return (
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={() => setUserMenuOpen(!userMenuOpen)}
        className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
      >
        <div className={`h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center`}>
          <span className="text-white text-xs font-semibold">
            {getInitials(auth.user.nombres)}
          </span>
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-700">
          {auth.user.nombres.split(' ')[0]}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
      </button>

      {userMenuOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className={`h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center`}>
                  <span className="text-white text-sm font-semibold">
                    {getInitials(auth.user.nombres)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {auth.user.nombres}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {auth.user.correo}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${auth.user.rol === 'administrador'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                      }`}>
                      {(auth.user.rol)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <Link
                href='/perfil' // o la ruta que tengas definida
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors duration-200"
              >
                <User className="h-4 w-4 mr-3 text-gray-400" />
                <div>
                  <div className="text-sm">Mi Perfil</div>
                  <div className="text-xs text-gray-500">DNI: {auth.user.dni}</div>
                </div>
              </Link>
             
            </div>

            <hr className="my-1 border-gray-200" />

            {/* Logout Button */}
            <div className="py-1">
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-3 text-red-500" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}