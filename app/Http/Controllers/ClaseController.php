<?php

namespace App\Http\Controllers;

use App\Models\Clase;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClaseController extends Controller
{
    public function index()
    {
        return Clase::with('estudiantes')->get();  // Devuelve todas las clases en formato JSON
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
            'curso_academico' => 'required|string|max:255',
        ]);

        $clase = Clase::create($validatedData);
        // dd($clase);
        // Hacer un refresh
        return response()->json($clase, 201);
    }


    /**
     * Display the specified class resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // Mostrar una clase específica junto con sus estudiantes
    // public function show($id)
    // {
    //     // Find the class by ID with its related students
    //     $clase = Clase::with('estudiantes')->findOrFail($id);

    //     return Inertia::render('Clases/Show', [
    //         'clase' => $clase
    //     ]);
    //     // Render the show view with the class data
    // }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // Find the class by ID
        $clase = Clase::findOrFail($id);

        // Render the edit form
        return Inertia::render('Clases/Edit', [
            'clase' => $clase
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    // public function update(Request $request, $id)
    // {
    //     // Validate the request data
    //     $request->validate([
    //         'nombre' => 'required|string|max:255',
    //         'curso_academico' => 'required|string|max:255',
    //     ]);

    //     // Find the class by ID or throw a 404 error
    //     $clase = Clase::findOrFail($id);

    //     // Update the class with validated data
    //     $clase->update($request->all());

    //     // Redirect to the classes index with a success message

    //     return response()->json($clase, 201);
    // }
    public function update(Request $request, $id)
    {
        $class = Clase::findOrFail($id);
        $class->update($request->all());
        // return response()->json($class);
        return response()->json(['message' => 'Clase actualizada correctamente']);
    }



    /*************  ✨ Codeium Command 🌟  *************/
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
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
