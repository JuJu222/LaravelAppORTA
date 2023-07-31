<?php

namespace App\Http\Controllers;

use App\Models\ParentModel;
use App\Models\Photo;
use App\Models\Relationship;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ParentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $parents = ParentModel::query()->with(['recipients', 'photos.type'])->get();

        foreach ($parents as $parent) {
            foreach ($parent->recipients as $recipient) {
                $recipient['relationship'] = Relationship::query()->find($recipient->pivot->relationship_id)->relationship;
            }
        }

        return Inertia::render('Parents/Parents', compact('parents'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Parents/ParentsCreate');
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
        $file->move(public_path() . '/img/parents/ktp/', $name);

        $parent = ParentModel::query()->create([
            'name' => $request->name,
            'nik' => $request->nik,
            'birthplace' => $request->birthplace,
            'birthdate' => $request->birthdate,
            'occupation' => $request->occupation,
            'address' => $request->address,
            'phone' => $request->phone,
            'ktp_image' => $name,
        ]);

        if ($request->hasfile('primary_photo')) {
            $this->validate($request, [
                'primary_photo' => 'mimes:jpeg,png,bmp,tiff',
            ]);
            $file = $request->file('primary_photo');
            $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
            $file->move(public_path() . '/img/parents/photos/', $name);
            Photo::query()->create([
                'title' => '',
                'photo_url' => $name,
                'photo_type_id' => 1,
                'parent_id' => $parent->id,
            ]);
        }

        if ($request->hasFile('photos')) {
            if (is_array($request->file('photos'))) {
                foreach ($request->file('photos') as $file) {
//                    $this->validate($request, [
//                        'photos.*' => 'mimes:jpeg,png,bmp,tiff',
//                    ]);
                    $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
                    $file->move(public_path() . '/img/parents/photos/', $name);
                    Photo::query()->create([
                        'title' => '',
                        'photo_url' => $name,
                        'photo_type_id' => 2,
                        'parent_id' => $parent->id,
                    ]);
                }
            } else {
                $this->validate($request, [
                    'photos' => 'mimes:jpeg,png,bmp,tiff',
                ]);
                $file = $request->file('photos');
                $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
                $file->move(public_path() . '/img/parents/photos/', $name);
                Photo::query()->create([
                    'title' => '',
                    'photo_url' => $name,
                    'photo_type_id' => 2,
                    'parent_id' => $parent->id,
                ]);
            }
        }

        return Redirect::route('parents.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $parent = ParentModel::query()->with('photos.type')->find($id);

        return Inertia::render('Parents/ParentsShow', compact('parent'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $parent = ParentModel::query()->with('photos.type')->find($id);

        return Inertia::render('Parents/ParentsEdit', compact('parent'));
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
        $parent = ParentModel::query()->find($id);

        $parent->update([
            'name' => $request->name,
            'nik' => $request->nik,
            'birthplace' => $request->birthplace,
            'birthdate' => $request->birthdate,
            'occupation' => $request->occupation,
            'address' => $request->address,
            'phone' => $request->phone,
        ]);

        if ($request->hasfile('ktp')) {
            $this->validate($request, [
                'ktp' => 'mimes:jpeg,png,bmp,tiff',
            ]);

            File::delete(public_path('/img/parents/ktp/' . $parent->ktp_image));

            $file = $request->file('ktp');
            $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
            $file->move(public_path() . '/img/parents/ktp/', $name);
            $parent->update([
                'ktp_image' => $name,
            ]);
        }

        if ($request->hasfile('primary_photo')) {
            $this->validate($request, [
                'primary_photo' => 'mimes:jpeg,png,bmp,tiff',
            ]);

            foreach ($parent->photos as $photo) {
                if ($photo->type->type === 'primary') {
                    $photo = Photo::query()->find($photo->id);

                    File::delete(public_path('/img/parents/photos/' . $photo->photo_url));
                    $photo->delete();
                }
            }

            $file = $request->file('primary_photo');
            $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
            $file->move(public_path() . '/img/parents/photos/', $name);
            Photo::query()->create([
                'title' => '',
                'photo_url' => $name,
                'photo_type_id' => 1,
                'parent_id' => $parent->id,
            ]);
        }

        if ($request->hasFile('photos')) {
            if (is_array($request->file('photos'))) {
                foreach ($request->file('photos') as $file) {
//                    $this->validate($request, [
//                        'photos.*' => 'mimes:jpeg,png,bmp,tiff',
//                    ]);

                    foreach ($parent->photos as $photo) {
                        if ($photo->type->type === 'secondary') {
                            File::delete(public_path('/img/parents/photos/' . $photo->photo_url));
                            Photo::query()->where('id', $photo->id)->delete();
                        }
                    }

                    $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
                    $file->move(public_path() . '/img/parents/photos/', $name);
                    Photo::query()->create([
                        'title' => '',
                        'photo_url' => $name,
                        'photo_type_id' => 2,
                        'parent_id' => $parent->id,
                    ]);
                }
            } else {
                $this->validate($request, [
                    'photos' => 'mimes:jpeg,png,bmp,tiff',
                ]);

                foreach ($parent->photos as $photo) {
                    if ($photo->type->type === 'secondary') {
                        File::delete(public_path('/img/parents/photos/' . $photo->photo_url));
                        Photo::query()->where('id', $photo->id)->delete();
                    }
                }

                $file = $request->file('photos');
                $name = Carbon::now()->format('Ymd-His') . '-' . $file->getClientOriginalName();
                $file->move(public_path() . '/img/parents/photos/', $name);
                Photo::query()->create([
                    'title' => '',
                    'photo_url' => $name,
                    'photo_type_id' => 2,
                    'parent_id' => $parent->id,
                ]);
            }
        }

        return Redirect::route('parents.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $parent = ParentModel::query()->find($id);

        foreach ($parent->photos as $photo) {
            $photo = Photo::query()->find($photo->id);

            File::delete(public_path('/img/parents/photos/' . $photo->photo_url));
            $photo->delete();
        }

        if ($parent->ktp) {
            File::delete(public_path('/img/parents/ktp/' . $parent->ktp));
        }

        $parent->delete();

        return Redirect::route('parents.index');
    }
}
