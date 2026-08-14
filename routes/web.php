<?php

use App\Http\Controllers\Admin\LibroController;
use App\Http\Controllers\Admin\PerfilController;
use App\Http\Controllers\Admin\UsuarioController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Autenticación
Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'iniciarSesion']);
Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

// Rutas protegidas
Route::middleware(\App\Http\Middleware\CheckLogin::class)->group(function () {
    Route::get('/dashboard', [LoginController::class, 'indexDashboard'])->name('dashboard');
    
    // Perfil
    Route::get('/perfil', [PerfilController::class, 'index'])->name('perfil.index');
    Route::put('/perfil', [PerfilController::class, 'update'])->name('perfil.update');
    Route::put('/perfil/password', [PerfilController::class, 'updatePassword'])->name('perfil.password');
    
    // Usuarios (CRUD completo)
    Route::resource('usuarios', UsuarioController::class);


    Route::resource('libros', LibroController::class)->except(['create', 'edit', 'show']);
});