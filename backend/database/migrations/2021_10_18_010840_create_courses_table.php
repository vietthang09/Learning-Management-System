<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            //$table->id();
            $table->increments('id_course');
            $table->integer('id')->unsigned();
            $table->foreign('id')->references('id')->on('users');
            $table->string('name', 50);
            $table->text('intro')->nullable();
            $table->tinyInteger('maximum');
            $table->dateTime('registration_deadline');
            $table->dateTime('begin');
            $table->dateTime('end');
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
        Schema::dropIfExists('courses');
    }
}
