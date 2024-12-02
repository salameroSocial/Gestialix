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
        Schema::create('occasional_students', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id'); // Relación con la tabla de estudiantes
            $table->unsignedBigInteger('class_id');  // Relación con la clase
            $table->date('date')->nullable();        // Fecha en la que fue ocasional
            $table->timestamps();

            // Claves foráneas
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->foreign('class_id')->references('id')->on('classes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('occasional_students');
    }
}
