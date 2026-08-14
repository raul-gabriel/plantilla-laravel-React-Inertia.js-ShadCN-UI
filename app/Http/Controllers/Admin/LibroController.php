<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Middleware\ValidaRol;
use App\Models\Libro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LibroController extends Controller
{



    use ValidaRol;

    public function __construct()
    {
        $this->validarRol('administrador', 'editor');
    }



    public function index(Request $request)
    {
        $buscar = $request->buscar;

        $libros = DB::select("SELECT * FROM libros WHERE titulo LIKE ? OR autor LIKE ?  ORDER BY titulo", ["%$buscar%", "%$buscar%"]);

        return Inertia::render('libros/Index', [
            'libros' => [
                'data' => $libros,
            ],
            'filters' => $request->only('buscar'),
        ]);
    }


    /*public function index(Request $request)
    {
        $query = Libro::query();

        if ($request->buscar) {
            $query->where(function ($q) use ($request) {
                $q->where('titulo', 'like', "%{$request->buscar}%")
                    ->orWhere('autor', 'like', "%{$request->buscar}%");
            });
        }

        $libros = $query->orderBy('titulo')->paginate(15)->withQueryString();

        return Inertia::render('libros/Index', [
            'libros' => $libros,
            'filters' => $request->only(['buscar']),
        ]);
    }*/



    /*
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'autor' => 'required|string|max:255',
            'anio_publicacion' => 'nullable|digits:4|integer|min:1000|max:' . (date('Y') + 1),
        ]);
        Libro::create($request->only(['titulo', 'autor', 'anio_publicacion']));
        return redirect()->route('libros.index')->with('success', 'Libro creado correctamente.');
    }
    */



    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|min:2|max:255',
            'autor' => 'required|string|min:2|max:255',
            'anio_publicacion' => 'nullable|digits:4|integer|min:1000|max:' . date('Y'),
        ]);

        $resultado = DB::select('CALL sp_crear_libro(?, ?, ?)', [
            $validated['titulo'],
            $validated['autor'],
            $validated['anio_publicacion'] ?? null,
        ]);

        $resultado = $resultado[0];

        return redirect()
            ->route('libros.index')
            ->with($resultado->status, $resultado->message);
    }

    public function update(Request $request, Libro $libro)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|min:2|max:255',
            'autor' => 'required|string|min:2|max:255',
            'anio_publicacion' => 'nullable|digits:4|integer|min:1000|max:' . (date('Y') + 1),
        ]);

        $duplicado = Libro::where('titulo', $validated['titulo'])
            ->where('autor', $validated['autor'])
            ->where('id', '!=', $libro->id)
            ->exists();  //si existe true

        if ($duplicado) {
            return back()
                ->withErrors(['titulo' => 'Ya existe un libro con ese título del mismo autor.'])
                ->withInput();  //devolver sus mismos campos
        }

        $libro->update($validated);

        return redirect()
            ->route('libros.index')
            ->with('success', 'Libro actualizado correctamente.');
    }


    public function destroy(Libro $libro)
    {
        try {
            $libro->delete();
            return redirect()->route('libros.index')->with('success', 'Libro eliminado correctamente.');
        } catch (\Exception $e) {
            return redirect()->route('libros.index')->with('error', 'Error al eliminar el libro.');
        }
    }
}
