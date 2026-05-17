<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'agent') {
            $user->load([
                'agent.properties.inquiries.user',
                'agent.properties.images',
                'agent.appointments.property',
                'agent.appointments.user',
                'agent.transactions',
            ]);

            // Attach analytics
            $agent = $user->agent;
            $totalViews = $agent->properties->sum('views');
            $totalInquiries = $agent->properties->flatMap(fn($p) => $p->inquiries)->count();
            $upcomingAppointments = $agent->appointments
                ->where('scheduled_at', '>', now())
                ->where('status', '!=', 'cancelled')
                ->sortBy('scheduled_at')
                ->values();

            return Inertia::render('Agent/Dashboard', [
                'user'                 => $user,
                'analytics'            => [
                    'total_views'     => $totalViews,
                    'total_inquiries' => $totalInquiries,
                    'active_listings' => $agent->properties->where('status', '!=', 'sold')->count(),
                    'upcoming_tours'  => $upcomingAppointments->count(),
                ],
                'upcomingAppointments' => $upcomingAppointments,
            ]);
        }

        // Default Client Dashboard
        $user->load([
            'savedListings.images',
            'appointments.property.images',
            'appointments.agent.user',
            'inquiries.property',
        ]);

        return Inertia::render('Dashboard', [
            'user'          => $user,
            'savedListings' => $user->savedListings,
            'appointments'  => $user->appointments->sortBy('scheduled_at')->values(),
            'inquiries'     => $user->inquiries->sortByDesc('created_at')->values(),
        ]);
    }
}
