<?php

namespace App\Http\Controllers;

use App\Models\Superpower;
use Illuminate\Http\Request;

class SuperpowerController extends Controller
{
    public function index()
    {
        return Superpower::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:superpowers',
            'description' => 'required|string',
        ]);

        $superpower = Superpower::create($validated);

        return response()->json($superpower, 201);
    }

    public function show(Superpower $superpower)
    {
        return response()->json($superpower);
    }

    public function update(Request $request, Superpower $superpower)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|unique:superpowers,name,' . $superpower->id,
            'description' => 'sometimes|string',
        ]);

        $superpower->update($validated);

        return response()->json($superpower);
    }

    public function destroy(Superpower $superpower)
    {
        $superpower->delete();

        return response()->json(null, 204);
    }
}
