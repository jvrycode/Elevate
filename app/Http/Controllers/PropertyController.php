<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::with(['images', 'agent.user'])
            ->where('status', '!=', 'sold');

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }
        if ($request->filled('beds')) {
            $query->where('bedrooms', '>=', $request->beds);
        }
        if ($request->filled('property_type')) {
            $query->where('property_type', $request->property_type);
        }
        if ($request->filled('city')) {
            $query->where('city', 'like', '%' . $request->city . '%');
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('bounds_s') && $request->filled('bounds_n')) {
            $query->whereBetween('latitude', [$request->bounds_s, $request->bounds_n]);
        }
        if ($request->filled('bounds_w') && $request->filled('bounds_e')) {
            $query->whereBetween('longitude', [$request->bounds_w, $request->bounds_e]);
        }

        $properties = $query->latest()->paginate(12)->withQueryString();

        // Pass the authenticated user's saved listing IDs for heart toggle state
        $savedIds = Auth::check()
            ? Auth::user()->savedListings()->pluck('property_id')->toArray()
            : [];

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'filters'    => $request->only(['min_price', 'max_price', 'beds', 'property_type', 'city', 'status', 'bounds_n', 'bounds_s', 'bounds_e', 'bounds_w']),
            'savedIds'   => $savedIds,
        ]);
    }

    public function show(Property $property)
    {
        // Increment view counter
        $property->increment('views');

        $property->load(['images', 'agent.user', 'agent.reviews.reviewer']);
        $property->agent?->append([]);
        if ($property->agent) {
            $property->agent->average_rating = $property->agent->averageRating();
        }

        // Pass saved state for this property
        $isSaved = Auth::check()
            ? Auth::user()->savedListings()->where('property_id', $property->id)->exists()
            : false;

        // Pass user's appointments for this property
        $myAppointment = Auth::check()
            ? $property->appointments()->where('user_id', Auth::id())->latest()->first()
            : null;

        return Inertia::render('Properties/Show', [
            'property'      => $property,
            'isSaved'       => $isSaved,
            'myAppointment' => $myAppointment,
        ]);
    }
}
