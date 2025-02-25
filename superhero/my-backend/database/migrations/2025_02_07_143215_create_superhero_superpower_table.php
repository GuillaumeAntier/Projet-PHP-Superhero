<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class CreateSuperheroSuperpowerTable extends Migration
{
    public function up()
    {
        Schema::create('superhero_superpower', function (Blueprint $table) {
            $table->foreignId('superhero_id')->constrained('superheroes')->onDelete('cascade');
            $table->foreignId('superpower_id')->constrained('superpowers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('superhero_superpower');
    }
}
