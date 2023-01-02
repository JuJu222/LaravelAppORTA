<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    public function donor() {
        return $this->belongsTo(Donor::class, 'donor_id');
    }

    public function need() {
        return $this->belongsTo(Need::class, 'need_id');
    }
}
