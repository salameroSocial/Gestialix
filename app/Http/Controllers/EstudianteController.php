<?php
// app/Http/Controllers/EstudianteController.php
namespace App\Http\Controllers;

use App\Models\Asistencia;
use App\Models\Estudiante;
use App\Models\Clase;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EstudianteController extends Controller
{
    // Listar todos los estudiantes
    public function index()
    {
        $estudiantes = Estudiante::with('clase')->get();

        return Inertia::render('Estudiantes/Index', [
            'estudiantes' => $estudiantes
        ]);
    }

    // Crear un nuevo estudiante
    public function create()
    {
        $clases = Clase::all();
        return Inertia::render('Estudiantes/Create', [
            'clases' => $clases
        ]);
    }

    public function store(Request $request, Clase $class)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'intolerancia_religion' => 'nullable|string|max:255',
            'beca' => 'boolean'
        ]);

        $estudiante = $class->estudiantes()->create($validatedData);

        return response()->json($estudiante, 201);
    }

    // Mostrar un estudiante específico
    public function show($id)
    {
        $estudiante = Estudiante::with('clase')->findOrFail($id);

        return Inertia::render('Estudiantes/Show', [
            'estudiante' => $estudiante
        ]);
    }

    // Editar un estudiante específico
    public function edit($id)
    {
        $estudiante = Estudiante::findOrFail($id);
        $clases = Clase::all();

        return Inertia::render('Estudiantes/Edit', [
            'estudiante' => $estudiante,
            'clases' => $clases
        ]);
    }

    // Actualizar un estudiante específico
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                // 'id' => 'required|string|max:255',
                'nombre' => 'required|string|max:255',
                'apellidos' => 'required|string|max:255',
                'pago' => 'boolean',
                'intolerancia_religion' => 'nullable|string|max:255',
                'beca' => 'boolean'
            ]);

            $estudiante = Estudiante::findOrFail($id);
            $estudiante->update($request->all());
            return response()->json($estudiante, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function actualizaClase(Request $request, $id)
    {
        try {
            $clase = Clase::findOrFail($id);
            $clase->update($request->all());
            return response()->json(['message' => 'Clase actualizada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    // Eliminar un estudiante específico
    public function destroy($classId, $studentId)
    {
        $estudiante = Estudiante::where('id', $studentId)
            ->where('clase_id', $classId)
            ->firstOrFail();

        $estudiante->delete();

        return response()->json(['message' => 'Estudiante eliminado correctamente']);
    }

    public function toggleAssignment(Estudiante $student)
    {
        $student->asignado_comedor = !$student->asignado_comedor;

        if ($student->asignado_comedor) {
            $student->asignado_at = now(); // Asigna la fecha actual
        } else {
            $student->asignado_at = null; // Borra la fecha si se desasigna
        }

        $student->save();

        return response()->json($student); // Devuelve el estudiante actualizado
    }

    public function updateStudent(Request $request, $id)
    {
        $estudiante = Estudiante::findOrFail($id);

        // Actualiza los datos del estudiante
        $estudiante->asignado_comedor = $request->input('asignado_comedor');
        $estudiante->save();

        // Si ya no está asignado al comedor, elimina sus asistencias
        if (!$estudiante->asignado_comedor) {
            Asistencia::where('estudiante_id', $id)->delete();
        }

        return response()->json(['message' => 'Estudiante actualizado']);
    }
}
