<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubmitAssigmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('submit_assigment', function (Blueprint $table) {
            //$table->id();
            $table->integer('id_assignment')->unsigned();
            $table->foreign('id_assignment')->references('id_assignment')->on('assignments');
            $table->integer('id')->unsigned();
            $table->foreign('id')->references('id')->on('users');
            $table->boolean('submit')->default(false);
            $table->string('link_file');
            $table->dateTime('last_modified');
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
        Schema::dropIfExists('submit_assigment');
    }
}
