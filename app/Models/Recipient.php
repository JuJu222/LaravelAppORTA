<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'nik',
        'gender',
        'birthplace',
        'birthdate',
        'school',
        'class',
        'siblings',
        'child_no',
        'address',
        'city',
        'phone',
        'parent_id',
        'birth_certificate',
        'kartu_keluarga',
        'note',
        'is_active',
    ];


    public function parents()
    {
        return $this->belongsToMany(ParentModel::class, 'recipients_parents', 'recipient_id', 'parent_id')->withPivot(['relationship_id']);
    }
}
