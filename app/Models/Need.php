<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Need extends Model
{
    use HasFactory;

    public function needCategory() {
        return $this->belongsTo(NeedCategory::class, 'need_category_id');
    }

    public function recipient() {
        return $this->belongsTo(Recipient::class, 'recipient_id');
    }
}
