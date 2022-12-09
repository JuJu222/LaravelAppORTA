<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentModel extends Model
{
    use HasFactory;

    protected $table = 'parents';
    protected $fillable = [
        'name',
        'nik',
        'birthplace',
        'birthdate',
        'occupation',
        'address',
        'phone',
        'ktp_image',
    ];
}
