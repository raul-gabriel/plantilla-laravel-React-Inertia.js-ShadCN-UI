import { useForm } from '@inertiajs/react';
import { Input, Select } from '@/Components/ui/CampoForm';
import { Modal } from '@/Components/ui/Modal';
import { Usuario } from '@/types/typeGlobales';
import { KeyIcon, ShieldIcon, UserIcon } from 'lucide-react';

interface Props {
    user: Usuario | null;
    onClose: () => void;
    isOpen: boolean;
}

export default function FormularioUsuario({ user, onClose, isOpen }: Props) {
    const isEditing = !!user;

    const { post, put, data, setData, processing, errors, reset } = useForm({
        nombres: user?.nombres ?? '',
        correo: user?.correo ?? '',
        dni: user?.dni ?? '',
        celular: user?.celular ?? '',
        rol: user?.rol ?? 'administrador',
        estado: user?.estado ?? 'activo',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const onSuccess = () => {
            reset();
            onClose();
        };

        if (isEditing) {
            put(`/usuarios/${user!.id}`, { onSuccess });
        } else {
            post('/usuarios', { onSuccess });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Editar usuario' : 'Crear usuario'} size="xl">
            <form onSubmit={submit} className="space-y-8">

                {/* Sección: Información personal */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <UserIcon className="w-4 h-4 text-primary-600" />
                        <h3 className="text-sm font-semibold text-texto-500 uppercase tracking-wide">
                            Información personal
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type="text"
                                label="Nombres"
                                name="nombres"
                                value={data.nombres}
                                onChange={(e) => setData('nombres', e.target.value)}
                                error={errors.nombres}
                                placeholder="Ingrese los nombres"
                                required
                            />

                            <Input
                                type="email"
                                label="Correo"
                                name="correo"
                                value={data.correo}
                                onChange={(e) => setData('correo', e.target.value)}
                                error={errors.correo}
                                placeholder="Ingrese el correo"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type="text"
                                label="DNI"
                                name="dni"
                                value={data.dni}
                                onChange={(e) => setData('dni', e.target.value)}
                                error={errors.dni}
                                placeholder="Ingrese el DNI"
                                required
                            />

                            <Input
                                type="text"
                                label="Celular"
                                name="celular"
                                value={data.celular}
                                onChange={(e) => setData('celular', e.target.value)}
                                error={errors.celular}
                                placeholder="Ingrese el celular"
                                required
                            />
                        </div>
                    </div>
                </section>

                {/* Sección: Acceso y permisos */}
                <section className="pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldIcon className="w-4 h-4 text-primary-600" />
                        <h3 className="text-sm font-semibold text-texto-500 uppercase tracking-wide">
                            Acceso y permisos
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            label="Rol"
                            name="rol"
                            value={data.rol}
                            onChange={(e) => setData('rol', e.target.value)}
                            options={[
                                { value: 'editor', label: 'Editor' },
                                { value: 'administrador', label: 'Administrador' },
                            ]}
                            error={errors.rol}
                        />

                        <Select
                            label="Estado"
                            name="estado"
                            value={data.estado}
                            onChange={(e) => setData('estado', e.target.value)}
                            options={[
                                { value: 'activo', label: 'Activo' },
                                { value: 'inactivo', label: 'Inactivo' },
                                { value: 'suspendido', label: 'Suspendido' },
                            ]}
                            error={errors.estado}
                        />
                    </div>
                </section>

                {/* Sección: Seguridad */}
                <section className="pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                        <KeyIcon className="w-4 h-4 text-primary-600" />
                        <h3 className="text-sm font-semibold text-texto-500 uppercase tracking-wide">
                            Seguridad
                        </h3>
                    </div>

                    {isEditing ? (
                        <p className="text-xs text-gray-500 mb-4">
                            Deja estos campos en blanco si no deseas cambiar la contraseña.
                        </p>
                    ) : (
                        <div className="mb-4" />
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="password"
                            label={isEditing ? 'Nueva contraseña' : 'Contraseña'}
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            autoComplete="new-password"
                            required={!isEditing}
                        />

                        <Input
                            type="password"
                            label="Confirmar contraseña"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            error={errors.password_confirmation}
                            autoComplete="new-password"
                            required={!isEditing}
                        />
                    </div>
                </section>

                {/* Acciones */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={processing}
                        className="btnModalCancelar disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="btnModal inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing && (
                            <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        )}
                        {processing ? 'Guardando…' : isEditing ? 'Actualizar usuario' : 'Crear usuario'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}