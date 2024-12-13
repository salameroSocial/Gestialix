<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckApprovedUser
{
    public function handle($request, Closure $next)
    {
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
    }
}
