<?php

namespace App\Http\Controllers;

use App\Models\Disability;
use App\Models\Penelitian\Penelitian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DisabilityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $disabilities = Disability::query()->get();

        return Inertia::render('Disabilities/Disabilities', compact('disabilities'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Disabilities/DisabilitiesCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Disability::query()->create([
            'disability' => $request->input('disability'),
            'description' => $request->input('description'),
        ]);

        return Redirect::route('disabilities.index');
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
        $disability = Disability::query()->find($id);

        return Inertia::render('Disabilities/DisabilitiesEdit', compact('disability'));
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
        Disability::query()->find($id)->update([
            'disability' => $request->input('disability'),
            'description' => $request->input('description'),
        ]);

        return Redirect::route('disabilities.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Disability::query()->find($id)->delete();

        return Redirect::back();
    }
}
