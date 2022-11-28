<?php

namespace App\Http\Controllers;

use App\Models\NeedCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class NeedCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $needCategories = NeedCategory::query()->get();

        return Inertia::render('NeedCategories/NeedCategories', compact('needCategories'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('NeedCategories/NeedCategoriesCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        NeedCategory::query()->create([
            'category' => $request->input('category'),
        ]);

        return Redirect::route('need_categories.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $needCategory = NeedCategory::query()->find($id);

        return Inertia::render('NeedCategories/NeedCategoriesEdit', compact('needCategory'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $needCategory = NeedCategory::query()->find($id);

        return Inertia::render('NeedCategories/NeedCategoriesEdit', compact('needCategory'));
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
        NeedCategory::query()->find($id)->update([
            'category' => $request->input('category'),
        ]);

        return Redirect::route('need_categories.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        NeedCategory::query()->find($id)->delete();

        return Redirect::route('need_categories.index');
    }
}
