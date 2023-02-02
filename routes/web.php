<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\DisabilityController;
use App\Http\Controllers\DonationController;
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

Route::middleware(['auth'])->group(function () {
    Route::middleware('role:1')->group(function () {
//        Route::prefix('admin')->name('admin.')->group(function () {
//        Route::prefix('admin')->group(function () {
            Route::get('/dashboard', function () {
                return Inertia::render('Dashboard');
            })->middleware(['auth', 'verified'])->name('dashboard');

            Route::get('/recipients/{id}/parents', [RecipientController::class, 'addParents'])->name('recipients.parents.add');
            Route::post('/recipients/{id}/parents', [RecipientController::class, 'storeParents'])->name('recipients.parents.store');
            Route::get('/recipients/{id}/disabilities', [RecipientController::class, 'addDisabilities'])->name('recipients.disabilities.add');
            Route::post('/recipients/{id}/disabilities', [RecipientController::class, 'storeDisabilities'])->name('recipients.disabilities.store');
            Route::get('/recipients/{id}/needs', [RecipientController::class, 'addNeeds'])->name('recipients.needs.add');
            Route::post('/recipients/{id}/needs', [RecipientController::class, 'storeNeeds'])->name('recipients.needs.store');
            Route::get('/recipients/{id}/needs', [RecipientController::class, 'addNeeds'])->name('recipients.needs.add');
            Route::post('/recipients/{id}/update', [RecipientController::class, 'update'])->name('recipients.update');
            Route::resource('recipients', RecipientController::class)->except([
                'index', 'show', 'update'
            ]);
            Route::resource('donors', DonorController::class)->except([
                'show', 'edit', 'update'
            ]);
            Route::post('/donors/{id}/accept', [DonorController::class, 'accept'])->name('donors.accept');
            Route::post('/donors/{id}/reject', [DonorController::class, 'reject'])->name('donors.reject');
            Route::resource('admins', AdminController::class);
            Route::resource('needs', NeedController::class)->except([
                'update'
            ]);
            Route::post('/needs/{id}/update', NeedController::class)->name('needs.update');
            Route::get('/donations', [DonationController::class, 'index'])->name('donations.index');
            Route::get('/donations/create', [DonationController::class, 'create'])->name('donations.create');
            Route::post('/donations/create', [DonationController::class, 'store'])->name('donations.store');
            Route::get('/donations/{id}', [DonationController::class, 'show'])->name('donations.show');
            Route::get('/donations/{id}/edit', [DonationController::class, 'edit'])->name('donations.edit');
            Route::post('/donations/{id}/update', [DonationController::class, 'update'])->name('donations.update');
            Route::post('/donations/{id}/accept', [DonationController::class, 'accept'])->name('donations.accept');
            Route::post('/donations/{id}/reject', [DonationController::class, 'reject'])->name('donations.reject');
            Route::resource('disabilities', DisabilityController::class);
            Route::resource('need_categories', NeedCategoryController::class);
            Route::resource('parents', ParentController::class);
        });
//    });

    Route::middleware('role:1,2')->group(function () {
        Route::resource('recipients', RecipientController::class)->only([
            'index'
        ]);
        Route::resource('donors', DonorController::class)->only([
            'show', 'edit', 'update'
        ]);
        Route::get('/recipients/{recipientID}/donate/{needID}', [RecipientController::class, 'addDonation'])->name('recipients.donate.add');
        Route::post('/recipients/{recipientID}/donate/{needID}', [RecipientController::class, 'storeDonation'])->name('recipients.donate.store');
    });

    Route::middleware('role:1,2,3')->group(function () {
        Route::resource('recipients', RecipientController::class)->only([
            'show'
        ]);
        Route::get('/donasi/{id}/verifikasi', [DonationController::class, 'showVerification'])->name('donation.verification.show');
        Route::post('/donasi/{id}/verifikasi', [DonationController::class, 'verify'])->name('donation.verification.verify');
        Route::get('/beranda', [Controller::class, 'home'])->name('home');
        Route::get('/donasi', [Controller::class, 'donations']);
        Route::get('/profil', [Controller::class, 'profile']);
        Route::get('/needs/{id}/message', [RecipientController::class, 'showMessage'])->name('needs.message.show');
        Route::post('/needs/{id}/message', [RecipientController::class, 'postMessage'])->name('needs.message.post');
    });

    Route::get('/donor/verifikasi', [DonorController::class, 'notVerified'])->name('donor.unverified');
});

require __DIR__.'/auth.php';
