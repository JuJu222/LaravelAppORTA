<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\Donor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Donation::query()->with(['donor', 'need.needCategory', 'need.recipient'])->get();

        return Inertia::render('Donations/Donations', compact('donations'));
    }

    public function accept($id)
    {
        $donation = Donation::query()->find($id);

        if (!$donation->accepted_date) {
            $donation->update([
                'accepted_date' => Carbon::now(),
                'accepted_by_admin_id' => Auth::id()
            ]);
        }

        return Redirect::back();
    }

    public function reject($id)
    {
        $donation = Donation::query()->find($id);

        if ($donation->accepted_date) {
            $donation->update([
                'accepted_date' => null,
                'accepted_by_admin_id' => null
            ]);
        }

        return Redirect::back();
    }
}
