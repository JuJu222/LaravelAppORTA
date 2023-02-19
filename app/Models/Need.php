<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Need extends Model
{
    use HasFactory;
    protected $fillable = [
        'need_category_id',
        'recipient_id',
        'amount',
        'due_date',
        'delivered_date',
        'delivered_photo',
        'delivered_message',
    ];

    public function needCategory() {
        return $this->belongsTo(NeedCategory::class, 'need_category_id');
    }

    public function recipient() {
        return $this->belongsTo(Recipient::class, 'recipient_id');
    }

    public function donations() {
        return $this->hasMany(Donation::class, 'need_id');
    }

    public function status()
    {
        return $this->belongsToMany(Status::class, 'need_logs', 'need_id', 'status_id')->withPivot(['status_date']);
    }
}
