<?php

use App\Http\Controllers\DisabilityController;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\NeedCategoryController;
use App\Http\Controllers\NeedController;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\RecipientController;
use App\Models\Recipient;
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
        Route::get('/recipients/{id}/parents', [RecipientController::class, 'addParents'])->name('recipients.parents.add');
        Route::get('/recipients/{id}/disabilities', [RecipientController::class, 'addDisabilities'])->name('recipients.disabilities.add');
        Route::post('/recipients/{id}/parents', [RecipientController::class, 'storeParents'])->name('recipients.parents.store');
        Route::post('/recipients/{id}/disabilities', [RecipientController::class, 'storeDisabilities'])->name('recipients.disabilities.store');
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
        Route::resource('need_categories', NeedCategoryController::class);
        Route::resource('parents', ParentController::class);
        Route::get('/home', function () {
            $recipients = Recipient::query()->with(['parents', 'disabilities'])->get();

            return Inertia::render('Home', compact('recipients'));
        });
        Route::get('/profile', function () {
            return Inertia::render('Profile');
        });
    });
});

require __DIR__.'/auth.php';
