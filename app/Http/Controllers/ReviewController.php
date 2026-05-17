<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request, Agent $agent)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'body'   => 'required|string|min:20|max:1000',
        ]);

        // Prevent duplicate reviews from the same user for the same agent
        $existing = Review::where('agent_id', $agent->id)
            ->where('reviewer_id', Auth::id())
            ->first();

        if ($existing) {
            return back()->withErrors(['body' => 'You have already submitted a review for this agent.']);
        }

        Review::create([
            'agent_id'    => $agent->id,
            'reviewer_id' => Auth::id(),
            'rating'      => $validated['rating'],
            'body'        => $validated['body'],
        ]);

        return back()->with('success', 'Thank you for your review!');
    }
}
