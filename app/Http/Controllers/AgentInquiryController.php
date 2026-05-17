<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AgentInquiryController extends Controller
{
    public function update(Request $request, Inquiry $inquiry)
    {
        // Ensure the inquiry belongs to this agent's property
        $agent = Auth::user()->agent;
        if ($inquiry->property->agent_id !== $agent->id) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:new,contacted,tour_scheduled,closed',
        ]);

        $inquiry->update(['status' => $validated['status']]);

        return back()->with('success', 'Lead status updated.');
    }
}
