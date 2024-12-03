<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOcassionalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ocasionals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('estudiante_id')->nullable(); // Relación con la tabla de estudiantes
            $table->unsignedBigInteger('clase_id')->nullable();  // Relación con la clase
            $table->date('fecha')->nullable();                    // Fecha en la que fue ocasional
            $table->timestamps();

            // Claves foráneas
            $table->foreign('estudiante_id')->references('id')->on('estudiantes')->onDelete('cascade');
            $table->foreign('clase_id')->references('id')->on('clases')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ocasionals');
    }
}
