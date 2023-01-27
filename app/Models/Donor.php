<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'name_alias',
        'ktp',
        'phone',
        'email',
        'address',
        'city',
        'note',
        'photo',
        'verified',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function donations()
    {
        return $this->belongsToMany(Need::class, 'donations', 'donor_id', 'need_id')
            ->withPivot(['id', 'amount', 'bank_account', 'transfer_date', 'transfer_receipt', 'accepted_date', 'acccepted_by_admin_id']);
    }
}
