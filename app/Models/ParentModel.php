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

    public function disabilities()
    {
        return $this->belongsToMany(Disability::class, 'disabilities_parents', 'parent_id', 'disability_id');
    }

    public function recipients()
    {
        return $this->belongsToMany(Recipient::class, 'recipients_parents', 'parent_id', 'recipient_id')->withPivot(['relationship_id']);
    }
}
