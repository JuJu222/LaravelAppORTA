<?php

namespace App\Http\Controllers;

use App\Models\Recipient;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    function donations() {
        $recipients = Recipient::query()->with(['parents', 'disabilities'])->get();

        return Inertia::render('Donations', compact('recipients'));
    }

    function profile() {
        return Inertia::render('Profile');
    }
}
