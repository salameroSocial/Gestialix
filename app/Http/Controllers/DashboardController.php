<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //Hacer un crud que devuelva vistas de react 
    public function index()
    {
        $user = auth()->user();

        return Inertia::render('Dashboard/Index')->with([
            'user' => $user,
        ]);
    }
}
