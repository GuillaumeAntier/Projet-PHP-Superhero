<?php

namespace App\Http\Controllers;

use App\Models\Planet;
use Illuminate\Http\Request;

class PlanetController extends Controller
{
    public function index()
    {
        return Planet::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:planets',
        ]);

        $planet = Planet::create($validated);

        return response()->json($planet, 201);
    }

    public function show(Planet $planet)
    {
        return response()->json($planet);
    }

    public function update(Request $request, Planet $planet)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|unique:planets,name,' . $planet->id,
        ]);

        $planet->update($validated);

        return response()->json($planet);
    }

    public function destroy(Planet $planet)
    {
        $planet->delete();

        return response()->json(null, 204);
    }
}

