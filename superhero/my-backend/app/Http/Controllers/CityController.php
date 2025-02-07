<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        return City::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:cities',
        ]);

        $city = City::create($validated);

        return response()->json($city, 201);
    }

    public function show(City $city)
    {
        return response()->json($city);
    }

    public function update(Request $request, City $city)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|unique:cities,name,' . $city->id,
        ]);

        $city->update($validated);

        return response()->json($city);
    }

    public function destroy(City $city)
    {
        $city->delete();

        return response()->json(null, 204);
    }
}
