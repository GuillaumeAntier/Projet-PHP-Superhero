<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SuperheroController;
use App\Http\Controllers\GadgetController;
use App\Http\Controllers\SuperpowerController;
use App\Http\Controllers\SuperheroGadgetController;
use App\Http\Controllers\SuperheroSuperpowerController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PlanetController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\VehicleController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('books', [BookController::class, 'index']);
Route::get('books/{id}', [BookController::class, 'show']);
Route::post('books', [BookController::class, 'store']);
Route::put('books/{id}', [BookController::class, 'update']);
Route::delete('books/{id}', [BookController::class, 'destroy']);

Route::get('superhero', [superheroController::class, 'index']);
Route::get('superhero/{id}', [superheroController::class, 'show']);
Route::post('superhero', [superheroController::class, 'store']);
Route::put('superhero/{id}', [superheroController::class, 'update']);
Route::delete('superhero/{id}', [superheroController::class, 'destroy']);

Route::apiResource('users', UserController::class);

Route::apiResource('superheroes', SuperheroController::class);

Route::apiResource('gadgets', GadgetController::class);

Route::apiResource('superpowers', SuperpowerController::class);

Route::apiResource('superhero_gadget', SuperheroGadgetController::class);

Route::apiResource('superhero_superpower', SuperheroSuperpowerController::class);

Route::apiResource('teams', TeamController::class);

Route::apiResource('planets', PlanetController::class);

Route::apiResource('cities', CityController::class);

Route::apiResource('vehicles', VehicleController::class);