<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOcasionalIdToAttendanceTable extends Migration
{
    public function up()
    {
        Schema::table('asistencias', function (Blueprint $table) {
            $table->unsignedBigInteger('ocasional_id')->nullable();

            // Clave foránea hacia la tabla 'ocasionals'
            $table->foreign('ocasional_id')->references('id')->on('ocasionals')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('asistencias', function (Blueprint $table) {
            $table->dropForeign(['ocasional_id']);
            $table->dropColumn('ocasional_id');
        });
    }
}
