<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use Inertia\Inertia;

class AgentController extends Controller
{
    public function index()
    {
        $agents = Agent::with(['user', 'reviews'])
            ->withCount('properties')
            ->get()
            ->map(function ($agent) {
                $agent->average_rating = $agent->averageRating();
                return $agent;
            });

        return Inertia::render('Agents/Index', [
            'agents' => $agents,
        ]);
    }

    public function show(Agent $agent)
    {
        $agent->load([
            'user',
            'properties.primaryImage',
            'reviews.reviewer',
        ]);
        $agent->average_rating = $agent->averageRating();

        $activeListings = $agent->properties->where('status', '!=', 'sold')->values();
        $soldListings   = $agent->properties->where('status', 'sold')->values();

        return Inertia::render('Agents/Show', [
            'agent'          => $agent,
            'activeListings' => $activeListings,
            'soldListings'   => $soldListings,
        ]);
    }
}
