<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class superhero extends Model
{
    use HasFactory;
    protected $table = 'superheroes';
    protected $fillable = [
        'hero_name', 
        'real_name', 
        'gender', 
        'planet_id', 
        'description', 
        'city_id', 
        'team_id', 
        'vehicle_id', 
        'user_id',
    ];
        public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function superpowers()
    {
        return $this->belongsToMany(Superpower::class, 'superhero_superpower', 'superhero_id', 'superpower_id');
    }

    public function gadgets()
    {
        return $this->belongsToMany(Gadget::class, 'superhero_gadget', 'superhero_id', 'gadget_id');
    }

    public function planet()
    {
        return $this->belongsTo(Planet::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }


    
}