<?php
// app/Models/Estudiante.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'apellidos', 'clase_id', 'pago', 'intolerancia_religion', 'beca'];

    public function clase()
    {
        return $this->belongsTo(Clase::class, 'clase_id');
    }
    public function asistencias()
    {
        return $this->hasMany(Asistencia::class);
    }
    protected $casts = [
        'intolerancia_religion' => 'array', // Laravel convierte automáticamente JSON a array y viceversa
    ];
}
