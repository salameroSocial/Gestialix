<?php

// app/Models/Asistencia.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    use HasFactory;

    protected $fillable = ['estudiante_id', 'fecha', 'asiste', 'es_dia_suelto'];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class);
    }

    public function menuServicios()
    {
        return $this->hasMany(MenuServicio::class);
    }
}
