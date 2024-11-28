<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Estudiante;

class crud extends Controller
{
    public function index()
    {
        $estudiantes = Estudiante::all();
        //Contar estudiantes
        return response()->json($estudiantes, 201);
    }
}
