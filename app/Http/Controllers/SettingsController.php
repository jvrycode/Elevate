<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class SettingsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user()->load('agent');
        
        return Inertia::render('Settings/Index', [
            'user' => $user,
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$user->id],
            'phone' => ['nullable', 'string', 'max:20'],
        ];

        if ($user->role === 'agent') {
            $rules = array_merge($rules, [
                'agent.bio' => ['nullable', 'string'],
                'agent.agency_name' => ['nullable', 'string', 'max:255'],
                'agent.license_number' => ['nullable', 'string', 'max:255'],
            ]);
        }

        $validated = $request->validate($rules);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
        ]);

        if ($user->role === 'agent' && isset($validated['agent'])) {
            $user->agent()->update([
                'bio' => $validated['agent']['bio'] ?? null,
                'agency_name' => $validated['agent']['agency_name'] ?? null,
                'license_number' => $validated['agent']['license_number'] ?? null,
            ]);
        }

        return back()->with('success', 'Profile updated successfully.');
    }

    public function updatePreferences(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'preferences' => ['nullable', 'array'],
            'preferences.tour_reminders' => ['boolean'],
            'preferences.saved_search_alerts' => ['boolean'],
            'preferences.message_alerts' => ['boolean'],
        ]);

        $currentPreferences = $user->preferences ?? [];
        $newPreferences = array_merge($currentPreferences, $validated['preferences'] ?? []);

        $user->update([
            'preferences' => $newPreferences,
        ]);

        return back()->with('success', 'Preferences updated successfully.');
    }

    public function updatePassword(Request $request)
    {
        // Don't enforce current_password if google_id is set and password is null (oauth)
        $rules = [
            'password' => ['required', 'min:8', 'confirmed'],
        ];

        if ($request->user()->password) {
            $rules['current_password'] = ['required', 'current_password'];
        }

        $validated = $request->validate($rules);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Password updated successfully.');
    }
}
