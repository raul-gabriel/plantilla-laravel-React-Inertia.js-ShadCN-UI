<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Session;

trait ValidaRol
{
    protected function validarRol(string ...$rolesPermitidos): void
    {
        $usuario = Session::get('usuario_logueado');
        $rolUsuario = strtolower(trim($usuario['rol'] ?? ''));

        if (!$usuario || !in_array($rolUsuario, array_map('strtolower', $rolesPermitidos))) {
            abort(403, 'No tienes permiso para acceder a esta sección');
        }
    }
}