<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\superhero;

class superheroController extends Controller
{
    public function index()
    {
        $superhero = superhero::all();
        return response()->json($superhero);
    }

    public function store(Request $request)
    {
        $superhero = new superhero();
        $superhero->heroname = $request->heroname;
        $superhero->realname = $request->realname;
        $superhero->sexe = $request->sexe;
        $superhero->planet = $request->planet;
        $superhero->description = $request->description;
        $superhero->superpowers = $request->superpowers;
        $superhero->protectedcountry = $request->protectedcountry;
        $superhero->gadjets = $request->gadjets;
        $superhero->team = $request->team;
        $superhero->car = $request->car;
        return response()->json([
            'message' => 'Superhero created'
        ], 201);
    }

    public function show($id)
    {
        $superhero = superhero::find($id);
        if ($superhero) {
            return response()->json($superhero);
        } else {
            return response()->json([
                'message' => 'Superhero not found'
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $superhero = superhero::find($id);
        if ($superhero) {
            $superhero->heroname = $request->heroname;
            $superhero->realname = $request->realname;
            $superhero->sexe = $request->sexe;
            $superhero->planet = $request->planet;
            $superhero->description = $request->description;
            $superhero->superpowers = $request->superpowers;
            $superhero->protectedcountry = $request->protectedcountry;
            $superhero->gadjets = $request->gadjets;
            $superhero->team = $request->team;
            $superhero->car = $request->car;
            return response()->json([
                'message' => 'Superhero updated'
            ], 404);
        } else {
            return response()->json([
                'message' => 'Superhero not found'
            ], 404);
        }
    }

    public function destroy($id)
    {
        if (superhero::where('id', $id)->exists()) {
            $superhero = superhero::find($id);
            $superhero->delete();
            return response()->json([
                'message' => 'Superhero deleted'
            ], 404);
        } else {
            return response()->json([
                'message' => 'Superhero not found'
            ], 404);
        }
    }
}
