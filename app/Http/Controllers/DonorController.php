<?php

namespace App\Http\Controllers;

use App\Models\Donor;
use App\Models\User;
use Illuminate\Http\Request;
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
        $donor = Donor::query()->create([
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

        User::query()->create([
            'username' => $request->input('username'),
            'user_id' => $donor->id,
            'role_id' => 2,
            'password' => bcrypt($request->input('password')),
        ]);

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
        Donor::query()->find($id)->delete();
        User::query()->where('role_id', 2)->where('user_id', $id)->delete();

        return Redirect::route('donors.index');
    }
}
