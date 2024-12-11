<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use App\Models\Estudiante;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public function getAttendanceSummary()
    {
        // Obtenemos las estadísticas de los últimos 7 días
        $summary = DB::table('asistencias')
            ->select(
                DB::raw('DATE(fecha) as fecha'),
                DB::raw('SUM(asiste = 1) as presentes'),
                DB::raw('SUM(asiste = 0) as ausentes'),
                DB::raw('SUM(asiste IS NULL) as desconocidos')
            )
            ->groupBy('fecha')
            ->orderBy('fecha', 'desc')
            ->limit(7) // Últimos 7 días
            ->get();

        return response()->json($summary);
    }



    public function getAttendanceData(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $classId = $request->input('clase_id');

        $query = DB::table('asistencias')
            ->selectRaw("
            DATE_FORMAT(fecha, '%Y-%m-%d') as period,
            SUM(CASE WHEN asiste = 1 THEN 1 ELSE 0 END) as presentes,
            SUM(CASE WHEN asiste = 0 THEN 1 ELSE 0 END) as ausentes,
            SUM(CASE WHEN asiste IS NULL THEN 1 ELSE 0 END) as desconocidos
        ")
            ->groupBy('period')
            ->orderBy('period');

        // Aplica filtros si están presentes
        if ($startDate && $endDate) {
            $query->whereBetween('fecha', [$startDate, $endDate]);
        }

        if ($classId) {
            $query->where('clase_id', $classId);
        }

        return response()->json($query->get());
    }

    public function getStudentsSummary()
    {
        $registrations = Estudiante::selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return response()->json($registrations);
    }

    public function filtrar(Request $request)
    {
        $query = Estudiante::query();

        if ($request->filled('fecha_inicio') && $request->filled('fecha_fin')) {
            $query->whereBetween('created_at', [$request->fecha_inicio, $request->fecha_fin]);
        }

        if ($request->filled('atributo') && $request->filled('valor')) {
            $query->where($request->atributo, $request->valor);
        }

        $estudiantes = $query->get();

        return response()->json($estudiantes);
    }

    public function asistencias(Request $request)
    {
        $query = Asistencia::query();

        // Verifica si hay filtros de fechas
        if ($request->filled('fecha_inicio') && $request->filled('fecha_fin')) {
            $query->whereBetween('fecha', [$request->input('fecha_inicio'), $request->input('fecha_fin')]);
        }

        // Obtén los datos de la base de datos
        $asistencias = $query->get();
        dd($asistencias);
        // Formatea los datos para enviarlos al frontend
        $result = $asistencias->map(function ($item) {
            return [
                'fecha' => $item->fecha,
                'presentes' => $item->presentes,
                'ausentes' => $item->ausentes,
                'desconocidos' => $item->desconocidos,
            ];
        });

        return response()->json($asistencias);
    }

    public function altasEstudiantes(Request $request)
    {
        $query = Estudiante::query();

        // Verifica si hay filtros de fechas
        if ($request->filled('fecha_inicio') && $request->filled('fecha_fin')) {
            $query->whereBetween('created_at', [$request->input('fecha_inicio'), $request->input('fecha_fin')]);
        }

        // Agrupa por fecha y cuenta el total de estudiantes registrados por día
        $altas = $query->selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->groupBy('date')
            ->get();

        return response()->json($altas);
    }
}
