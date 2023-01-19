<?php

namespace App\Http\Controllers;

use App\Models\Disability;
use App\Models\Donation;
use App\Models\Donor;
use App\Models\NeedCategory;
use App\Models\Need;
use App\Models\ParentModel;
use App\Models\Recipient;
use App\Models\Relationship;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $recipients = Recipient::query()->with(['disabilities'])->get();

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

    public function addParents($id) {
        $recipient = Recipient::query()->find($id);
        $parents = ParentModel::query()->get();
        $relationships = Relationship::query()->get();
        $selectedParents = $recipient->parents;

        return Inertia::render('Recipients/RecipientsAddParents',
            compact('recipient', 'parents', 'relationships', 'selectedParents'));
    }

    public function addDisabilities($id) {
        $recipient = Recipient::query()->find($id);
        $disabilities = Disability::query()->get();
        $selectedDisabilities = $recipient->disabilities;

        return Inertia::render('Recipients/RecipientsAddDisabilities',
            compact('recipient', 'disabilities', 'selectedDisabilities'));
    }

    public function addNeeds($id) {
        $recipient = Recipient::query()->find($id);
        $needs = NeedCategory::query()->get();
        $selectedNeeds = $recipient->needs;

        return Inertia::render('Recipients/RecipientsAddNeeds',
            compact('recipient', 'needs', 'selectedNeeds'));
    }

    public function addDonation($recipientID, $needID) {
        $recipient = Recipient::query()->with(['parents', 'disabilities', 'needs'])->find($recipientID);
        $need = $recipient->needs()->where('needs.id', $needID)->first();

        $need['collected'] = Donation::query()->where('need_id', $need->pivot->id)
            ->whereNotNull('accepted_date')->sum('amount');

        return Inertia::render('Recipients/RecipientsDonate',
            compact('recipient', 'need'));
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
            'role_id' => 3,
            'password' => bcrypt($request->input('password')),
        ]);

        $recipient = Recipient::query()->create([
            'user_id' => $user->id,
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

        return Redirect::route('recipients.parents.add', $recipient->id);
    }

    public function storeParents(Request $request, $id)
    {
        $recipient = Recipient::query()->find($id);
        $recipient->parents()->detach();

        foreach ($request->parents as $parent) {
            $recipient->parents()->attach($parent['id'], ['relationship_id' => $parent['pivot']['relationship_id']]);
        }

        return Redirect::route('recipients.disabilities.add', $recipient->id);
    }

    public function storeDisabilities(Request $request, $id)
    {
        $recipient = Recipient::query()->find($id);
        $recipient->disabilities()->detach();

        foreach ($request->disabilities as $disability) {
            $recipient->disabilities()->attach($disability['id']);
        }

        return Redirect::route('recipients.index');
    }

    public function storeNeeds(Request $request, $id)
    {
        $recipient = Recipient::query()->find($id);
        $recipient->needs()->detach();

        foreach ($request->needs as $need) {
            $recipient->needs()->attach($need['id'], [
                'amount' => $need['pivot']['amount'],
                'due_date' => $need['pivot']['due_date'],
            ]);
        }

        return Redirect::route('recipients.index');
    }

    public function storeDonation(Request $request, $recipientID, $needID)
    {
        $recipient = Recipient::query()->find($recipientID);
        $donor = Donor::query()->where('user_id', Auth::id())->first();

        $this->validate($request, [
            'transfer_receipt' => 'mimes:jpeg,png,bmp,tiff',
        ]);
        $file = $request->file('transfer_receipt');
        $name = Carbon::now()->format('Ymd-His') . '.' . $file->getClientOriginalExtension();
        $file->move(public_path() . '/img/donations/transfer_receipt/', $name);

        $donation = Donation::query()->create([
            'donor_id' => $donor->id,
            'need_id' => $needID,
            'amount' => $request->amount,
            'bank_account' => $request->bank_account,
            'transfer_date' => date('2022-9-5'),
            'transfer_receipt' => $name,
        ]);

        return Inertia::render('DonorThankYou', compact('donor', 'donation', 'recipient'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $recipient = Recipient::query()->with(['parents', 'disabilities', 'needs'])->find($id);
        $recipients = Recipient::query()->with(['parents', 'disabilities'])->limit(3)->get();
        $donations = Donation::query()->whereHas('need', function ($query) use ($id) {
            return $query->where('recipient_id', '=', $id);
        })->with(['donor', 'need.needCategory', 'need.recipient'])->get();

        foreach ($recipient->parents as $parent) {
            $parent['relationship'] = Relationship::query()->find($parent->pivot->relationship_id)->relationship;
        }
        foreach ($recipient->needs as $need) {
            $need['collected'] = Donation::query()->where('need_id', $need->pivot->id)
                ->whereNotNull('accepted_date')->sum('amount');
        }

        return Inertia::render('Recipients/RecipientsShow', compact('recipient', 'recipients', 'donations'));
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
        $user = $recipient->user;

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

    public function showMessage($id)
    {
        $donor = Donor::query()->where('user_id', Auth::id())->first();
        $donation = Donation::query()->find($id);
        $need = Need::query()->where('id', $donation->need_id)->with('needCategory')->first();
        $need['collected'] = Donation::query()->where('need_id', $donation->need_id)
            ->whereNotNull('accepted_date')->sum('amount');
        $recipient = Recipient::query()->find($need->recipient_id);

        return Inertia::render('RecipientsMessage', compact('donor', 'need', 'recipient', 'donation'));
    }
}
