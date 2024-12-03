<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstudiantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->nullable();
            $table->string('apellidos')->nullable();
            $table->foreignId('clase_id')->nullable()->constrained('clases')->onDelete('cascade');
            $table->boolean('pago')->default(false)->nullable();
            $table->json('intolerancia_religion')->nullable();
            $table->boolean('beca')->default(false)->nullable();
            $table->boolean('asignado_comedor')->default(false)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('estudiantes');
    }
}
