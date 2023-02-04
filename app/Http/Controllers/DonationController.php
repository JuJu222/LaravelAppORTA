<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Donation;
use App\Models\Donor;
use App\Models\Need;
use App\Models\Recipient;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
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
        $donors = Donor::query()->get();
        $needs = Need::query()->with(['recipient', 'needCategory'])->get();
        $admins = Admin::query()->get();

        return Inertia::render('Donations/DonationsCreate', compact('donors', 'needs', 'admins'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'transfer_receipt' => 'mimes:jpeg,png,bmp,tiff',
        ]);
        $file = $request->file('transfer_receipt');
        $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
        $file->move(public_path() . '/img/donations/transfer_receipt/', $name);

        $donation = Donation::query()->create([
            'donor_id' => $request->donor_id,
            'need_id' => $request->need_id,
            'amount' => $request->amount,
            'bank_account' => $request->bank_account,
            'transfer_date' => $request->transfer_date,
            'transfer_receipt' => $name,
            'accepted_date' => $request->accepted_date !== '' ? $request->accepted_date : null,
            'accepted_by_admin_id' => $request->accepted_by_admin_id !== '' ? $request->accepted_by_admin_id : null,
        ]);

        return Redirect::route('donations.index');
    }

    public function edit(Request $request, $id)
    {
        $donors = Donor::query()->get();
        $needs = Need::query()->with(['recipient', 'needCategory'])->get();
        $admins = Admin::query()->get();
        $donation = Donation::query()->with(['donor', 'need.needCategory', 'need.recipient'])->find($id);

        return Inertia::render('Donations/DonationsEdit', compact('donors', 'needs', 'admins', 'donation'));
    }

    public function update(Request $request, $id)
    {
        $donation = Donation::query()->find($id);

        $donation->update([
            'donor_id' => $request->donor_id,
            'need_id' => $request->need_id,
            'amount' => $request->amount,
            'bank_account' => $request->bank_account,
            'transfer_date' => $request->transfer_date,
            'accepted_date' => $request->accepted_date !== '' ? $request->accepted_date : null,
            'accepted_by_admin_id' => $request->accepted_by_admin_id !== '' ? $request->accepted_by_admin_id : null,
        ]);

        if ($request->hasfile('transfer_receipt')) {
            $this->validate($request, [
                'transfer_receipt' => 'mimes:jpeg,png,bmp,tiff',
            ]);

            File::delete(public_path('/img/donations/transfer_receipt/' . $donation->transfer_receipt));

            $file = $request->file('transfer_receipt');
            $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
            $file->move(public_path() . '/img/donations/transfer_receipt/', $name);
            $donation->update([
                'transfer_receipt' => $name,
            ]);
        }

        return Redirect::route('donations.index');
    }

    public function destroy($id)
    {
        $donation = Donation::query()->find($id);

        if ($donation->delivered_photo) {
            File::delete(public_path('/img/donations/transfer_receipt/' . $donation->transfer_receipt));
        }

        $donation->delete();

        return Redirect::route('donations.index');
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
