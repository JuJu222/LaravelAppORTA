<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Donation;
use App\Models\Donor;
use App\Models\Need;
use App\Models\Photo;
use App\Models\Recipient;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    function home() {
        $recipients = Recipient::query()->where('is_active', true)->with(['parents', 'disabilities', 'photos.type'])->get();

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
                $need['status'] = Need::query()->find($need->pivot->id)->status;
            }
            return Inertia::render('Home', compact('recipients', 'recipient'));
        }
    }

    function donations() {
        if (Auth::user()->role_id == 1) {
            return Redirect::back();
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
            $donor = Donor::query()->where('user_id', Auth::id())->with('user')->first();
            return Inertia::render('ProfileEdit', compact('donor'));
        } else {
            $recipient = Recipient::query()->where('user_id', Auth::id())->with(['user', 'photos.type'])->first();
            return Inertia::render('ProfileEdit', compact('recipient'));
        }
    }

    function profileUpdate(Request $request) {
        if (Auth::user()->role_id == 1) {
            $admin = Admin::query()->where('user_id', Auth::id())->first();
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

            $donor->update([
                'name' => $request->input('name'),
                'phone' => $request->input('phone'),
                'email' => $request->input('email'),
                'address' => $request->input('address'),
                'city' => $request->input('city'),
                'note' => $request->input('note') !== '' ? $request->input('note') : null,
                'name_alias' => $request->input('name_alias') !== '' ? $request->input('name_alias') : null,
                'verified' => true,
            ]);

            if ($request->password == '') {
                User::query()->find($donor->user_id)->update([
                    'username' => $request->input('username'),
                ]);
            } else {
                User::query()->find($donor->user_id)->update([
                    'username' => $request->input('username'),
                    'password' => bcrypt($request->input('password')),
                ]);
            }

            if ($request->hasfile('ktp')) {
                $this->validate($request, [
                    'ktp' => 'mimes:jpeg,png,bmp,tiff',
                ]);

                File::delete(public_path('/img/donors/ktp/' . $donor->ktp));

                $file = $request->file('ktp');
                $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
                $file->move(public_path() . '/img/donors/ktp/', $name);
                $donor->update([
                    'ktp' => $name,
                ]);
            }

            if ($request->hasfile('photo')) {
                $this->validate($request, [
                    'photo' => 'mimes:jpeg,png,bmp,tiff',
                ]);

                File::delete(public_path('/img/donors/photo/' . $donor->photo));

                $file = $request->file('photo');
                $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
                $file->move(public_path() . '/img/donors/photo/', $name);
                $donor->update([
                    'photo' => $name,
                ]);
            }

            return Redirect::route('profile');
        } else {
            $recipient = Recipient::query()->where('user_id', Auth::id())->first();

            $recipient->update([
                'name' => $request->input('name'),
                'nik' => $request->input('nik'),
                'gender' => $request->input('gender'),
                'birthplace' => $request->input('birthplace'),
                'birthdate' => $request->input('birthdate'),
                'school' => $request->input('school'),
                'class' => $request->input('class'),
                'siblings' => $request->input('siblings'),
                'child_no' => $request->input('child_no'),
                'address' => $request->input('address'),
                'city' => $request->input('city'),
                'phone' => $request->input('phone'),
                'note' => $request->input('note') !== '' ? $request->input('note') : null,
                'is_active' => $request->input('is_active'),
            ]);

            if ($request->password == '') {
                User::query()->find($recipient->user_id)->update([
                    'username' => $request->input('username'),
                ]);
            } else {
                User::query()->find($recipient->user_id)->update([
                    'username' => $request->input('username'),
                    'password' => bcrypt($request->input('password')),
                ]);
            }

            if ($request->hasfile('birth_certificate')) {
                $this->validate($request, [
                    'birth_certificate' => 'mimes:jpeg,png,bmp,tiff',
                ]);

                File::delete(public_path('/img/recipients/birth_certificate/' . $recipient->birth_certificate));

                $file = $request->file('birth_certificate');
                $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
                $file->move(public_path() . '/img/recipients/birth_certificate/', $name);
                $recipient->update([
                    'birth_certificate' => $name,
                ]);
            }

            if ($request->hasfile('kartu_keluarga')) {
                $this->validate($request, [
                    'kartu_keluarga' => 'mimes:jpeg,png,bmp,tiff',
                ]);

                File::delete(public_path('/img/recipients/kartu_keluarga/' . $recipient->kartu_keluarga));

                $file = $request->file('kartu_keluarga');
                $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
                $file->move(public_path() . '/img/recipients/kartu_keluarga/', $name);
                $recipient->update([
                    'kartu_keluarga' => $name,
                ]);
            }

            if ($request->hasfile('primary_photo')) {
                $this->validate($request, [
                    'primary_photo' => 'mimes:jpeg,png,bmp,tiff',
                ]);

                foreach ($recipient->photos as $photo) {
                    if ($photo->type->type === 'primary') {
                        $photo = Photo::query()->find($photo->id);

                        File::delete(public_path('/img/recipients/photos/' . $photo->photo_url));
                        $photo->delete();
                    }
                }

                $file = $request->file('primary_photo');
                $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
                $file->move(public_path() . '/img/recipients/photos/', $name);
                Photo::query()->create([
                    'title' => '',
                    'photo_url' => $name,
                    'photo_type_id' => 1,
                    'recipient_id' => $recipient->id,
                ]);
            }

            if ($request->hasFile('photos')) {
                if (is_array($request->file('photos'))) {
                    foreach ($request->file('photos') as $file) {
//                    $this->validate($request, [
//                        'photos.*' => 'mimes:jpeg,png,bmp,tiff',
//                    ]);

                        foreach ($recipient->photos as $photo) {
                            if ($photo->type->type === 'secondary') {
                                $photo = Photo::query()->find($photo->id);

                                File::delete(public_path('/img/recipients/photos/' . $photo->photo_url));
                                $photo->delete();
                            }
                        }

                        $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
                        $file->move(public_path() . '/img/recipients/photos/', $name);
                        Photo::query()->create([
                            'title' => '',
                            'photo_url' => $name,
                            'photo_type_id' => 2,
                            'recipient_id' => $recipient->id,
                        ]);
                    }
                } else {
                    $this->validate($request, [
                        'photos' => 'mimes:jpeg,png,bmp,tiff',
                    ]);

                    foreach ($recipient->photos as $photo) {
                        if ($photo->type->type === 'secondary') {
                            $photo = Photo::query()->find($photo->id);

                            File::delete(public_path('/img/recipients/photos/' . $photo->photo_url));
                            $photo->delete();
                        }
                    }

                    $file = $request->file('photos');
                    $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
                    $file->move(public_path() . '/img/recipients/photos/', $name);
                    Photo::query()->create([
                        'title' => '',
                        'photo_url' => $name,
                        'photo_type_id' => 2,
                        'recipient_id' => $recipient->id,
                    ]);
                }
            }

            return Redirect::route('profile');
        }
    }
}
