<?php

// app/Models/Clase.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clase extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'curso_academico'];

    public function estudiantes()
    {
        return $this->hasMany(Estudiante::class, 'clase_id');
    }
}
