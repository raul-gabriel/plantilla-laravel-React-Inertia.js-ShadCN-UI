import { useCallback, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { UsersIcon, PlusIcon, SearchIcon, PencilIcon, Trash2Icon, InboxIcon } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import FormularioUsuario from './FormularioUsuario';
import { Pagination } from '@/Components/ui/Pagination';
import { Usuario } from '@/types/typeGlobales';
import { Table } from '@/Components/ui/Table';

interface UsuariosPageProps {
    usuarios: {
        data: Usuario[];
        links: any[];
        total: number;
    };
    filters: {
        search?: string;
    };
}

const ESTADO_STYLES: Record<string, string> = {
    activo: 'bg-green-100 text-green-800',
    suspendido: 'bg-red-100 text-red-800',
    inactivo: 'bg-gray-100 text-gray-800',
};

export default function Index({ usuarios, filters }: UsuariosPageProps) {
    const { flash } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<Usuario | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const buscar = useCallback((term: string) => {
        router.get('/usuarios', { search: term || undefined }, {
            preserveState: true,
            replace: true,
        });
    }, []);

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            buscar(search);
        }
    };

    const handleEdit = (user: Usuario) => {
        setEditingUser(user);
        setShowModal(true);
    };

    const handleCreate = () => {
        setEditingUser(null);
        setShowModal(true);
    };

    const handleDelete = (id: number, nombre: string) => {
        if (!confirm(`¿Eliminar a ${nombre}? Esta acción no se puede deshacer.`)) return;

        setDeletingId(id);
        router.delete(`/usuarios/${id}`, {
            preserveState: false,
            onFinish: () => setDeletingId(null),
        });
    };

    return (
        <AdminLayout>
            <Head title="Usuarios" />

            <div className="p-6 max-w-7xl mx-auto ">
                {flash?.success && (
                    <div role="status" className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-3 mb-4 rounded-lg text-sm">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div role="alert" className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-100 px-4 py-3 mb-4 rounded-lg text-sm">
                        {flash.error}
                    </div>
                )}

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center">
                            <UsersIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-slate-900">Usuarios</h1>
                            <p className="text-sm text-slate-500">{usuarios.total} usuarios registrados</p>
                        </div>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="boton inline-flex items-center gap-2"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Nuevo
                    </button>
                </div>

                <div className="flex items-center gap-2 w-full max-w-md mb-5">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            className="bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 w-full text-sm placeholder-slate-400 outline-none focus:ring-1 focus:ring-slate-900/10 focus:border-primary-500 transition-colors"
                            placeholder="Buscar por nombre, correo o DNI…"
                        />
                    </div>
                    <button
                        onClick={() => buscar(search)}
                        className="boton"
                    >
                        Buscar
                    </button>
                </div>

                <Table
                    headers={[
                        { key: 'nombre', label: 'Nombres' },
                        { key: 'correo', label: 'Correo' },
                        { key: 'dni', label: 'DNI' },
                        { key: 'estado', label: 'Estado', align: 'center' },
                        { key: 'acciones', label: 'Acciones', align: 'right' },
                    ]}
                >
                    {usuarios.data.length === 0 ? (
                        <Table.Row>
                            <Table.Cell colSpan={5} align="center">
                                <div className="flex flex-col items-center gap-2 py-10 text-slate-400">
                                    <InboxIcon className="w-8 h-8" />
                                    <span className="text-sm">No se encontraron usuarios.</span>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ) : (
                        usuarios.data.map((usuario) => (
                            <Table.Row key={usuario.id}>
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-semibold shrink-0">
                                            {usuario.nombres.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium text-slate-900">{usuario.nombres}</span>
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="text-slate-500">{usuario.correo}</Table.Cell>
                                <Table.Cell className="text-slate-500">{usuario.dni}</Table.Cell>
                                <Table.Cell align="center">
                                    <span
                                        className={`px-2.5 py-1 text-xs rounded-full font-medium ${ESTADO_STYLES[usuario.estado] ?? ESTADO_STYLES.inactivo
                                            }`}
                                    >
                                        {usuario.estado}
                                    </span>
                                </Table.Cell>
                                <Table.Cell align="right">
                                    <div className="flex items-center justify-end gap-1">
                                        <button
                                            onClick={() => handleEdit(usuario)}
                                            aria-label={`Editar a ${usuario.nombres}`}
                                            className="p-2 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-md transition-colors"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(usuario.id, usuario.nombres)}
                                            aria-label={`Eliminar a ${usuario.nombres}`}
                                            disabled={deletingId === usuario.id}
                                            className="p-2 text-colorError hover:text-red-700 hover:bg-red-50 rounded-md disabled:opacity-40 transition-colors"
                                        >
                                            <Trash2Icon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    )}
                </Table>

                <div className="mt-5">
                    <Pagination links={usuarios.links} />
                </div>

                {showModal && (
                    <FormularioUsuario
                        user={editingUser}
                        onClose={() => setShowModal(false)}
                        isOpen={showModal}
                    />
                )}
            </div   >
        </AdminLayout>
    );
}