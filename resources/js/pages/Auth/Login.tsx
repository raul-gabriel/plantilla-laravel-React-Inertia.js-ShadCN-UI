import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface LoginProps {
    status?: string;
}

type LoginForm = {
    correo: string;
    password: string;
    remember: boolean;
};

export default function Login({ status }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        correo: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Iniciar Sesión" />

            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
                <div className="w-full max-w-sm">
                    {/* Logo / marca */}
                    <div className="flex justify-center mb-8">
                        <div className="h-11 w-11 rounded-xl bg-slate-900 flex items-center justify-center">
                            <Lock className="h-5 w-5 text-white" strokeWidth={2} />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                        <div className="mb-7">
                            <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                                Iniciar sesión
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                Ingresa tus datos para continuar
                            </p>
                        </div>

                        {status && (
                            <div
                                role="status"
                                className="mb-6 rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2.5 text-sm text-emerald-700"
                            >
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} noValidate className="space-y-5">
                            {/* Correo */}
                            <div>
                                <label htmlFor="correo" className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Correo electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        id="correo"
                                        type="email"
                                        name="correo"
                                        value={data.correo}
                                        onChange={(e) => setData('correo', e.target.value)}
                                        autoComplete="email"
                                        autoFocus
                                        required
                                        aria-invalid={!!errors.correo}
                                        aria-describedby={errors.correo ? 'correo-error' : undefined}
                                        placeholder="tucorreo@ejemplo.com"
                                        className={`w-full rounded-lg border bg-white pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${
                                            errors.correo ? 'border-red-300' : 'border-slate-300'
                                        }`}
                                    />
                                </div>
                                {errors.correo && (
                                    <p id="correo-error" className="mt-1.5 text-sm text-red-600">
                                        {errors.correo}
                                    </p>
                                )}
                            </div>

                            {/* Contraseña */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                        Contraseña
                                    </label>
                                </div>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        autoComplete="current-password"
                                        required
                                        aria-invalid={!!errors.password}
                                        aria-describedby={errors.password ? 'password-error' : undefined}
                                        placeholder="••••••••"
                                        className={`w-full rounded-lg border bg-white pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${
                                            errors.password ? 'border-red-300' : 'border-slate-300'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                        aria-pressed={showPassword}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none focus:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p id="password-error" className="mt-1.5 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Recordarme */}
                            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20"
                                />
                                Recordarme
                            </label>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                {processing ? 'Iniciando sesión…' : 'Iniciar sesión'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}