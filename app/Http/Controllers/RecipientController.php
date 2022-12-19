<?php

namespace App\Http\Controllers;

use App\Models\Disability;
use App\Models\NeedCategory;
use App\Models\ParentModel;
use App\Models\Recipient;
use App\Models\Relationship;
use App\Models\User;
use Carbon\Carbon;
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
        $parents = ParentModel::query()->get();
        $disabilities = Disability::query()->get();
        $relationships = Relationship::query()->get();

        return Inertia::render('Recipients/RecipientsCreate', compact('parents', 'relationships', 'disabilities'));
    }

    public function createParents() {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $recipient = Recipient::query()->create([
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
            'birth_certificate' => $request->input('birth_certificate'),
            'note' => $request->input('note'),
            'is_active' => $request->input('is_active'),
        ]);

        if ($request->hasfile('kartu_keluarga')) {
            $this->validate($request, [
                'photo' => 'mimes:jpeg,png,bmp,tiff',
            ]);
            $file = $request->file('kartu_keluarga');
            $name = Carbon::now()->format('Ymd-His') . '.' . $file->getClientOriginalExtension();
            $file->move(public_path() . '/img/recipients/kartu_keluarga/', $name);
            $recipient->update([
                'kartu_keluarga' => $name,
            ]);
        }

        foreach ($request->parents as $parent) {
            $recipient->parents()->attach($parent['id'], ['relationship_id' => $parent['relationship_id']]);
        }

        foreach ($request->disabilities as $disability) {
            $recipient->disabilities()->attach($disability['id'], [
                'amount' => $disability['amount'],
                'due_date' => $disability['due_date'],
            ]);
        }

        User::query()->create([
            'username' => $request->input('username'),
            'user_id' => $recipient->id,
            'role_id' => 3,
            'password' => bcrypt($request->input('password')),
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
        $recipient = Recipient::query()->with(['parents', 'disabilities'])->find($id);
        $recipients = Recipient::query()->with(['parents', 'disabilities'])->limit(3)->get();

        foreach ($recipient->disabilities as $disability) {
            $disability['collected'] = 90000;
        }

        return Inertia::render('Recipients/RecipientsShow', compact('recipient', 'recipients'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $recipient = Recipient::query()->find($id);
        $user = User::query()->where('role_id', 3)
                    ->where('user_id', $id)->first();

        return Inertia::render('Recipients/RecipientsEdit', compact('recipient', 'user'));
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
        Recipient::query()->find($id)->update([
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
        User::query()->where('role_id', 3)->where('user_id', $id)->update([
            'username' => $request->input('username'),
            'password' => bcrypt($request->input('password')),
        ]);

        return Redirect::route('recipients.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Recipient::query()->find($id)->delete();
        User::query()->where('role_id', 3)->where('user_id', $id)->delete();

        return Redirect::route('recipients.index');
    }
}
