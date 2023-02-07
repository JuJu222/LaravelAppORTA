<?php

namespace App\Http\Controllers;

use App\Models\ParentModel;
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
        $parents = ParentModel::query()->with('recipients')->get();

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
        $parent = ParentModel::query()->find($id);

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
        $parent = ParentModel::query()->find($id);

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

        if ($parent->ktp) {
            File::delete(public_path('/img/parents/ktp/' . $parent->ktp));
        }

        $parent->delete();

        return Redirect::route('parents.index');
    }
}
