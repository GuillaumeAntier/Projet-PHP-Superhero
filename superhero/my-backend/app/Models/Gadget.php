<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gadget extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function superheroes()
    {
        return $this->belongsToMany(Superhero::class, 'superhero_gadget', 'gadget_id', 'superhero_id');
    }
}
