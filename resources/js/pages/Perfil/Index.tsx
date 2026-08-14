import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { UserIcon, ShieldIcon, CheckCircle2Icon, AlertTriangleIcon } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Input } from '@/Components/ui/CampoForm';

interface User {
    id: number;
    nombres: string;
    celular: string | null;
    dni: string;
    correo: string;
    rol: 'administrador' | 'agente';
    estado: 'activo' | 'inactivo';
}

interface Flash {
    success?: string;
}

interface Props {
    user: User;
    flash?: Flash;
}

const TABS = [
    { id: 'info', label: 'Información personal', icon: UserIcon },
    { id: 'security', label: 'Seguridad', icon: ShieldIcon },
] as const;

export default function Index({ user, flash }: Props) {
    const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['id']>('info');

    const {
        data: profileData,
        setData: setProfileData,
        put: putProfile,
        processing: processingProfile,
        errors: profileErrors,
    } = useForm({
        nombres: user.nombres || '',
        celular: user.celular || '',
        dni: user.dni || '',
        correo: user.correo || '',
    });

    const {
        data: passwordData,
        setData: setPasswordData,
        put: putPassword,
        processing: processingPassword,
        errors: passwordErrors,
        reset: resetPassword,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        putProfile('/perfil', {
            preserveScroll: true,
        });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        putPassword('/perfil/password', {
            preserveScroll: true,
            onSuccess: () => resetPassword(),
        });
    };

    return (
        <AdminLayout>
            <Head title="Mi perfil" />

            <div className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">

                    {/* Header de perfil */}
                    <div className="cardPage mb-6">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-primary-600 flex items-center justify-center text-white text-2xl font-semibold shrink-0">
                                {user.nombres.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold text-texto-500">{user.nombres}</h1>
                                <p className="text-gray-500">{user.correo}</p>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                                        user.rol === 'administrador'
                                            ? 'bg-primary-100 text-primary-700'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    {user.rol.charAt(0).toUpperCase() + user.rol.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Alert de éxito */}
                    {flash?.success && (
                        <div role="status" className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 text-sm">
                            <CheckCircle2Icon className="w-5 h-5 shrink-0" />
                            {flash.success}
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="cardPage p-0 overflow-hidden">
                        <div className="border-b border-gray-200">
                            <nav className="flex -mb-px">
                                {TABS.map(({ id, label, icon: Icon }) => (
                                    <button
                                        key={id}
                                        onClick={() => setActiveTab(id)}
                                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                            activeTab === id
                                                ? 'border-primary-600 text-primary-700'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="p-6">
                            {/* Tab: Información Personal */}
                            {activeTab === 'info' && (
                                <form onSubmit={handleProfileSubmit} className="space-y-6">
                                    <Input
                                        type="text"
                                        label="Nombres completos"
                                        name="nombres"
                                        value={profileData.nombres}
                                        onChange={(e) => setProfileData('nombres', e.target.value)}
                                        error={profileErrors.nombres}
                                        required
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Input
                                                type="text"
                                                label="DNI"
                                                name="dni"
                                                value={profileData.dni}
                                                onChange={() => {}}
                                                disabled
                                                error={profileErrors.dni}
                                            />
                                            <p className="mt-1 text-xs text-gray-400">
                                                El DNI no puede modificarse.
                                            </p>
                                        </div>

                                        <Input
                                            type="text"
                                            label="Celular"
                                            name="celular"
                                            value={profileData.celular}
                                            onChange={(e) => setProfileData('celular', e.target.value)}
                                            error={profileErrors.celular}
                                        />
                                    </div>

                                    <Input
                                        type="email"
                                        label="Correo electrónico"
                                        name="correo"
                                        value={profileData.correo}
                                        onChange={(e) => setProfileData('correo', e.target.value)}
                                        error={profileErrors.correo}
                                        required
                                    />

                                    <div className="flex justify-end pt-2">
                                        <button
                                            type="submit"
                                            disabled={processingProfile}
                                            className="boton"
                                        >
                                            {processingProfile ? 'Guardando…' : 'Guardar cambios'}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Tab: Seguridad */}
                            {activeTab === 'security' && (
                                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                    <Input
                                        type="password"
                                        label="Contraseña actual"
                                        name="current_password"
                                        value={passwordData.current_password}
                                        onChange={(e) => setPasswordData('current_password', e.target.value)}
                                        error={passwordErrors.current_password}
                                        autoComplete="current-password"
                                        required
                                    />

                                    <Input
                                        type="password"
                                        label="Nueva contraseña"
                                        name="password"
                                        value={passwordData.password}
                                        onChange={(e) => setPasswordData('password', e.target.value)}
                                        error={passwordErrors.password}
                                        autoComplete="new-password"
                                        required
                                    />

                                    <Input
                                        type="password"
                                        label="Confirmar nueva contraseña"
                                        name="password_confirmation"
                                        value={passwordData.password_confirmation}
                                        onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                        error={passwordErrors.password_confirmation}
                                        autoComplete="new-password"
                                        required
                                    />

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <div className="flex gap-3">
                                            <AlertTriangleIcon className="h-5 w-5 text-yellow-500 shrink-0" />
                                            <p className="text-sm text-yellow-800">
                                                La contraseña debe tener al menos 6 caracteres.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <button
                                            type="submit"
                                            disabled={processingPassword}
                                            className="boton"
                                        >
                                            {processingPassword ? 'Actualizando…' : 'Cambiar contraseña'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}