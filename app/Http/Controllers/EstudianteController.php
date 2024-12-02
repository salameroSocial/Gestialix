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

    public function store(Request $request)
    {
        try {
            // Validar los datos del request
            $validatedData = $request->validate([
                'nombre' => 'required|string|max:255',
                'apellidos' => 'required|string|max:255',
                'clase_id' => 'required|exists:clases,id', // Validar que el ID de la clase existe
                'intolerancia_religion' => 'nullable|array',
                'intolerancia_religion.*' => 'string|max:255',
                'beca' => 'boolean',
            ]);

            // Convertir intolerancia_religion a JSON si existe
            if (isset($validatedData['intolerancia_religion'])) {
                $validatedData['intolerancia_religion'] = json_encode($validatedData['intolerancia_religion']);
            }

            // Crear el estudiante
            $estudiante = Estudiante::create($validatedData);

            // Retornar la respuesta exitosa
            return response()->json([
                'message' => 'Estudiante creado correctamente.',
                'estudiante' => $estudiante,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Retornar errores de validación
            return response()->json([
                'message' => 'Error en la validación de los datos.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Retornar errores generales
            return response()->json([
                'message' => 'Error al crear el estudiante.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'intolerancia_religion' => 'nullable|array',
            'intolerancia_religion.*' => 'string|max:255',
            'beca' => 'boolean',
        ]);

        // Convertimos intolerancia_religion a JSON
        $validatedData['intolerancia_religion'] = json_encode($validatedData['intolerancia_religion']);

        $student = Estudiante::findOrFail($id);
        $student->update($validatedData);

        // Decodificamos antes de enviar al frontend
        $student->intolerancia_religion = json_decode($student->intolerancia_religion);

        return response()->json($student, 200);
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
