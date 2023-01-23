<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipient extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
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
        'birth_certificate',
        'kartu_keluarga',
        'note',
        'is_active',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function parents()
    {
        return $this->belongsToMany(ParentModel::class, 'recipients_parents', 'recipient_id', 'parent_id')->withPivot(['relationship_id']);
    }

    public function disabilities()
    {
        return $this->belongsToMany(Disability::class, 'disabilities_recipients', 'recipient_id', 'disability_id');
    }

    public function needs()
    {
        return $this->belongsToMany(NeedCategory::class, 'needs', 'recipient_id',
            'need_category_id')->withPivot(['id', 'amount', 'due_date', 'delivered_date', 'delivered_photo', 'delivered_message']);
    }

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }
}
