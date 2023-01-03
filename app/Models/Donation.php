<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'donor_id',
        'need_id',
        'amount',
        'bank_account',
        'transfer_date',
        'transfer_receipt',
        'accepted_date',
        'accepted_by_admin_id',
    ];

    public function donor() {
        return $this->belongsTo(Donor::class, 'donor_id');
    }

    public function need() {
        return $this->belongsTo(Need::class, 'need_id');
    }
}
