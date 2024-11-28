<?php

// database/migrations/xxxx_xx_xx_create_informes_mensuales_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInformesMensualesTable extends Migration
{
    public function up()
    {
        Schema::create('informes_mensuales', function (Blueprint $table) {
            $table->id();
            $table->integer('mes');
            $table->integer('anio');
            $table->integer('total_menus');
            $table->integer('total_estudiantes');
            $table->timestamp('fecha_generacion')->useCurrent();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('informes_mensuales');
    }
}
