import { useCallback, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { BookIcon, PlusIcon, PencilIcon, Trash2Icon, InboxIcon, SearchIcon } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

import { Pagination } from '@/Components/ui/Pagination';
import { Table } from '@/Components/ui/Table';
import FormularioLibro from './FormularioLibro';


//interfa
export interface Libro {
    id: number;
    titulo: string;
    autor: string;
    anio_publicacion: number | null;
}

interface LibrosPageProps {
    libros: {
        data: Libro[];
        links: any[];
        total: number;
    };
    filters: {
        buscar?: string;
    };
}

export default function Index({ libros, filters }: LibrosPageProps) {
    const { flash } = usePage().props;//para errores y success

    const [showModal, setShowModal] = useState(false);
    const [buscar, setbuscar] = useState(filters.buscar ?? '');
    const [DataEditar, setDataEditar] = useState<Libro | null>(null);


    const handlebuscar = (buscar: string) => {
        router.get('/libros', { buscar: buscar || undefined }, {
            preserveState: true,
            replace: true,
        });
    };


    const handleDelete = (id: number, titulo: string) => {
        if (!confirm(`¿Eliminar "${titulo}"? Esta acción no se puede deshacer.`)) return;
        router.delete(`/libros/${id}`);
    };

    return (
        <AdminLayout>
            <Head title="Libros" />

            <div className="p-6 max-w-7xl mx-auto">
                {flash?.success && (
                    <div role="status" className="flex items-center gap-2 bg-green-50 text-green-800 border border-green-200 px-4 py-3 mb-4 rounded-lg text-sm">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div role="alert" className="flex items-center gap-2 bg-red-50 text-colorError border border-red-200 px-4 py-3 mb-4 rounded-lg text-sm">
                        {flash.error}
                    </div>
                )}

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center">
                            <BookIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-texto-500">Libros</h1>
                            <p className="text-sm text-gray-500">{libros.total} libros registrados</p>
                        </div>
                    </div>
                    <button onClick={() => { setShowModal(true); setDataEditar(null); }} className="boton inline-flex items-center gap-2">
                        <PlusIcon className="w-4 h-4" />
                        Nuevo libro
                    </button>
                </div>

                <div className="flex items-center gap-2 w-full max-w-md mb-5">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={buscar}
                            onChange={(e) => setbuscar(e.target.value)}
                            className="inputField pl-9 bg-white"
                            placeholder="Buscar por título o autor…"
                        />
                    </div>
                    <button onClick={() => handlebuscar(buscar)} className="boton">
                        Buscar
                    </button>
                </div>

                <Table
                    headers={[
                        { key: 'titulo', label: 'Título' },
                        { key: 'autor', label: 'Autor' },
                        { key: 'anio', label: 'Año', align: 'center' },
                        { key: 'acciones', label: 'Acciones', align: 'right' },
                    ]}
                >
                    {libros.data.map((fila) => (
                        <Table.Row key={fila.id}>
                            <Table.Cell className="font-medium text-texto-500">{fila.titulo}</Table.Cell>
                            <Table.Cell>{fila.autor}</Table.Cell>
                            <Table.Cell align="center">
                                {fila.anio_publicacion ?? '—'}
                            </Table.Cell>
                            <Table.Cell align="right">
                                <div className="flex items-center justify-end gap-1">
                                    <button onClick={() => { setShowModal(true); setDataEditar(fila); }} className="p-2 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-md transition-colors">
                                        <PencilIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(fila.id, fila.titulo)} className="p-2 text-colorError hover:bg-red-50 rounded-md disabled:opacity-40 transition-colors">
                                        <Trash2Icon className="w-4 h-4" />
                                    </button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table>

                <div className="mt-5">
                    <Pagination links={libros.links} />
                </div>

                {showModal && (
                    <FormularioLibro
                        libro={DataEditar}
                        onClose={() => setShowModal(false)}
                        isOpen={showModal}
                    />
                )}
            </div>
        </AdminLayout>
    );
}