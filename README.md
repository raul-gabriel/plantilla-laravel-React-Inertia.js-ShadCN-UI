# Plantilla Laravel + React + Inertia.js + ShadCN UI

Este repositorio es una plantilla base para iniciar proyectos utilizando **Laravel** como backend y **React + Inertia.js** en el frontend, con integración de **ShadCN UI** y algunos componentes útiles como `button` y `card`. 

Diseñado como base para proyectos de **Guimae** / **GTUP**.

---

## 📋 Requisitos

- PHP 8.2+
- Composer
- Node.js & npm
- MySQL
- Laravel CLI (`laravel`)

---

## 🗄️ Base de datos
```sql
DROP DATABASE IF EXISTS db_nombre;
CREATE DATABASE db_nombre 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_general_ci;
USE db_nombre;

/*
INSERT INTO usuarios (nombres, celular, dni, rol, correo, password, estado) VALUES 
('Administrador del Sistema', '987654321', '12345678', 'administrador', 'admin@gmail.com', SHA2('123456', 256), 'activo');
*/

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    celular VARCHAR(9),
    dni VARCHAR(8) NOT NULL,
    rol ENUM('administrador', 'editor') DEFAULT 'editor',
    correo VARCHAR(50) NOT NULL,
    password VARCHAR(300) NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- tabla ejemplo:
CREATE TABLE libros (
    id int AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    anio_publicacion YEAR,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```
<details>
<summary>📚 Ejemplo SQL</summary>

### Tabla `libros`

```sql
CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    anio_publicacion YEAR,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Procedimiento para crear

```sql
DROP PROCEDURE IF EXISTS sp_crear_libro;
DELIMITER //

CREATE PROCEDURE sp_crear_libro(
    IN p_titulo VARCHAR(255),
    IN p_autor VARCHAR(255),
    IN p_anio_publicacion YEAR
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM libros
        WHERE titulo = p_titulo AND autor = p_autor
    ) THEN
        INSERT INTO libros (titulo, autor, anio_publicacion, created_at, updated_at)
        VALUES (p_titulo, p_autor, p_anio_publicacion, NOW(), NOW());

        SELECT 'success' AS status, 'Libro creado correctamente.' AS message;
    ELSE
        SELECT 'error' AS status, 'Ya existe un libro con ese título del mismo autor.' AS message;
    END IF;
END //

DELIMITER ;
```

### Procedimiento para actualizar

```sql
DROP PROCEDURE IF EXISTS sp_actualizar_libro;
DELIMITER //

CREATE PROCEDURE sp_actualizar_libro(
    IN p_id INT,
    IN p_titulo VARCHAR(255),
    IN p_autor VARCHAR(255),
    IN p_anio_publicacion YEAR
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM libros
        WHERE titulo = p_titulo
          AND autor = p_autor
          AND id <> p_id
    ) THEN
        UPDATE libros
        SET titulo = p_titulo,
            autor = p_autor,
            anio_publicacion = p_anio_publicacion,
            updated_at = NOW()
        WHERE id = p_id;

        SELECT 'success' AS status, 'Libro actualizado correctamente.' AS message;
    ELSE
        SELECT 'error' AS status, 'Ya existe otro libro con ese título del mismo autor.' AS message;
    END IF;
END //

DELIMITER ;

```

</details>
---

## 🛠️ Instalación

### 1. Crear un nuevo proyecto
```bash
laravel new nombre-del-proyecto
```

Durante la instalación, selecciona:
```
Which starter kit would you like to install?
› ● React

Which authentication provider do you prefer?
› ● No authentication scaffolding 

Which testing framework do you prefer?
› ● Pest 

Do you want to install Laravel Boost to improve AI assisted coding?
› ● No 

Would you like to run npm install and npm run build?
› ● Yes
```

Luego entra al proyecto:
```bash
cd nombre-del-proyecto
```

---

### 2. Instalar dependencias frontend
```bash
npm install lucide-react
```

### . librerias opcionales
```bash
npx shadcn@latest init
npx shadcn@latest add button card
```


---

### 3. Configurar la base de datos

Edita tu archivo `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_basededatos
DB_USERNAME=root
DB_PASSWORD=
```

Limpia la caché de configuración y ejecuta el servidor:
```bash
cd nombre_proyecto
php artisan migrate
php artisan config:clear
composer run dev
```

---

## 📁 Estructura del proyecto

Se realizaron las siguientes modificaciones en la estructura base de **Laravel + Inertia.js + React**:

- `resources/css/app.css` — estilos personalizados  
- `app/Models/Usuario.php` — modelo para usuarios  
- `app/Http/Controllers/Auth/` — controladores de autenticación
- `app/Http/Controllers/Admin/` — controladores de administración
- `app/Http/Middleware/CheckLogin.php` — middleware de autenticación
- `app/Http/Middleware/HandleInertiaRequests.php` — configuración de Inertia
- `app/Http/Middleware/ValidaRol.php` — Guard para roles especificos
- `resources/js/Components/` — componentes reutilizables
- `resources/js/Layouts/` — layouts de la aplicación
- `resources/js/pages/` — páginas del proyecto
- `resources/js/types/typeGlobales.ts` — tipos TypeScript globales
- `resources/js/types/global.d.ts` — tipos TypeScript props de inertia

---

## 🧭 Rutas

**Archivo:** `routes/web.php`

Ejemplo de configuración de rutas:
```php
<?php

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
});
```


## 🔒 Protección por rol (`validarRol`)

**Archivo:** `app/Http/Middleware/ValidaRol.php`

Trait reutilizable para restringir el acceso a un controlador completo o a funciones específicas, según el rol del usuario logueado (`Session::get('usuario_logueado')`).

### Uso básico

1. Importa el trait y agrégalo con `use ValidaRol;` dentro de la clase.
2. Llama a `$this->validarRol('rol1', 'rol2', ...)` con los roles permitidos.

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Middleware\ValidaRol;

class UsuarioController extends Controller
{
    use ValidaRol;

    public function __construct()
    {
        // Aplica a TODAS las funciones del controlador
        $this->validarRol('administrador');
    }
}
```

### Proteger solo una función específica

```php
class ReporteController extends Controller
{
    use ValidaRol;

    public function index()
    {
        // Sin restricción de rol
    }

    public function exportarExcel()
    {
        // Solo esta función está protegida
        $this->validarRol('administrador', 'supervisor');
        // ...
    }
}
```

### Permitir varios roles

Solo agrega más argumentos separados por coma:

```php
$this->validarRol('administrador', 'supervisor', 'vendedor');
```

> ⚠️ El método es `protected`, por lo que **nunca** puede ser llamado desde una ruta/URL — solo desde dentro del propio controlador (constructor o cualquier método).

> Los nombres de rol deben coincidir con el valor guardado en la columna `rol` de la tabla `usuarios` (no distingue mayúsculas/minúsculas).


---

## 🎯 Uso de Inertia en controladores

### Renderizar una página
```php
use Inertia\Inertia;

public function index()
{
    return Inertia::render('Posts/Index', [
        'posts' => Post::all()
    ]);
}
```

### Redireccionar con mensaje flash
```php
return redirect()->route('posts.index')
    ->with('success', 'Post creado exitosamente');
```

---

## 🔧 Comandos útiles

### Crear un controlador resource
```bash
php artisan make:controller NombreDelControlador --resource
```

### Crear un modelo con migración
```bash
php artisan make:model NombreModelo -m
```

### Limpiar caché
```bash
php artisan optimize:clear
```

### Generar rutas para Wayfinder (opcional)
```bash
php artisan wayfinder:generate
```

---

## 🚀 Desarrollo

Ejecuta ambos servidores simultáneamente:
```bash
composer run dev
```

---

## 📦 Tecnologías incluidas

- **Laravel 12** - Framework PHP
- **React 18** - Biblioteca de UI
- **Inertia.js 2** - Adaptador SPA
- **TypeScript** - Tipado estático
- **ShadCN UI** - Componentes de UI
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconos
- **Vite** - Build tool

---

## 📝 Notas importantes

- **No se usan las tablas de autenticación de Laravel por defecto** (users, password_resets, etc.)
- Se utiliza una tabla `usuarios` personalizada con campos específicos del proyecto
- El sistema de sesiones usa `file` driver para evitar dependencias de base de datos
- Las rutas usan URLs directas en lugar de helpers como `route()` para mayor simplicidad

---


# Plantilla Laravel + React + Inertia.js + ShadCN UI

![Preview](./public/captura.png)
