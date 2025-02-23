<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    public function superheroes()
    {
        return $this->hasMany(Superhero::class);
    }
}
