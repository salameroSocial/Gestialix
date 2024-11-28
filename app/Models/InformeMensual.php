<?php
// app/Models/InformeMensual.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InformeMensual extends Model
{
    use HasFactory;

    protected $fillable = ['mes', 'anio', 'total_menus', 'total_estudiantes', 'fecha_generacion'];
}
