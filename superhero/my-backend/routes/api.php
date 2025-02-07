<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\superheroController;

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