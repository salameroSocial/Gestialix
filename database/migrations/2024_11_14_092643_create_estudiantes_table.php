<?php

// database/migrations/xxxx_xx_xx_create_estudiantes_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstudiantesTable extends Migration
{
    public function up()
    {
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellidos');
            $table->foreignId('clase_id')->constrained('clases')->onDelete('cascade');
            $table->boolean('pago')->default(false);
            // $table->string('intolerancia_religion')->nullable();
            $table->json('intolerancia_religion')->nullable()->change();
            $table->boolean('beca')->default(false);
            $table->boolean('asignado_comedor')->default(false);
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('estudiantes');
    }
}
