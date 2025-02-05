<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Books;

class BookSeeder extends Seeder
{
    
    public function run()
    {
        $faker = \Faker\Factory::create();
        for ($i = 0; $i < 50; $i++) {
            Books::create([
                'name' => $faker->name,
                'author' => $faker->name,
                'publish_date' => $faker->date,
            ]);
        }
    }
}
