import React from 'react';
import { Users, BarChart3, FileText, Settings, LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
}

// StatCard Component
export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, bgColor, iconColor }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center">
      <div className={`p-3 ${bgColor} rounded-lg`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

// StatsGrid Component
export const StatsGrid: React.FC = () => {
  const stats: StatCardProps[] = [
    { title: 'Total Usuarios', value: '1,234', icon: Users, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
    { title: 'Ventas', value: '$12,345', icon: BarChart3, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
    { title: 'Reportes', value: '456', icon: FileText, bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
    { title: 'Configuraciones', value: '12', icon: Settings, bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

// ActivitySection Component
export const ActivitySection: React.FC = () => {
  const activities = [
    { text: 'Nuevo usuario registrado', time: 'Hace 5 minutos', color: 'bg-green-500' },
    { text: 'Reporte generado', time: 'Hace 1 hora', color: 'bg-blue-500' },
    { text: 'Configuración actualizada', time: 'Hace 2 horas', color: 'bg-yellow-500' },
    { text: 'Nueva venta registrada', time: 'Hace 3 horas', color: 'bg-green-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Actividad Reciente</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className={`h-2 w-2 ${activity.color} rounded-full mr-3`}></div>
            <div>
              <p className="text-sm font-medium text-gray-800">{activity.text}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// QuickActions Component
export const QuickActions: React.FC = () => {
  const actions = [
    { label: 'Nuevo Usuario', icon: Users, color: 'blue' },
    { label: 'Crear Reporte', icon: FileText, color: 'green' },
    { label: 'Ver Analytics', icon: BarChart3, color: 'yellow' },
    { label: 'Configurar', icon: Settings, color: 'purple' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button 
              key={index}
              className={`p-4 bg-${action.color}-50 hover:bg-${action.color}-100 rounded-lg transition-colors duration-200`}
            >
              <Icon className={`h-8 w-8 text-${action.color}-600 mx-auto mb-2`} />
              <p className={`text-sm font-medium text-${action.color}-600`}>{action.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// WelcomeSection Component
export const WelcomeSection: React.FC = () => (
  <div className="mb-8">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido al Dashboard</h2>
      <p className="text-gray-600">
        Este es tu panel de control principal. Desde aquí puedes gestionar todas las funcionalidades de tu aplicación.
      </p>
    </div>
  </div>
);