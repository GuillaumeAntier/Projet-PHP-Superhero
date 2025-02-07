<?php

namespace App\Http\Controllers;

use App\Models\Superhero;
use App\Models\Gadget;
use Illuminate\Http\Request;

class SuperheroGadgetController extends Controller
{
    public function store(Superhero $superhero, Request $request)
    {
        $validated = $request->validate([
            'gadget_id' => 'required|exists:gadgets,id',
        ]);

        $superhero->gadgets()->attach($validated['gadget_id']);

        return response()->json($superhero->gadgets, 201);
    }

    public function destroy(Superhero $superhero, Gadget $gadget)
    {
        $superhero->gadgets()->detach($gadget->id);

        return response()->json(null, 204);
    }
}

