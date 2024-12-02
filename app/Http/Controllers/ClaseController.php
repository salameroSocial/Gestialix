<?php

namespace App\Http\Controllers;

use App\Models\Clase;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClaseController extends Controller
{
    public function index()
    {
        return Clase::with('estudiantes')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) 
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'curso_academico' => 'required|regex:/^\d{4}\/\d{4}$/',
        ]);

        $class = Clase::create($validatedData);

        // Asegurar que 'estudiantes' esté inicializado como un array vacío
        $class->estudiantes = [];
        return response()->json($class, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'curso_academico' => 'required|regex:/^\d{4}\/\d{4}$/',
        ]);

        $class = Clase::findOrFail($id);
        $class->update($validatedData);

        // Cargar estudiantes y devolver en la respuesta
        $class->load('estudiantes');
        return response()->json($class);
    }




    public function edit($id)
    {
        // Find the class by ID
        $clase = Clase::findOrFail($id);

        // Render the edit form
        return Inertia::render('Clases/Edit', [
            'clase' => $clase
        ]);
    }



    // Eliminar una clase específica
    public function destroy($id)
    {
        // Buscar la clase por ID o lanzar un error 404 si no existe
        $clase = Clase::findOrFail($id);

        // Borrar manualmente los estudiantes asociados antes de borrar la clase
        $clase->estudiantes()->delete();

        // Borrar la clase
        $clase->delete();

        // Redireccionar a la página de índice de clases con un mensaje de éxito
        return Inertia::render(
            'ClasesManagement/Index',
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
}
