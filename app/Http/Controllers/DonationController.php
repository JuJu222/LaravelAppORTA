<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\Donor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Donation::query()->with(['donor', 'need.needCategory', 'need.recipient'])->get();
        return $donations;
        return Inertia::render('Donations/Donations', compact('donations'));
    }
}
