<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OccasionalStudent extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'class_id',
        'date',
    ];

    // Relación con el modelo de estudiantes
    public function student()
    {
        return $this->belongsTo(Estudiante::class);
    }

    // Relación con el modelo de clases
    public function class()
    {
        return $this->belongsTo(Clase::class); // Ajusta el nombre del modelo de clases si es diferente
    }

    
}
