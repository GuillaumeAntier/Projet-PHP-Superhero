<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuperheroSuperpower extends Model
{
    use HasFactory;

    protected $fillable = [
        'superhero_id',
        'superpower_id',
    ];

    public function superhero()
    {
        return $this->belongsTo(Superhero::class);
    }

    public function superpower()
    {
        return $this->belongsTo(Superpower::class);
    }
}
