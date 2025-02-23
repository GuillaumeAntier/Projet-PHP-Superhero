<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\SuperheroController;
use App\Http\Controllers\Auth\AuthController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('superhero', [SuperheroController::class, 'index']);
    Route::get('superhero/{id}', [SuperheroController::class, 'show']);
    Route::post('superhero', [SuperheroController::class, 'store']);
    Route::put('superhero/{id}', [SuperheroController::class, 'update']);
    Route::delete('superhero/{id}', [SuperheroController::class, 'destroy']);

    Route::get('books', [BookController::class, 'index']);
    Route::get('books/{id}', [BookController::class, 'show']);
    Route::post('books', [BookController::class, 'store']);
    Route::put('books/{id}', [BookController::class, 'update']);
    Route::delete('books/{id}', [BookController::class, 'destroy']);
});