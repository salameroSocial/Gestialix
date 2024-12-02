<?php

namespace App\Http\Controllers;

use App\Models\OccasionalStudent;
use Illuminate\Http\Request;

class OcasionalesController extends Controller
{

    public function storeOccasionalStudent(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'class_id' => 'required|exists:classes,id',
            'date' => 'nullable|date',
        ]);

        $occasionalStudent = OccasionalStudent::create($validated);

        return response()->json([
            'message' => 'Estudiante ocasional agregado correctamente.',
            'data' => $occasionalStudent,
        ], 201);
    }
}
