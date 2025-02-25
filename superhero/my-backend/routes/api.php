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
use App\Http\Controllers\Auth\AuthController;
use App\Models\Superhero;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);

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

    Route::get('/user', [AuthController::class, 'show']);
    Route::post('/user/update', [AuthController::class, 'update']);
    Route::delete('/user/delete', [AuthController::class, 'destroy']);


    Route::get('/superhero/{id}/superpowers', [SuperheroController::class, 'getSuperpowers']);
    Route::get('/superhero/{id}/gadgets', [SuperheroController::class, 'getGadgets']);

    Route::delete('/superheroes/{id}', [SuperheroController::class, 'deleteSuperhero']);

    Route::get('/superheroes', [SuperheroController::class, 'index']);

});