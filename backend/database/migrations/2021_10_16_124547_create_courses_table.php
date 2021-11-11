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
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('cover');
            $table->string('title');
            $table->string('introduction');
            $table->integer('minimum')->nullable();
            $table->integer('maximum')->nullable();
            $table->string('class_link')->nullable();
            $table->boolean('public');
            $table->timestamp('deadline');
            $table->timestamp('accessed_at')->nullable();
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
