import { Head } from '@inertiajs/react';
import { Link } from 'lucide-react';

export default function Welcome() {
    return (
        <>
            <a className='bg-primary p-2 mt-4 ml-4' href="/login">Iniciar sesión</a>
        </>
    );
}
