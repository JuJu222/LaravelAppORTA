<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'photo_url',
        'photo_type_id',
        'recipient_id',
    ];

    public function type()
    {
        return $this->belongsTo(PhotoType::class, 'photo_type_id');
    }
}
