import { useForm } from '@inertiajs/react';
import { Input } from '@/Components/ui/CampoForm';
import { Modal } from '@/Components/ui/Modal';
import { BookIcon } from 'lucide-react';
import { Libro } from './Index';

interface Props {
    libro: Libro | null;
    onClose: () => void;
    isOpen: boolean;
}

export default function FormularioLibro({ libro, onClose, isOpen }: Props) {
    const isEditing = !!libro;

    const { post, put, data, setData, processing, errors, reset } = useForm({
        titulo: libro?.titulo ?? '',
        autor: libro?.autor ?? '',
        anio_publicacion: libro?.anio_publicacion?.toString() ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const onSuccess = () => {
            reset();
            onClose();
        };

        if (isEditing) {
            put(`/libros/${libro!.id}`, { onSuccess });
        } else {
            post('/libros', { onSuccess });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Editar libro' : 'Nuevo libro'} size="lg">
            <form onSubmit={submit} className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <BookIcon className="w-4 h-4 text-primary-600" />
                    <h3 className="text-sm font-semibold text-texto-500 uppercase tracking-wide">
                        Datos del libro
                    </h3>
                </div>

                <Input
                    type="text"
                    label="Título"
                    name="titulo"
                    value={data.titulo}
                    onChange={(e) => setData('titulo', e.target.value)}
                    error={errors.titulo}
                    placeholder="Ingrese el título"
                    required
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        type="text"
                        label="Autor"
                        name="autor"
                        value={data.autor}
                        onChange={(e) => setData('autor', e.target.value)}
                        error={errors.autor}
                        placeholder="Ingrese el autor"
                        required
                    />

                    <Input
                        type="number"
                        label="Año de publicación"
                        name="anio_publicacion"
                        value={data.anio_publicacion}
                        onChange={(e) => setData('anio_publicacion', e.target.value)}
                        error={errors.anio_publicacion}
                        placeholder="Ej. 2024"
                    />
                </div>

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
                        {processing ? 'Guardando…' : isEditing ? 'Actualizar libro' : 'Crear libro'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}