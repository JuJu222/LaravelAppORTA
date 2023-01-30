<?php

namespace App\Http\Controllers;

use App\Models\Need;
use App\Models\NeedCategory;
use App\Models\Recipient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class NeedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $needs = Need::query()->with(['needCategory', 'recipient', 'donations'])->get();

        return Inertia::render('Needs/Needs', compact('needs'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $recipients = Recipient::query()->get();
        $needCategories = NeedCategory::query()->get();

        return Inertia::render('Needs/NeedsCreate', compact('recipients', 'needCategories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Need::query()->create([
            'recipient_id' => $request->recipient_id,
            'need_category_id' => $request->need_category_id,
            'amount' => $request->amount,
            'due_date' => $request->due_date,
        ]);

        return Redirect::route('needs.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $need = Need::query()->with(['donations', 'recipient', 'needCategory'])->find($id);

        return Inertia::render('Needs/NeedsShow', compact('need'));
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
        $need = Need::query()->find($id);

        if ($need->delivered_photo) {
            File::delete(public_path('/img/recipients/delivered_photo/' . $need->delivered_photo));
        }

        $need->delete();

        return Redirect::route('needs.index');
    }
}
