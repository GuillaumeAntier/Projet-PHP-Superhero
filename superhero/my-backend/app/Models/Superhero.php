<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Superhero extends Model
{
    use HasFactory;

    protected $fillable = [
        'real_name',
        'hero_name',
        'gender',
        'description',
        'planet_id',
        'city_id',
        'team_id',
        'vehicle_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
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

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function gadgets()
    {
        return $this->belongsToMany(Gadget::class, 'superhero_gadget');
    }

    public function superpowers()
    {
        return $this->belongsToMany(Superpower::class, 'superhero_superpower');
    }
}
