<?php

namespace App\Http\Controllers;

use App\Models\Superhero;
use Illuminate\Http\Request;

class SuperheroController extends Controller
{
    public function index()
    {
        $superheroes = Superhero::with(['superpowers', 'gadgets'])->get();
        return response()->json($superheroes);

    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'real_name' => 'required|string',
        'hero_name' => 'required|string|unique:superheroes,hero_name',
        'gender' => 'required|string',
        'description' => 'required|string',
        'planet_id' => 'required|exists:planets,id',
        'city_id' => 'required|exists:cities,id',
        'team_id' => 'required|exists:teams,id',
        'vehicle_id' => 'required|exists:vehicles,id',
        'user_id' => 'required|exists:users,id',
        'superpowers' => 'sometimes|array',
        'superpowers.*' => 'exists:superpowers,id',
        'gadgets' => 'sometimes|array',
        'gadgets.*' => 'exists:gadgets,id',
    ]);

    $superhero = Superhero::create([
        'real_name' => $validated['real_name'],
        'hero_name' => $validated['hero_name'],
        'gender' => $validated['gender'],
        'description' => $validated['description'],
        'planet_id' => $validated['planet_id'],
        'city_id' => $validated['city_id'],
        'team_id' => $validated['team_id'],
        'vehicle_id' => $validated['vehicle_id'],
        'user_id' => $validated['user_id'],
    ]);

    if (isset($validated['superpowers'])) {
        $superhero->superpowers()->attach($validated['superpowers']);
    }

    if (isset($validated['gadgets'])) {
        $superhero->gadgets()->attach($validated['gadgets']);
    }

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
}

