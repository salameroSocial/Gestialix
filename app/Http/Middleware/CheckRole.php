<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckRole
{
    public function handle($request, Closure $next )
    {
        $user = Auth::user();

        if (!$user) {
            return redirect('/login');
        }

        $hasRole = DB::table('model_has_roles')
            ->join('roles', 'roles.id', '=', 'model_has_roles.role_id')
            ->where('model_has_roles.model_id', $user->id)
            ->where('roles.name', $role)
            ->exists();

        if (!$hasRole) {
            abort(403, 'No tienes permiso para acceder a estas rutas.');
        }

        return $next($request);
    }
}
