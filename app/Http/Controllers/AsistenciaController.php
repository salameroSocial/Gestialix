<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use Illuminate\Http\Request;
use App\Models\Estudiante;
use App\Models\Ocasional;

class AsistenciaController extends Controller
{
    // Listar todas las asistencias
    public function index()
    {
        $attendances = Asistencia::with('estudiante')->get();
        return response()->json($attendances);
    }

    // Mostrar una asistencia específica
    public function show($id)
    {
        $attendance = Asistencia::with('estudiante')->find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Asistencia no encontrada'], 404);
        }

        return response()->json($attendance);
    }

    // Crear una nueva asistencia
    public function store(Request $request)
    {
        $validated = $request->validate([
            'estudiante_id' => 'nullable|exists:estudiantes,id',
            'ocasional_id' => 'nullable|exists:ocasionals,id',
            'fecha' => 'required|date',
            'asiste' => 'required|boolean',
            'es_dia_suelto' => 'required|boolean',
        ]);

        if (is_null($validated['estudiante_id']) && is_null($validated['ocasional_id'])) {
            return response()->json([
                'error' => 'Debe proporcionar un estudiante regular o un estudiante ocasional.',
            ], 400);
        }

        $attendance = Asistencia::create($validated);

        return response()->json([
            'message' => 'Asistencia registrada exitosamente.',
            'attendance' => $attendance,
        ], 201);
    }



    // Actualizar una asistencia existente
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'asiste' => 'required|boolean',
        ]);

        $asistencia = Asistencia::findOrFail($id);
        $asistencia->update(['asiste' => $validatedData['asiste']]);

        return response()->json(['message' => 'Asistencia actualizada correctamente', 'data' => $asistencia]);
    }

    // Eliminar una asistencia
    public function destroy($id)
    {
        $attendance = Asistencia::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Asistencia no encontrada'], 404);
        }

        $attendance->delete();

        return response()->json(['message' => 'Asistencia eliminada exitosamente']);
    }



    public function obtenerAsistenciaFiltrada(Request $request)
    {
        $fecha = $request->input('date');
        $claseId = $request->input('class_id');

        // Validar que los parámetros estén presentes
        if (!$fecha || !$claseId) {
            return response()->json([
                'error' => 'Fecha y clase son requeridas'
            ], 400);
        }

        // Consulta para obtener la asistencia filtrada
        $asistencias = Asistencia::with('estudiante')
            ->where('fecha', $fecha)
            ->whereHas('estudiante', function ($query) use ($claseId) {
                $query->where('clase_id', $claseId);
            })
            ->get();

        return response()->json($asistencias);
    }


    public function getOrCreateAttendance(Request $request)
    {
        $fecha = $request->input('date');
        $claseId = $request->input('class_id');

        if (!$fecha || !$claseId) {
            return response()->json([
                'error' => 'Fecha y clase son requeridas.'
            ], 400);
        }

        // Obtener estudiantes regulares de la clase seleccionada sin asistencia para la fecha dada
        $estudiantesSinAsistencia = Estudiante::select('id', 'nombre', 'apellidos', 'clase_id')
            ->where('clase_id', $claseId)
            ->where('asignado_comedor', 1)
            ->whereNotExists(function ($query) use ($fecha) {
                $query->selectRaw(1)
                    ->from('asistencias')
                    ->whereRaw('asistencias.estudiante_id = estudiantes.id')
                    ->where('asistencias.fecha', $fecha);
            })
            ->get();

        // Insertar asistencias para estudiantes regulares que no tienen registro
        Asistencia::insertOrIgnore(
            $estudiantesSinAsistencia->map(function ($estudiante) use ($fecha) {
                return [
                    'estudiante_id' => $estudiante->id,
                    'ocasional_id' => null,
                    'fecha' => $fecha,
                    'asiste' => 1,
                    'es_dia_suelto' => 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            })->toArray()
        );

        // Obtener estudiantes ocasionales sin asistencia para la fecha dada
        $ocasionalsSinAsistencia = Ocasional::select('id', 'estudiante_id', 'clase_id')
            ->where('clase_id', $claseId)
            ->whereNotExists(function ($query) use ($fecha) {
                $query->selectRaw(1)
                    ->from('asistencias')
                    ->whereRaw('asistencias.ocasional_id = ocasionals.id')
                    ->where('asistencias.fecha', $fecha);
            })
            ->get();

        // Insertar asistencias para estudiantes ocasionales que no tienen registro
        Asistencia::insertOrIgnore(
            $ocasionalsSinAsistencia->map(function ($ocasional) use ($fecha) {
                return [
                    'estudiante_id' => null,
                    'ocasional_id' => $ocasional->id,
                    'fecha' => $fecha,
                    'asiste' => 1,
                    'es_dia_suelto' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            })->toArray()
        );

        // Recuperar todas las asistencias de la clase para la fecha dada
        $asistencias = Asistencia::with(['estudiante', 'ocasional.estudiante'])
            ->where(function ($query) use ($claseId) {
                $query->whereHas('estudiante', function ($subquery) use ($claseId) {
                    $subquery->where('clase_id', $claseId);
                })
                    ->orWhereHas('ocasional', function ($subquery) use ($claseId) {
                        $subquery->where('clase_id', $claseId);
                    });
            })
            ->where('fecha', $fecha)
            ->get();

        return response()->json($asistencias);
    }
}
