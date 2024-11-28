<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use Illuminate\Http\Request;
use App\Models\Estudiante;

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
            'estudiante_id' => 'required|exists:students,id',
            'fecha' => 'required|date',
            'asiste' => 'required|boolean',
            'es_dia_suelto' => 'required|boolean',
        ]);

        $attendance = Asistencia::create($validated);

        return response()->json(['message' => 'Asistencia creada exitosamente', 'attendance' => $attendance], 201);
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

        // Validar que los parámetros estén presentes
        if (!$fecha || !$claseId) {
            return response()->json([
                'error' => 'Fecha y clase son requeridas'
            ], 400);
        }

        // Obtener estudiantes de la clase que no tienen asistencia en la fecha
        $estudiantesSinAsistencia = Estudiante::select('id')
            ->where('clase_id', $claseId)
            ->where('asignado_comedor', 1)
            ->whereNotExists(function ($query) use ($fecha) {
                $query->selectRaw(1)
                    ->from('asistencias')
                    ->whereRaw('asistencias.estudiante_id = estudiantes.id')
                    ->where('asistencias.fecha', $fecha);
            })
            ->get();

        // Crear asistencias para los estudiantes que no tienen registro
        Asistencia::insertOrIgnore(
            $estudiantesSinAsistencia->map(function ($estudiante) use ($fecha) {
                return [
                    'estudiante_id' => $estudiante->id,
                    'fecha' => $fecha,
                    'asiste' => 1,
                    'es_dia_suelto' => 0,
                ];
            })->toArray()
        );

        // Recuperar asistencias con datos del estudiante

        $asistencias = Asistencia::with('estudiante')
            ->whereHas('estudiante', function ($query) use ($claseId) {
                $query->where('clase_id', $claseId)
                    ->where('asignado_comedor', true);
            })
            ->where('fecha', $fecha)
            ->get();

        return response()->json($asistencias);
    }
}
