<?php

namespace App\Http\Controllers;

use App\Models\Ocasional;
use Illuminate\Http\Request;

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
}
