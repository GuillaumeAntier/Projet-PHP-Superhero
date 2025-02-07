<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class superhero extends Model
{
    use HasFactory;
    protected $table = 'superhero';
    protected $fillable = ['heroname', 'realname', 'sexe', 'planet', 'description', 'superpowers', 'protectedcountry','gadjets', 'team', 'car'];
<<<<<<< HEAD
}
=======
    
}
>>>>>>> godwin
