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
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    function home() {
        $recipients = Recipient::query()->with(['parents', 'disabilities', 'photos.type'])->get();

        if (Auth::user()->role_id == 1) {
            $admin = Admin::query()->where('user_id', Auth::id())->first();
            return Inertia::render('Home', compact('recipients', 'admin'));
        } else if (Auth::user()->role_id == 2) {
            $donor = Donor::query()->where('user_id', Auth::id())->first();
            $donor['donation_count'] = Donation::query()->where('donor_id', $donor->id)
                ->whereNotNull('accepted_date')->count();
            return Inertia::render('Home', compact('recipients', 'donor'));
        } else {
            $recipient = Recipient::query()->where('user_id', Auth::id())->with('needs')->first();
            foreach ($recipient->needs as $need) {
                $need['collected'] = Donation::query()->where('need_id', $need->pivot->id)
                    ->whereNotNull('accepted_date')->sum('amount');
            }
            return Inertia::render('Home', compact('recipients', 'recipient'));
        }
    }

    function donations() {
        if (Auth::user()->role_id == 1) {
            $donations = Donation::query()->whereHas('need', function ($query) {
                return $query->where('donor_id', '=', Auth::user()->donor->id);
            })->with(['donor', 'need.needCategory', 'need.recipient.photos.type'])->get();

            return Inertia::render('Donations', compact('donations'));
        } else if (Auth::user()->role_id == 2) {
            $donations = Donation::query()->whereHas('need', function ($query) {
                return $query->where('donor_id', '=', Auth::user()->donor->id);
            })->with(['donor', 'need.needCategory', 'need.recipient.photos.type'])->get();

            return Inertia::render('Donations', compact('donations'));
        } else {
            $donations = Donation::query()->whereHas('need', function ($query) {
                return $query->where('recipient_id', '=', Auth::user()->recipient->id);
            })->with(['donor', 'need.needCategory', 'need.recipient.photos.type'])->get();

            return Inertia::render('Donations', compact('donations'));
        }
    }

    function profile() {
        if (Auth::user()->role_id == 1) {
            $admin = Admin::query()->where('user_id', Auth::id())->first();
            return Inertia::render('Profile', compact('admin'));
        } else if (Auth::user()->role_id == 2) {
            $donor = Donor::query()->where('user_id', Auth::id())->first();
            return Inertia::render('Profile', compact('donor'));
        } else {
            $recipient = Recipient::query()->where('user_id', Auth::id())->first();
            return Inertia::render('Profile', compact('recipient'));
        }
    }

    function profileEdit() {
        if (Auth::user()->role_id == 1) {
            $admin = Admin::query()->where('user_id', Auth::id())->with('user')->first();
            return Inertia::render('ProfileEdit', compact('admin'));
        } else if (Auth::user()->role_id == 2) {
            $donor = Donor::query()->where('user_id', Auth::id())->first();
            return Inertia::render('ProfileEdit', compact('donor'));
        } else {
            $recipient = Recipient::query()->where('user_id', Auth::id())->first();
            return Inertia::render('ProfileEdit', compact('recipient'));
        }
    }

    function profileUpdate() {
        if (Auth::user()->role_id == 1) {
            $admin = Admin::query()->find($id);
            $admin->update([
                'name' => $request->input('name'),
                'phone' => $request->input('phone'),
                'email' => $request->input('email'),
                'jabatan' => $request->input('jabatan'),
                'note' => $request->input('note') !== '' ? $request->input('note') : null,
            ]);

            if ($request->password == '') {
                User::query()->find($admin->user_id)->update([
                    'username' => $request->input('username'),
                ]);
            } else {
                User::query()->find($admin->user_id)->update([
                    'username' => $request->input('username'),
                    'password' => bcrypt($request->input('password')),
                ]);
            }

            return Redirect::route('profile');
        } else if (Auth::user()->role_id == 2) {
            $donor = Donor::query()->where('user_id', Auth::id())->first();
            return Inertia::render('Profile', compact('donor'));
        } else {
            $recipient = Recipient::query()->where('user_id', Auth::id())->first();
            return Inertia::render('Profile', compact('recipient'));
        }
    }
}
