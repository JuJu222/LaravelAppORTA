<?php

namespace App\Http\Controllers;

use App\Models\Donor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function index()
    {
        $donors = Donor::query()->get();

        return Inertia::render('Donors/Donors', compact('donors'));
    }
}
