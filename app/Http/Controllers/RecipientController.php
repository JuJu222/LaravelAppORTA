<?php

namespace App\Http\Controllers;

use App\Models\Recipient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class RecipientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $recipients = Recipient::query()->get();

        return Inertia::render('Recipients/Recipients', compact('recipients'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Recipients/RecipientsCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Recipient::query()->create([
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
            'parent_id' => $request->input('parent_id'),
            'birth_certificate' => $request->input('birth_certificate'),
            'kartu_keluarga' => $request->input('kartu_keluarga'),
            'note' => $request->input('note'),
            'is_active' => $request->input('is_active'),
        ]);

        return Redirect::route('recipients.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
