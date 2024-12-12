<?php

use App\Http\Middleware\CheckRole;

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
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
// ------------------------------------------------------
// Authentication Routes (Breeze)
// ------------------------------------------------------
require __DIR__ . '/auth.php';

// ------------------------------------------------------
// Public Routes
// ------------------------------------------------------
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
    ]);
});

Route::get('/terms', function () {
    return Inertia::render('Terminos/Terms');
})->name('terms');

Route::get('/no-autorizado', function () {
    return view('errors.custom-403');
})->name('no-autorizado');

Route::middleware(['auth'])->group(function () {
    Route::group(['middleware' => function ($request, $next) {
        $user = Auth::user();

        if (!$user) {
            return redirect('/login');
        }

        $hasRole = DB::table('model_has_roles')
            ->join('roles', 'roles.id', '=', 'model_has_roles.role_id')
            ->where('model_has_roles.model_id', $user->id)
            ->where('roles.name', 'approved_user')
            ->exists();

        if (!$hasRole) {
            return redirect('/no-autorizado');
        }

        return $next($request);
    }], function () {

        Route::get('/pedos', function () {
            return '+k2';
        });


        // Route::middleware(['auth', 'role:admin'])->group(function () {

        // });

        // ------------------------------------------------------
        // Protected Routes
        // ------------------------------------------------------
        Route::middleware(['auth', 'verified'])->group(function () {
            // --------------------------------------------------
            // Dashboard Routes
            // --------------------------------------------------
            Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

            // --------------------------------------------------
            // Profile Routes
            // --------------------------------------------------
            //     Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
            //     Route::resource('users', UserController::class);
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
            // Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
            // });

            // --------------------------------------------------
            // User Routes
            // --------------------------------------------------
            Route::get('/user-profile', function (Request $request) {
                return $request->user();
            })->name('user-profile');
            Route::put('/user-profile', function (Request $request) {
                return $request->user();
            });

            // --------------------------------------------------
            // API Routes
            // --------------------------------------------------
            Route::prefix('api')->group(function () {
                // User API
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

                // Attendance API
                Route::get('/attendance', [AsistenciaController::class, 'obtenerAsistenciaFiltrada']);
                Route::post('/attendance', [AsistenciaController::class, 'store']);
                Route::get('/attendance/{id}', [AsistenciaController::class, 'show']);
                Route::patch('/attendance/{id}', [AsistenciaController::class, 'update']);
                Route::delete('/attendance/{id}', [AsistenciaController::class, 'destroy']);
                Route::get('/attendance-or-create', [AsistenciaController::class, 'getOrCreateAttendance']);

                // Ocasionales API
                Route::get('/ocasionales', [OcasionalesController::class, 'index']);
                Route::post('/ocasionales', [OcasionalesController::class, 'assignOccasional']);
                Route::get('/ocasionales/{id}', [OcasionalesController::class, 'show']);
                Route::post('/ocasionales/get', [OcasionalesController::class, 'getByDate'])->name('ocasionales.getByDate');
                Route::delete('/ocasionales/{id}', [OcasionalesController::class, 'unassignOccasional']);

                // Student API
                Route::get('/students', [EstudianteController::class, 'index']);
                Route::post('/students', [EstudianteController::class, 'store']);
                Route::put('/students/{id}', [EstudianteController::class, 'update']);
                Route::patch('/students/{student}/toggle-assignment', [EstudianteController::class, 'toggleAssignment']);
                Route::post('/students/filtrar', [EstudianteController::class, 'filtrar']);

                // Class API
                Route::get('/classes', [ClaseController::class, 'index'])->name('clases.index');
                Route::post('/classes/new', [ClaseController::class, 'store']);
                Route::get('/classes/{id}', [ClaseController::class, 'show'])->name('clases.show');
                Route::put('/classes/{id}', [ClaseController::class, 'update']);
                Route::delete('/classes/{id}', [ClaseController::class, 'destroy'])->name('clases.destroy');
                Route::post('/classes/{class}/students', [EstudianteController::class, 'store']);
                Route::delete('/classes/{class}/students/{student}', [EstudianteController::class, 'destroy']);

                // Stats API
                Route::get('/stats/asistencias', [StatsController::class, 'getAttendanceData']);
                Route::get('/stats/altasEstudiantes', [StatsController::class, 'getStudentsSummary']);
                Route::post('/stats/altasEstudiantes', [StatsController::class, 'altasEstudiantes']);

                // Miscellaneous API
                Route::get('/data', [crud::class, 'index']);
            });




            // --------------------------------------------------
            // Inertia Render Routes
            // --------------------------------------------------
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
    });
});


Route::get('/admin/{any}', function () {
    require_once base_path('admin-ui/routes/web.php');
});

// Route::any('/admin/{any}', function () {
//     return abort(404); // Para que Laravel no interfiera
// })->where('any', '.*');



// ------------------------------------------------------
// Admin Routes (Commented for now)
// ------------------------------------------------------
// Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
//     Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
//     Route::resource('users', UserController::class);
// });
