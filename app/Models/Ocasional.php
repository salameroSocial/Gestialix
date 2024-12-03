<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ocasional extends Model
{
    use HasFactory;

    protected $fillable = [
        'estudiante_id',
        'clase_id',
        'fecha',
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'estudiante_id');
    }

    public function clase()
    {
        return $this->belongsTo(Clase::class);
    }
}
