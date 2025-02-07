<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class CreateSuperheroGadgetTable extends Migration
{
    public function up()
    {
        Schema::create('superhero_gadget', function (Blueprint $table) {
            $table->foreignId('superhero_id')->constrained('superheroes')->onDelete('cascade');
            $table->foreignId('gadget_id')->constrained('gadgets')->onDelete('cascade');
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('superhero_gadget');
    }
}
