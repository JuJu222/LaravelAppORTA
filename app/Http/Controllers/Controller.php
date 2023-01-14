<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Donation;
use App\Models\Donor;
use App\Models\Recipient;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    function home() {
        $recipients = Recipient::query()->with(['parents', 'disabilities'])->get();

        if (Auth::user()->role_id === 1) {
            $admin = Admin::query()->where('user_id', Auth::id())->first();
            return Inertia::render('Home', compact('recipients', 'admin'));
        } else if (Auth::user()->role_id === 2) {
            $donor = Donor::query()->where('user_id', Auth::id())->first();
            return Inertia::render('Home', compact('recipients', 'donor'));
        } else {
            $recipient = Recipient::query()->where('user_id', Auth::id())->first();
            return Inertia::render('Home', compact('recipients', 'recipient'));
        }
    }

    function donations() {
        $donations = Donation::query()->whereHas('need', function ($query) {
            return $query->where('donor_id', '=', Auth::user()->donor->id);
        })->with(['donor', 'need.needCategory', 'need.recipient'])->get();

        return Inertia::render('Donations', compact('donations'));
    }

    function profile() {
        if (Auth::user()->role_id === 1) {
            $admin = Admin::query()->where('user_id', Auth::id())->first();
            return Inertia::render('Profile', compact('admin'));
        } else if (Auth::user()->role_id === 2) {
            $donor = Donor::query()->where('user_id', Auth::id())->first();
            return Inertia::render('Profile', compact('donor'));
        } else {
            $recipient = Recipient::query()->where('user_id', Auth::id())->first();
            return Inertia::render('Profile', compact('recipient'));
        }
    }
}
