<?php

// app/Models/MenuServicio.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuServicio extends Model
{
    use HasFactory;

    protected $fillable = ['asistencia_id', 'menu_id'];

    public function asistencia()
    {
        return $this->belongsTo(Asistencia::class);
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
