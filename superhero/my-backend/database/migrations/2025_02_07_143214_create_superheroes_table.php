<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class CreateSuperheroesTable extends Migration
{
    public function up()
    {
        Schema::create('superheroes', function (Blueprint $table) {
            $table->id();
            $table->string('real_name');
            $table->string('hero_name')->unique();
            $table->string('gender');
            $table->text('description');
            $table->foreignId('planet_id')->constrained('planets');
            $table->foreignId('city_id')->constrained('cities');
            $table->foreignId('team_id')->constrained('teams');
            $table->foreignId('vehicle_id')->constrained('vehicles');
            $table->foreignId('user_id')
            ->constrained()
            ->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('superheroes');
    }
}
