<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Notifications\NewInquiryNotification;

class InquiryController extends Controller
{
    public function store(Request $request, Property $property)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        $inquiry = Inquiry::create([
            'property_id' => $property->id,
            'user_id' => Auth::id(), // Nullable if guest
            'name' => $validated['name'],
            'email' => $validated['email'],
            'message' => $validated['message'],
        ]);

        if ($property->agent && $property->agent->user) {
            $property->agent->user->notify(new NewInquiryNotification($inquiry));
        }

        return back()->with('success', 'Your inquiry has been sent successfully.');
    }
}
