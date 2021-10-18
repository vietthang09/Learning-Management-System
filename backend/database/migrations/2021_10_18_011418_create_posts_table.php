<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            //$table->id();
            $table->increments('id_post');
            $table->integer('id')->unsigned();
            $table->foreign('id')->references('id')->on('users');
            $table->text('content');
            $table->string('file_link')->nullable();
            $table->string('imgage_link')->nullable();
            $table->dateTime('date_create');
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
        Schema::dropIfExists('posts');
    }
}
