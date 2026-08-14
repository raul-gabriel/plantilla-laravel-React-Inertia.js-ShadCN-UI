<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        // Manejo seguro del quote para evitar errores si falla
        try {
            [$message, $author] = str(Inspiring::quotes()->random())->explode('-');
            $quote = ['message' => trim($message), 'author' => trim($author)];
        } catch (\Exception $e) {
            $quote = ['message' => 'Inspiración no disponible', 'author' => 'Sistema'];
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => $quote,
            'auth' => [
                'user' => Session::get('usuario_logueado'),
                'authenticated' => Session::has('usuario_logueado'),
            ],
            // Flash messages - solo incluye si tienen valor para evitar null
            'flash' => array_filter([
                'success' => Session::get('success'),
                'error' => Session::get('error'),
                'warning' => Session::get('warning'),
                'info' => Session::get('info'),
            ]),
        

        ];
    }
}
