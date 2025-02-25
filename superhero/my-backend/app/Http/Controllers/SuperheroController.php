<?php

namespace App\Http\Controllers;

use App\Models\Superhero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\SuperheroSuperpower;
use App\Models\SuperheroGadget;

class SuperheroController extends Controller
{
    public function index(Request $request)
    {
        $superheroes = Auth::user()->superheroes()->with(['superpowers', 'gadgets', 'planet', 'team', 'city', 'user'])->get();

        if ($request->filled('groupBy')) {
            $groupBy = $request->groupBy;

            if ($groupBy === 'planète') {
                $superheroes = $superheroes->groupBy(fn($hero) => $hero->planet?->name ?? 'Inconnu');
            } elseif ($groupBy === 'pouvoir') {
                $superheroes = $superheroes->groupBy(fn($hero) => $hero->superpowers->pluck('name')->implode(', ') ?: 'Aucun pouvoir');
            } elseif ($groupBy === 'équipe') {
                $superheroes = $superheroes->groupBy(fn($hero) => $hero->team?->name ?? 'Sans équipe');
            } elseif ($groupBy === 'ville') {
                $superheroes = $superheroes->groupBy(fn($hero) => $hero->city?->name ?? 'Ville inconnue');
            } elseif ($groupBy === 'sexe') {
                $superheroes = $superheroes->groupBy('gender');
            } elseif ($groupBy === 'utilisateur') {
                $superheroes = Superhero::with(['superpowers', 'gadgets', 'planet', 'team', 'city', 'user'])->get()->groupBy(fn($hero) => $hero->user?->firstname . ' ' . $hero->user?->lastname ?? 'Inconnu');
            }
        }

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
            'team_id' => 'nullable|exists:teams,id',
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'superpowers' => 'nullable|array',
            'superpowers.*' => 'exists:superpowers,id',
            'gadgets' => 'nullable|array',
            'gadgets.*' => 'exists:gadgets,id',
            'photo' => 'sometimes|image|max:2048',
        ]);

        $superheroData = [
            'real_name' => $validated['real_name'],
            'hero_name' => $validated['hero_name'],
            'gender' => $validated['gender'],
            'description' => $validated['description'],
            'planet_id' => $validated['planet_id'],
            'city_id' => $validated['city_id'],
            'team_id' => $validated['team_id'],
            'vehicle_id' => $validated['vehicle_id'],
            'user_id' => auth()->id(),
        ];

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('superHeroImages', 'public');
            $superheroData['photo'] = $path;
        }

        $superhero = Superhero::create($superheroData);

        if (isset($validated['superpowers']) && !empty($validated['superpowers'])) {
            $superhero->superpowers()->sync($validated['superpowers']); 
        }
        
        if (isset($validated['gadgets']) && !empty($validated['gadgets'])) {
            $superhero->gadgets()->sync($validated['gadgets']); 
        }

        return response()->json($superhero, 201);
    }

    public function show(Superhero $superhero)
    {   
        $superhero->load(['superpowers', 'gadgets', 'planet', 'team', 'city', 'user']);
        return response()->json($superhero);
    }

    public function update(Request $request, Superhero $superhero)
    {
        $validated = $request->validate([
            'real_name' => 'sometimes|required|string',
            'hero_name' => 'sometimes|required|string|unique:superheroes,hero_name,' . $superhero->id,
            'gender' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'planet_id' => 'sometimes|required|exists:planets,id',
            'city_id' => 'sometimes|required|exists:cities,id',
            'team_id' => 'sometimes|nullable|exists:teams,id',
            'vehicle_id' => 'sometimes|nullable|exists:vehicles,id',
            'superpowers' => 'sometimes|nullable|array',
            'superpowers.*' => 'exists:superpowers,id',
            'gadgets' => 'sometimes|nullable|array',
            'gadgets.*' => 'exists:gadgets,id',
            'photo' => 'sometimes|image|max:2048',
        ]);

        $superheroData = $request->except('photo');

        if ($request->hasFile('photo')) {

            if ($superhero->photo) {
                Storage::disk('public')->delete($superhero->photo);
            }
            $path = $request->file('photo')->store('superHeroImages', 'public');
            $superheroData['photo'] = $path;
        }

        $superhero->update($superheroData);

        if (isset($validated['superpowers']) && !empty($validated['superpowers'])) {
            $superhero->superpowers()->sync($validated['superpowers']);
        }

        if (isset($validated['gadgets']) && !empty($validated['gadgets'])) {
            $superhero->gadgets()->sync($validated['gadgets']);
        }

        return response()->json($superhero);
    }

    public function destroy(Superhero $superhero)
    {
        if ($superhero->photo) {
            Storage::disk('public')->delete($superhero->photo);
        }

        $superhero->delete();
        return response()->json(null, 204);
    }

    public function getSuperpowers($id)
    {
        $superhero = Superhero::find($id);
        return response()->json($superhero->superpowers);
    }

    public function getGadgets($id)
    {
        $superhero = Superhero::find($id);
        return response()->json($superhero->gadgets);
    }

    public function deleteSuperhero($id)
    {
        SuperheroSuperpower::where('superhero_id', $id)->delete();
        SuperheroGadget::where('superhero_id', $id)->delete();

        $superhero = Superhero::findOrFail($id);
        if ($superhero->photo) {
            Storage::disk('public')->delete($superhero->photo);
        }

        $superhero->delete();

        return response()->json(['message' => 'Superhero deleted']);
    }
}