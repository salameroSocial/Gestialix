<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminUser extends Model
{
    use HasFactory;

    protected $table = 'admin_users'; // Nombre de la tabla

    protected $fillable = ['username', 'password', 'role'];

    // Ocultar el password al serializar
    protected $hidden = ['password'];
}
