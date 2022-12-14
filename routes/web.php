<?php

use App\Http\Controllers\DisabilityController;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\NeedController;
use App\Http\Controllers\RecipientController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::middleware('role:1')->group(function () {
        Route::resource('recipients', RecipientController::class)->except([
            'index', 'show'
        ]);
        Route::resource('donors', DonorController::class)->except([
            'show', 'edit', 'update'
        ]);
        Route::resource('needs', NeedController::class);
    });

    Route::middleware('role:1,2')->group(function () {
        Route::resource('recipients', RecipientController::class)->only([
            'index'
        ]);
        Route::resource('donors', DonorController::class)->only([
            'show', 'edit', 'update'
        ]);
    });

    Route::middleware('role:1,2,3')->group(function () {
        Route::resource('recipients', RecipientController::class)->only([
            'show'
        ]);
        Route::resource('disabilities', DisabilityController::class);
    });
});

require __DIR__.'/auth.php';
