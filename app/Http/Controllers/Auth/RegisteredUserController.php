<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Donor;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'username' => $request->username,
            'role_id' => 2,
            'password' => Hash::make($request->password),
        ]);

        $donor = Donor::query()->create([
            'user_id' => $user->id,
            'name' => $request->name,
            'name_alias' => $request->name_alias == '' ? $request->name_alias : null,
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->address,
            'city' => $request->city,
            'note' => $request->note,
        ]);

        if ($request->hasfile('ktp')) {
            $this->validate($request, [
                'photo' => 'mimes:jpeg,png,bmp,tiff',
            ]);
            $file = $request->file('ktp');
            $name = Carbon::now()->format('Ymd-His') . '.' . $file->getClientOriginalExtension();
            $file->move(public_path() . '/img/donors/ktp/', $name);
            $donor->update([
                'kartu_keluarga' => $name,
            ]);
        }

        if ($request->hasfile('photo')) {
            $this->validate($request, [
                'photo' => 'mimes:jpeg,png,bmp,tiff',
            ]);
            $file = $request->file('kartu_keluarga');
            $name = Carbon::now()->format('Ymd-His') . '.' . $file->getClientOriginalExtension();
            $file->move(public_path() . '/img/donors/photo/', $name);
            $donor->update([
                'kartu_keluarga' => $name,
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
