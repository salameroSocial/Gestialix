<?php

namespace App\Http\Controllers;

use App\Models\Ocasional;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OcasionalesController extends Controller
{

    public function index(Request $request)
    {
        $validated = $request->validate([
            'class_id' => 'required|exists:clases,id',
        ]);

        $ocasionales = Ocasional::where('clase_id', $validated['class_id'])
            ->with('estudiante') // Asegúrate de tener esta relación en el modelo Ocasional
            ->get();

        return response()->json($ocasionales, 200);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'estudiante_id' => 'required|exists:estudiantes,id',
            'clase_id' => 'required|exists:clases,id',
            'fecha' => 'required|date',
        ]);
        // dd($validated);
        try {
            $ocasional = Ocasional::create($validated);

            return response()->json([
                'message' => 'Estudiante ocasional registrado correctamente.',
                'ocasional' => $ocasional,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al registrar el estudiante ocasional.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    // Metodo show en el que se muestran ocasionales segun el id de la clase
    public function show($id)
    {
        $ocasionales = Ocasional::where('clase_id', $id)->with('estudiante')->get();
        return response()->json($ocasionales);
    }

    public function ocasionalsByClass($classId)
    {
        $ocasionales = Ocasional::where('clase_id', $classId)->with('estudiante')->get();
        return response()->json($ocasionales);
    }

    public function assignOccasional(Request $request)
    {
        // Validar los datos requeridos
        $validatedData = $request->validate([
            'estudiante_id' => 'required|exists:estudiantes,id',
            'fecha' => 'required|date',
            'clase_id' => 'required|exists:clases,id',
        ]);

        // Verificar si ya existe un registro para evitar duplicados
        $exists = DB::table('ocasionals')
            ->where('estudiante_id', $validatedData['estudiante_id'])
            ->where('fecha', $validatedData['fecha'])
            ->where('clase_id', $validatedData['clase_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'El estudiante ya está asignado como ocasional para este día.',
            ], 400);
        }

        // Insertar el nuevo registro
        $id = DB::table('ocasionals')->insertGetId([
            'estudiante_id' => $validatedData['estudiante_id'],
            'fecha' => $validatedData['fecha'],
            'clase_id' => $validatedData['clase_id'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Estudiante ocasional asignado para el día.',
            'id' => $id,
        ], 201);
    }


    public function getOccasionals(Request $request)
    {
        $validatedData = $request->validate([
            'fecha' => 'required|date',
            'clase_id' => 'required|exists:clases,id',
        ]);

        $ocasionales = DB::table('ocasionales')
            ->where('fecha', $validatedData['fecha'])
            ->where('clase_id', $validatedData['clase_id'])
            ->join('estudiantes', 'estudiantes.id', '=', 'ocasionales.estudiante_id')
            ->select('estudiantes.id', 'estudiantes.nombre', 'estudiantes.apellidos', 'ocasionales.fecha')
            ->get();

        return response()->json($ocasionales);
    }


    public function deleteOccasionalStudent($id)
    {
        try {
            $ocasional = Ocasional::where('estudiante_id', $id)->first();

            if (!$ocasional) {
                return response()->json(['message' => 'Estudiante ocasional no encontrado.'], 404);
            }

            $ocasional->delete();

            return response()->json(['message' => 'Estudiante ocasional desasignado correctamente.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al desasignar estudiante.', 'error' => $e->getMessage()], 500);
        }
    }

    public function unassignOccasional(Request $request)
    {
        $estudianteId = $request->input('estudiante_id');
        $fecha = $request->input('fecha'); // Fecha del día actual

        DB::table('ocasionales')
            ->where('estudiante_id', $estudianteId)
            ->where('fecha', $fecha)
            ->delete();

        return response()->json(['message' => 'Desasignado correctamente para el día indicado.']);
    }

    public function getByDate(Request $request)
    {
        // Validar los parámetros requeridos
        $validatedData = $request->validate([
            'fecha' => 'required|date', // Fecha requerida
            'clase_id' => 'required|exists:clases,id', // ID de clase requerido
        ]);

        // Consultar los estudiantes ocasionales para la fecha y clase específicas
        $ocasionales = DB::table('ocasionals as o')
            ->join('estudiantes as e', 'e.id', '=', 'o.estudiante_id') // Join con tabla estudiantes
            ->where('o.fecha', $validatedData['fecha']) // Filtrar por fecha
            ->where('o.clase_id', $validatedData['clase_id']) // Filtrar por clase
            ->select(
                'o.id as ocasional_id',         // ID único del registro ocasional
                'e.id as estudiante_id',        // ID del estudiante
                'e.nombre',                     // Nombre del estudiante
                'e.apellidos',                  // Apellidos del estudiante
                'o.fecha',                      // Fecha de asignación
                'o.created_at as asignado_en'   // Fecha de creación del registro
            )
            ->get();

        // Retornar los datos en formato JSON

        return response()->json($ocasionales);
    }
}
