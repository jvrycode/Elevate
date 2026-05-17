<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Notifications\NewTourRequestNotification;

class AppointmentController extends Controller
{
    public function store(Request $request, Property $property)
    {
        $validated = $request->validate([
            'scheduled_at' => 'required|date|after:now',
            'notes'        => 'nullable|string|max:500',
        ]);

        $appointment = Appointment::create([
            'property_id'  => $property->id,
            'user_id'      => Auth::id(),
            'agent_id'     => $property->agent_id,
            'scheduled_at' => $validated['scheduled_at'],
            'status'       => 'requested',
        ]);

        if ($property->agent && $property->agent->user) {
            $property->agent->user->notify(new NewTourRequestNotification($appointment));
        }

        return back()->with('success', 'Your tour has been scheduled! The agent will confirm shortly.');
    }
}
