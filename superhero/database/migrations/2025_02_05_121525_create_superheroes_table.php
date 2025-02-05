<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('superhero', function (Blueprint $table) {
            $table->id();
            $table->string('heroname');
            $table->string('realname');
            $table->string('sexe');
            $table->string('planet');
            $table->string('description');
            $table->string('superpowers');
            $table->string('protectedcountry');
            $table->string('gadjets');
            $table->string('team');
            $table->string('car');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('superhero');
    }
};
