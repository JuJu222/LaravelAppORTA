<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_alias',
        'ktp',
        'phone',
        'email',
        'address',
        'city',
        'note',
        'photo',
    ];
}
