<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClaseController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\AsistenciaController;
use App\Http\Controllers\OcasionalesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\crud;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/terms', function () {
    return Inertia::render('Terminos/Terms');
})->name('terms');

// Authentication routes (handled by Breeze)
require __DIR__ . '/auth.php';

// Protected routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // User routes
    Route::get('/user-profile', function (Request $request) {
        return $request->user();
    })->name('user-profile');
    Route::put('/user-profile', function (Request $request) {
        return $request->user();
    });

    // API routes
    Route::prefix('api')->group(function () {
        Route::get('/user', function (Request $request) {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }
            return response()->json([
                'user' => $user->only(['id', 'name', 'email']),
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getPermissionNames(),
            ]);
        });

        // Attendance routes
        Route::get('/attendance', [AsistenciaController::class, 'obtenerAsistenciaFiltrada']);
        Route::get('/attendance/{id}', [AsistenciaController::class, 'show']);
        Route::post('/attendance', [AsistenciaController::class, 'store']);
        Route::delete('/attendance/{id}', [AsistenciaController::class, 'destroy']);
        Route::patch('/attendance/{id}', [AsistenciaController::class, 'update']);
        Route::get('/attendance-or-create', [AsistenciaController::class, 'getOrCreateAttendance']);




        Route::get('/attendance/ocasionales/{id}', [OcasionalesController::class, 'show']);



        // Student routes
        Route::get('/students', [EstudianteController::class, 'index']);
        Route::post('/students', [EstudianteController::class, 'store']);
        Route::put('/students/{id}', [EstudianteController::class, 'update']);
        Route::patch('/students/{student}/toggle-assignment', [EstudianteController::class, 'toggleAssignment']);
        Route::post('/students/filtrar', [EstudianteController::class, 'filtrar']);

        // Class routes
        Route::get('/classes', [ClaseController::class, 'index'])->name('clases.index');
        Route::post('/classes/new', [ClaseController::class, 'store']);
        Route::get('/classes/{id}', [ClaseController::class, 'show'])->name('clases.show');
        Route::put('/classes/{id}', [ClaseController::class, 'update']);
        Route::delete('/classes/{id}', [ClaseController::class, 'destroy'])->name('clases.destroy');
        Route::post('/classes/{class}/students', [EstudianteController::class, 'store']);
        Route::delete('/classes/{class}/students/{student}', [EstudianteController::class, 'destroy']);

        // Stats routes
        Route::get('/stats/asistencias', [StatsController::class, 'getAttendanceData']);
        Route::get('/stats/altasEstudiantes', [StatsController::class, 'getStudentsSummary']);
        Route::post('/stats/altasEstudiantes', [StatsController::class, 'altasEstudiantes']);

        // Other routes
        Route::get('/data', [crud::class, 'index']);
    });

    // Inertia render routes
    Route::get('/inicio', function () {
        return Inertia::render('Inicio');
    })->name('inicio');

    Route::get('/clases', function () {
        return Inertia::render('ClasesManagement/Clases');
    })->name('clases');

    Route::get('/asistencias', function () {
        return Inertia::render('AsistenciasManagement/AttendanceCrud');
    })->name('asistencias');

    Route::get('/index', function () {
        return Inertia::render('Index');
    })->name('index');

    Route::get('/settings', function () {
        return Inertia::render('Settings/Ajustes');
    })->name('settings');
});

// Admin routes (commented out for now)
// Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
//     Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
//     Route::resource('users', UserController::class);
// });