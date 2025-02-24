<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuperheroGadget extends Model
{
    use HasFactory;

    protected $fillable = [
        'superhero_id',
        'gadget_id',
    ];

    public function superhero()
    {
        return $this->belongsTo(Superhero::class);
    }

    public function gadget()
    {
        return $this->belongsTo(Gadget::class);
    }
}

