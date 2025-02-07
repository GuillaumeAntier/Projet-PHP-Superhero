<?php

namespace App\Http\Controllers;

use App\Models\Superhero;
use App\Models\Superpower;
use Illuminate\Http\Request;

class SuperheroSuperpowerController extends Controller
{
    public function store(Superhero $superhero, Request $request)
    {
        $validated = $request->validate([
            'superpower_id' => 'required|exists:superpowers,id',
        ]);

        $superhero->superpowers()->attach($validated['superpower_id']);

        return response()->json($superhero->superpowers, 201);
    }

    public function destroy(Superhero $superhero, Superpower $superpower)
    {
        $superhero->superpowers()->detach($superpower->id);

        return response()->json(null, 204);
    }
}
