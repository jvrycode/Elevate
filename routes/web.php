<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\AgentPropertyController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\SavedListingController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\AgentInquiryController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ReviewController;
use Inertia\Inertia;
use App\Models\Property;

// --- Public Routes ---
Route::get('/', function () {
    $featuredProperties = Property::with('images')->latest()->take(4)->get();
    return Inertia::render('Home', [
        'featuredProperties' => $featuredProperties,
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Properties
Route::get('/properties', [PropertyController::class, 'index'])->name('properties.index');
Route::get('/properties/{property:slug}', [PropertyController::class, 'show'])->name('properties.show');
Route::post('/properties/{property}/inquire', [InquiryController::class, 'store'])->name('inquiries.store');

// Agents (public profiles)
Route::get('/agents', [AgentController::class, 'index'])->name('agents.index');
Route::get('/agents/{agent}', [AgentController::class, 'show'])->name('agents.show');

// Blog (Resources page removed per user request)
// Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
// Route::get('/blog/{post:slug}', [BlogController::class, 'show'])->name('blog.show');

// --- Authentication Routes ---
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);

    // OAuth Routes
    Route::get('/auth/google/redirect', [SocialAuthController::class, 'redirect'])->name('google.redirect');
    Route::get('/auth/google/callback', [SocialAuthController::class, 'callback'])->name('google.callback');
});

// --- Authenticated Routes ---
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Settings
    Route::get('/settings', [\App\Http\Controllers\SettingsController::class, 'index'])->name('settings.index');
    Route::patch('/settings/profile', [\App\Http\Controllers\SettingsController::class, 'updateProfile'])->name('settings.profile');
    Route::patch('/settings/preferences', [\App\Http\Controllers\SettingsController::class, 'updatePreferences'])->name('settings.preferences');
    Route::put('/settings/password', [\App\Http\Controllers\SettingsController::class, 'updatePassword'])->name('settings.password');

    // Notifications (API-like, used by React component)
    Route::get('/api/notifications', [\App\Http\Controllers\NotificationController::class, 'index']);
    Route::patch('/api/notifications/read-all', [\App\Http\Controllers\NotificationController::class, 'markAllAsRead']);
    Route::patch('/api/notifications/{id}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead']);
    Route::delete('/api/notifications/{id}', [\App\Http\Controllers\NotificationController::class, 'destroy']);

    // Saved Listings (Favorites)
    Route::post('/properties/{property}/save', [SavedListingController::class, 'toggle'])->name('listings.save');

    // Appointments (Tour Scheduling)
    Route::post('/properties/{property}/appointments', [AppointmentController::class, 'store'])->name('appointments.store');

    // Reviews
    Route::post('/agents/{agent}/reviews', [ReviewController::class, 'store'])->name('reviews.store');

    // Agent CRM Routes
    Route::prefix('agent')->name('agent.')->group(function () {
        Route::resource('properties', AgentPropertyController::class)->except(['index', 'show']);
        Route::patch('/inquiries/{inquiry}', [AgentInquiryController::class, 'update'])->name('inquiries.update');
    });
});
