<?php

namespace App\Http\Controllers;

use App\Models\Superhero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SuperheroController extends Controller
{
    public function index()
    {
        $superheroes = Auth::user()->superheroes()->with(['superpowers', 'gadgets'])->get();
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
            'user_id' => auth()->id(),
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
        $superhero->update($request->all());
        return response()->json($superhero);
    }

    public function destroy(Superhero $superhero)
    {
        $superhero->delete();
        return response()->json(null, 204);
    }
}
