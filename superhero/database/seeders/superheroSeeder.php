<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\superhero;

class superheroSeeder extends Seeder
{

    public function run()
    {
        $faker = \Faker\Factory::create();
        for ($i = 0; $i < 10; $i++) {
            superhero::create([
                'heroname' => $faker->name,
                'realname' => $faker->name,
                'sexe' => $faker->sexe,
                'planet' => $faker->planet,
                'description' => $faker->description,
                'superpowers' => $faker->superpowers,
                'protectedcountry' => $faker->protectedcountry,
                'gadjets' => $faker->gadjets,
                'team' => $faker->team,
                'car' => $faker->car
            ]);
        }
    }
}