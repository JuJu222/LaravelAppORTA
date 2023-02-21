<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NeedLog extends Model
{
    use HasFactory;

    protected $table = 'need_logs';
    protected $fillable = [
        'need_id',
        'status_id',
        'status_date',
    ];
}
