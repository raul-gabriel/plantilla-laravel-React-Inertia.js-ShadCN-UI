<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rule;

use Inertia\Inertia;



class PerfilController extends Controller
{
    public function index()
    {
        $user = Session::get('usuario_logueado');

        return Inertia::render('Perfil/Index', [
            'user' => $user,
        ]);
    }

    public function update(Request $request)
    {
        $user = Session::get('usuario_logueado');

        if (!$user) {
            return redirect()->route('login');
        }

        $validated = $request->validate([
            'nombres' => 'required|string|max:255',
            'celular' => 'nullable|string|max:9',
            'dni' => 'required|string|max:8',
            'correo' => [
                'required',
                'email',
                'max:50',
                Rule::unique('usuarios')->ignore($user['id'])
            ],
        ]);

        $usuario = Usuario::find($user['id']);
        $usuario->update($validated);

        // Actualizar sesión
        Session::put('usuario_logueado', $usuario->toArray());

        return back()->with('success', 'Perfil actualizado correctamente');
    }

    public function updatePassword(Request $request)
    {
        $user = Session::get('usuario_logueado');

        if (!$user) {
            return redirect()->route('login');
        }

        $validated = $request->validate([
            'current_password' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        $usuario = Usuario::find($user['id']);

        // Verificar contraseña actual con SHA256
        if (hash('sha256', $validated['current_password']) !== $usuario->password) {
            return back()->withErrors(['current_password' => 'La contraseña actual es incorrecta']);
        }

        // Guardar nueva contraseña con SHA256
        $usuario->update([
            'password' => hash('sha256', $validated['password'])
        ]);

        return back()->with('success', 'Contraseña actualizada correctamente');
    }
}
