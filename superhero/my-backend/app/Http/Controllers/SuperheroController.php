<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\superhero;
use Illuminate\Support\Facades\Auth;

class superheroController extends Controller
{
    public function index()
    {
        $superheroes = Auth::user()->superheroes;
        return response()->json($superheroes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'heroname' => 'required|string|max:255',
            'realname' => 'nullable|string|max:255',
            'sexe' => 'nullable|string',
            'planet' => 'nullable|string',
            'description' => 'nullable|string',
            'superpowers' => 'nullable|string',
            'protectedcountry' => 'nullable|string',
            'gadjets' => 'nullable|string',
            'team' => 'nullable|string',
            'car' => 'nullable|string',
        ]);

        $superhero = Auth::user()->superheroes()->create($request->all());
        return response()->json($superhero, 201);
    }

    public function show($id)
    {
        $superhero = Auth::user()->superheroes()->findOrFail($id);
        return response()->json($superhero);
    }

    public function update(Request $request, $id)
    {
        $superhero = Auth::user()->superheroes()->findOrFail($id);
        $superhero->update($request->all());
        return response()->json($superhero);
    }

    public function destroy($id)
    {
        $superhero = Auth::user()->superheroes()->findOrFail($id);
        $superhero->delete();
        return response()->json(['message' => 'Superhero deleted']);
    }
}