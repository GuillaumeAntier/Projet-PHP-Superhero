<?php

namespace App\Http\Controllers;

use App\Models\Superhero;
use Illuminate\Http\Request;

class SuperheroController extends Controller
{
    public function index()
    {
        return Superhero::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'real_name' => 'required|string',
            'hero_name' => 'required|string|unique:superheroes',
            'gender' => 'required|string',
            'description' => 'required|string',
            'planet_id' => 'required|exists:planets,id',
            'city_id' => 'required|exists:cities,id',
            'team_id' => 'required|exists:teams,id',
            'vehicle_id' => 'required|exists:vehicles,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $superhero = Superhero::create($validated);

        return response()->json($superhero, 201);
    }

    public function show(Superhero $superhero)
    {
        return response()->json($superhero);
    }

    public function update(Request $request, Superhero $superhero)
    {
        $validated = $request->validate([
            'real_name' => 'sometimes|string',
            'hero_name' => 'sometimes|string|unique:superheroes,hero_name,' . $superhero->id,
            'gender' => 'sometimes|string',
            'description' => 'sometimes|string',
            'planet_id' => 'sometimes|exists:planets,id',
            'city_id' => 'sometimes|exists:cities,id',
            'team_id' => 'sometimes|exists:teams,id',
            'vehicle_id' => 'sometimes|exists:vehicles,id',
            'user_id' => 'sometimes|exists:users,id',
        ]);

        $superhero->update($validated);

        return response()->json($superhero);
    }

    public function destroy(Superhero $superhero)
    {
        $superhero->delete();

        return response()->json(null, 204);
    }
}

