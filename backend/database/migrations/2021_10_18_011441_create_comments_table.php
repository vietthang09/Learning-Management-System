<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            //$table->id();
            $table->increments('id_cmt');
            $table->integer('id_post')->unsigned();
            $table->foreign('id_post')->references('id_post')->on('posts');
            $table->text('body');
            $table->string('image_link')->nullable();
            $table->string('file_link')->nullable();
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
        Schema::dropIfExists('comments');
    }
}
