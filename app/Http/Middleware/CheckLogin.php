<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

/*
class CheckLogin
{
    public function handle(Request $request, Closure $next)
    {
        if (!Session::has('usuario_logueado')) {
            return redirect('/login')->withErrors(['error' => 'Debe iniciar sesión']);
        }

        return $next($request);
    }
}*/

class CheckLogin
{
    public function handle(Request $request, Closure $next)
    {
        if (!Session::has('usuario_logueado')) {

            // Si es una petición API, retornar JSON
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'error' => 'No autorizado',
                    'message' => 'Debe iniciar sesión'
                ], 401);
            }

            // Si es web, redirigir
            return redirect('/login')->withErrors(['error' => 'Debe iniciar sesión']);
        }

        return $next($request);
    }
}