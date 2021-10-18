<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assignments', function (Blueprint $table) {
            //$table->id();
            $table->increments('id_assignment');
            $table->integer('id_course')->unsigned();
            $table->foreign('id_course')->references('id_course')->on('courses');
            $table->string('name', 40);
            $table->dateTime('deadline');
            $table->float('mark',5,2);
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
        Schema::dropIfExists('assignments');
    }
}
