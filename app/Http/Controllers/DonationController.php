<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\Donor;
use App\Models\Recipient;
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

    public function show($id)
    {
        $donation = Donation::query()->with(['donor', 'need.needCategory', 'need.recipient', 'admin'])->find($id);

        return Inertia::render('Donations/DonationsShow', compact('donation'));
    }

    public function create()
    {
        return Inertia::render('Donations/DonationsCreate');
    }

    public function edit($id)
    {
        $donation = Donation::query()->with(['donor', 'need.needCategory', 'need.recipient'])->find($id);

        return Inertia::render('Donations/DonationsShow', compact('donation'));
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

    public function showVerification($id)
    {
        $donation = Donation::query()->with(['donor', 'need.needCategory', 'need.recipient'])->find($id);
        $recipient = Recipient::query()->with(['parents', 'disabilities', 'needs'])->find($donation->need->recipient->id);
        $need = $recipient->needs()->where('needs.id', $donation->need->id)->first();
        $need['collected'] = Donation::query()->where('need_id', $need->pivot->id)
            ->whereNotNull('accepted_date')->sum('amount');

        return Inertia::render('Donations/DonationsVerify', compact('donation', 'need'));
    }

    public function verify($id)
    {
        $donations = Donation::query()->with(['donor', 'need.needCategory', 'need.recipient'])->get();

        return Inertia::render('Donations/Donations', compact('donations'));
    }
}
