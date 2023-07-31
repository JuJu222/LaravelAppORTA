<?php

namespace App\Http\Controllers;

use App\Models\Disability;
use App\Models\Donation;
use App\Models\Donor;
use App\Models\NeedCategory;
use App\Models\Need;
use App\Models\ParentModel;
use App\Models\Photo;
use App\Models\Recipient;
use App\Models\Relationship;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
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
        $recipients = Recipient::query()->with(['disabilities', 'parents', 'photos.type'])->get();

        foreach ($recipients as $recipient) {
            foreach ($recipient->parents as $parent) {
                $parent['relationship'] = Relationship::query()->find($parent->pivot->relationship_id)->relationship;
            }
        }

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
        $recipient = Recipient::query()->with(['parents', 'disabilities', 'needs', 'photos.type'])->find($recipientID);
        $need = $recipient->needs()->where('needs.id', $needID)->first();
        $need['status'] = Need::query()->find($need->pivot->id)->status;

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
            'note' => $request->input('note') !== '' ? $request->input('note') : null,
            'is_active' => $request->input('is_active'),
        ]);

        if ($request->hasfile('birth_certificate')) {
            $this->validate($request, [
                'birth_certificate' => 'mimes:jpeg,png,bmp,tiff',
            ]);
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
        $recipient = Recipient::query()->with('photos.type')->find($recipientID);
        $donor = Donor::query()->where('user_id', Auth::id())->first();

        $this->validate($request, [
            'transfer_receipt' => 'mimes:jpeg,png,bmp,tiff',
        ]);
        $file = $request->file('transfer_receipt');
        $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
        $file->move(public_path() . '/img/donations/transfer_receipt/', $name);

        $donation = Donation::query()->create([
            'donor_id' => $donor->id,
            'need_id' => $needID,
            'amount' => $request->amount,
            'bank_account' => $request->bank_account,
            'transfer_date' => $request->transfer_date,
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
        $recipient = Recipient::query()->with(['parents.disabilities', 'parents.photos.type', 'disabilities', 'needs', 'photos.type'])->find($id);
        foreach ($recipient->needs as $need) {
            $need['status'] = Need::query()->find($need->pivot->id)->status;
        }
        $recipients = Recipient::query()->with(['parents', 'disabilities'])->limit(3)->get();
        if (Auth::user()->role_id == 1) {
            $donations = Donation::query()->whereHas('need', function ($query) use ($id) {
                return $query->where('recipient_id', '=', $id);
            })->with(['donor', 'need.needCategory', 'need.recipient'])->get();
        } else if (Auth::user()->role_id == 2) {
            $donations = Donation::query()->where('donor_id', Auth::id())->whereHas('need', function ($query) use ($id) {
                return $query->where('recipient_id', '=', $id);
            })->with(['donor', 'need.needCategory', 'need.recipient'])->get();
        } else {
            $donations = Donation::query()->whereNotNull('accepted_date')->whereHas('need', function ($query) use ($id) {
                return $query->where('recipient_id', '=', $id);
            })->with(['donor', 'need.needCategory', 'need.recipient'])->get();
        }

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
        $recipient = Recipient::query()->with('photos.type')->find($id);
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
        $recipient = Recipient::query()->with('photos.type')->find($id);

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
                            File::delete(public_path('/img/recipients/photos/' . $photo->photo_url));
                            Photo::query()->where('id', $photo->id)->delete();
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
                        File::delete(public_path('/img/recipients/photos/' . $photo->photo_url));
                        Photo::query()->where('id', $photo->id)->delete();
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
        $recipient = Recipient::query()->find($id);

        foreach ($recipient->photos as $photo) {
            $photo = Photo::query()->find($photo->id);

            File::delete(public_path('/img/recipients/photos/' . $photo->photo_url));
            $photo->delete();
        }

        User::query()->find($recipient->user_id)->delete();

        if ($recipient->birth_certificate) {
            File::delete(public_path('/img/recipients/birth_certificate/' . $recipient->birth_certificate));
        }

        if ($recipient->kartu_keluarga) {
            File::delete(public_path('/img/recipients/kartu_keluarga/' . $recipient->kartu_keluarga));
        }

        $recipient->delete();

        return Redirect::route('recipients.index');
    }

    public function showMessage($id)
    {
        if (Auth::user()->role_id == 2) {
            $donor = Donor::query()->where('user_id', Auth::id())->first();
            $donation = Donation::query()->find($id);
            $need = Need::query()->where('id', $donation->need_id)->with('needCategory')->first();
            $need['collected'] = Donation::query()->where('need_id', $donation->need_id)
                ->whereNotNull('accepted_date')->sum('amount');
            $recipient = Recipient::query()->with('photos.type')->find($need->recipient_id);

            return Inertia::render('RecipientsMessage', compact('donor', 'need', 'recipient', 'donation'));
        } else {
            $recipient = Recipient::query()->where('user_id', Auth::id())->first();
            $need = $recipient->needs()->where('needs.id', $id)->first();
            $need['status'] = Need::query()->find($need->pivot->id)->status;
            $need['collected'] = Donation::query()->where('need_id', $need->pivot->id)
                ->whereNotNull('accepted_date')->sum('amount');

            return Inertia::render('Needs/NeedsMessage', compact('recipient', 'need'));
        }
    }

    public function postMessage(Request $request, $id)
    {
        $need = Need::query()->find($id);

        $this->validate($request, [
            'delivered_photo' => 'mimes:jpeg,png,bmp,tiff',
        ]);
        $file = $request->file('delivered_photo');
        $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
        $file->move(public_path() . '/img/recipients/delivered_photo/', $name);

        $need->update([
           'delivered_date' => $request->delivered_date,
           'delivered_photo' => $name,
           'delivered_message' => $request->delivered_message
        ]);

        return Redirect::route('home');
    }
}
