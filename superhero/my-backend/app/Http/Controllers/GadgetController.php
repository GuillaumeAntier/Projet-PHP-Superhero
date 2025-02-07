<?php

namespace App\Http\Controllers;

use App\Models\Gadget;
use Illuminate\Http\Request;

class GadgetController extends Controller
{
    public function index()
    {
        return Gadget::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:gadgets',
            'description' => 'required|string',
        ]);

        $gadget = Gadget::create($validated);

        return response()->json($gadget, 201);
    }

    public function show(Gadget $gadget)
    {
        return response()->json($gadget);
    }

    public function update(Request $request, Gadget $gadget)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|unique:gadgets,name,' . $gadget->id,
            'description' => 'sometimes|string',
        ]);

        $gadget->update($validated);

        return response()->json($gadget);
    }

    public function destroy(Gadget $gadget)
    {
        $gadget->delete();

        return response()->json(null, 204);
    }
}
