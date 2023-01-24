<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $admins = Admin::query()->get();

        return Inertia::render('Admins/Admins', compact('admins'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admins/AdminsCreate');
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
            'role_id' => 1,
            'password' => bcrypt($request->input('password')),
        ]);

        Admin::query()->create([
            'user_id' => $user->id,
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'jabatan' => $request->input('jabatan'),
            'note' => $request->input('note'),
        ]);

        return Redirect::route('admins.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $admin = Admin::query()->with('user')->find($id);

        return Inertia::render('Admins/AdminsShow', compact('admin'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $admin = Admin::query()->with('user')->find($id);

        return Inertia::render('Admins/AdminsEdit', compact('admin'));
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

        return Redirect::route('admins.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $admin = Admin::query()->find($id);
        User::query()->find($admin->user_id)->delete();

        return Redirect::back();
    }
}
