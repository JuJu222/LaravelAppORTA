<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\Donor;
use App\Models\Photo;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DonorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $donors = Donor::query()->get();

        return Inertia::render('Donors/Donors', compact('donors'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Donors/DonorsCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'ktp' => 'mimes:jpeg,png,bmp,tiff',
        ]);
        $file = $request->file('ktp');
        $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
        $file->move(public_path() . '/img/donors/ktp/', $name);

        $user = User::query()->create([
            'username' => $request->input('username'),
            'role_id' => 2,
            'password' => bcrypt($request->input('password')),
        ]);

        $donor = Donor::query()->create([
            'user_id' => $user->id,
            'name' => $request->input('name'),
            'ktp' => $name,
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'address' => $request->input('address'),
            'city' => $request->input('city'),
            'note' => $request->input('note') !== '' ? $request->input('note') : null,
            'name_alias' => $request->input('name_alias') !== '' ? $request->input('name_alias') : null,
            'verified' => true,
        ]);

        if ($request->hasfile('photo')) {
            $this->validate($request, [
                'photo' => 'mimes:jpeg,png,bmp,tiff',
            ]);
            $file = $request->file('photo');
            $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
            $file->move(public_path() . '/img/donors/photo/', $name);
            $donor->update([
                'photo' => $name,
            ]);
        }

        return Redirect::route('donors.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $donor = Donor::query()->with('user')->find($id);
        $donations = Donation::query()->whereHas('need', function ($query) use ($donor) {
            return $query->where('donor_id', '=', $donor->id);
        })->with(['donor', 'need.needCategory', 'need.recipient.photos.type'])->get();

        return Inertia::render('Donors/DonorsShow', compact('donor', 'donations'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $donor = Donor::query()->find($id);
        $user = User::query()->find($donor->user_id);

        return Inertia::render('Donors/DonorsEdit', compact('donor', 'user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $donor = Donor::query()->find($id);

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

        return Redirect::route('donors.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $donor = Donor::query()->find($id);

        User::query()->find($donor->user_id)->delete();

        if ($donor->ktp) {
            File::delete(public_path('/img/donors/ktp/' . $donor->ktp));
        }

        if ($donor->photo) {
            File::delete(public_path('/img/donors/photo/' . $donor->photo));
        }

        $donor->delete();

        return Redirect::route('donors.index');
    }

    public function notVerified()
    {
        if (Auth::user()->role_id != 2) {
            return back();
        }

        $donor = Donor::query()->where('user_id', Auth::id())->first();

        if ($donor->verified) {
            return back();
        }

        return Inertia::render('Donors/DonorsNotVerified', compact('donor'));
    }

    public function accept($id)
    {
        $donor = Donor::query()->find($id);

        if (!$donor->verified) {
            $donor->update([
                'verified' => true,
            ]);
        }

        return Redirect::back();
    }

    public function reject($id)
    {
        $donor = Donor::query()->find($id);

        if (!$donor->verified) {
            $donor->delete();
        }

        return Redirect::back();
    }
}
