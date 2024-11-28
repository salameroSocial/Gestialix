<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClasesTable extends Migration
{
    public function up()
    {
        Schema::create('clases', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->default("Noname");

            // Obtener el año actual y el siguiente año para establecer el curso académico
            $currentYear = date('Y');
            $nextYear = $currentYear + 1;
            $academicYear = "{$currentYear}-{$nextYear}";

            $table->string('curso_academico')->default($academicYear); // Valor predeterminado dinámico
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('clases');
    }
}
