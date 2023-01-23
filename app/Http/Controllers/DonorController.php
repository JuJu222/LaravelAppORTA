<?php

namespace App\Http\Controllers;

use App\Models\Donor;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $user = User::query()->create([
            'username' => $request->input('username'),
            'role_id' => 2,
            'password' => bcrypt($request->input('password')),
        ]);

        $donor = Donor::query()->create([
            'user_id' => $user->id,
            'name' => $request->input('name'),
            'ktp' => $request->input('ktp'),
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'address' => $request->input('address'),
            'city' => $request->input('city'),
            'note' => $request->input('note'),
        ]);

        if ($request->has('name_alias')) {
            if ($request->input('name_alias') != '') {
                $donor->update([
                    'name_alias' => $request->input('name_alias'),
                ]);
            }
        }

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
        $donor = Donor::query()->find($id);

        return Inertia::render('Donors/DonorsShow', compact('donor'));
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
        $user = User::query()->where('role_id', 2)
            ->where('user_id', $id)->first();

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
        Donor::query()->find($id)->update([
            'name' => $request->input('name'),
            'name_alias' => $request->input('name_alias'),
            'ktp' => $request->input('ktp'),
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'address' => $request->input('address'),
            'city' => $request->input('city'),
            'note' => $request->input('note'),
            'photo' => $request->input('photo'),
        ]);
        User::query()->where('role_id', 2)->where('user_id', $id)->update([
            'username' => $request->input('username'),
            'password' => bcrypt($request->input('password')),
        ]);

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

        return Redirect::back();
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
