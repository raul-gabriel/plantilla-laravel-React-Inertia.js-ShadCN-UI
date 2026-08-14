<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class LoginController extends Controller
{

     public function indexDashboard(): Response
    {
        return Inertia::render('Dashboard');
    }


    public function index(): Response
    {
        return Inertia::render('Auth/Login');
    }

        public function iniciarSesion(Request $request)
        {
            $correo = $request->input('correo');
            $password = $request->input('password');

            // Buscar usuario directamente en la base de datos
            $usuario = DB::selectOne("
                SELECT id, nombres, correo, rol, dni, celular, estado
                FROM usuarios 
                WHERE correo = ? 
                AND password = SHA2(?, 256) 
                AND estado = 'activo'
            ", [$correo, $password]);

            if ($usuario) {
                // Limpiar sesión anterior
                Session::flush();
                
                // Regenerar ID de sesión
                $request->session()->regenerate();
                
                // Guardar datos del usuario en la sesión
                Session::put('usuario_logueado', [
                    'id' => $usuario->id,
                    'nombres' => $usuario->nombres,
                    'correo' => $usuario->correo,
                    'rol' => $usuario->rol,
                    'dni' => $usuario->dni,
                    'celular' => $usuario->celular
                ]);

                // VERIFICAR QUE SE GUARDÓ (DEBUG - remover después)
                Log::info('Sesión guardada:', Session::get('usuario_logueado'));
                
                // Usar redirect normal en lugar de Inertia::location
                return redirect()->route('dashboard');
            }

            return back()->withErrors([
                'correo' => 'Credenciales incorrectas'
            ])->withInput($request->only('correo'));
        }

    public function destroy(Request $request)
    {
        Session::forget('usuario_logueado');
        Session::flush();
        
        return redirect('/login');
    }
}