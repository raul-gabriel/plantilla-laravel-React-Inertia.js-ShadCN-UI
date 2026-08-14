<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Usuario extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'usuarios';

    protected $fillable = [
        'nombres',
        'celular',
        'dni',
        'rol',
        'correo',
        'password',
        'estado',
    ];

    protected $hidden = [
        'password',
    ];

    // Removemos el cast de password ya que usaremos SHA
    protected $casts = [
        // 'password' => 'hashed',
    ];

    // Sobrescribir métodos para usar 'correo' en lugar de 'email'
    public function getAuthIdentifierName()
    {
        return 'correo';
    }

    public function getEmailForPasswordReset()
    {
        return $this->correo;
    }
    public $timestamps = false;

}