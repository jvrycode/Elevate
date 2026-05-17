<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class AgentPropertyController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(function ($request, $next) {
                if (Auth::user()->role !== 'agent') {
                    abort(403, 'Unauthorized action.');
                }
                return $next($request);
            }),
        ];
    }

    public function create()
    {
        return Inertia::render('Agent/Properties/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'         => 'required|string|max:255',
            'description'   => 'required|string',
            'price'         => 'required|numeric|min:0',
            'address'       => 'required|string|max:255',
            'city'          => 'required|string|max:255',
            'state'         => 'required|string|max:255',
            'zip'           => 'required|string|max:20',
            'bedrooms'      => 'required|integer|min:0',
            'bathrooms'     => 'required|integer|min:0',
            'sqft'          => 'required|integer|min:0',
            'property_type' => 'required|string|max:255',
            'status'        => 'required|in:available,pending,sold',
            'images'        => 'nullable|array|max:10',
            'images.*'      => 'image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $property = Property::create([
            'agent_id'      => Auth::user()->agent->id,
            'title'         => $validated['title'],
            'slug'          => Str::slug($validated['title'] . '-' . uniqid()),
            'description'   => $validated['description'],
            'price'         => $validated['price'],
            'address'       => $validated['address'],
            'city'          => $validated['city'],
            'state'         => $validated['state'],
            'zip'           => $validated['zip'],
            'bedrooms'      => $validated['bedrooms'],
            'bathrooms'     => $validated['bathrooms'],
            'sqft'          => $validated['sqft'],
            'property_type' => $validated['property_type'],
            'status'        => $validated['status'],
        ]);

        // Handle image uploads
        if ($request->hasFile('images')) {
            $isPrimary = true;
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create([
                    'image_path' => '/storage/' . $path,
                    'is_primary' => $isPrimary,
                ]);
                $isPrimary = false;
            }
        } else {
            // Default placeholder
            $property->images()->create([
                'image_path' => '/images/hero.png',
                'is_primary' => true,
            ]);
        }

        return redirect()->route('dashboard')->with('success', 'Property listing created successfully.');
    }

    public function edit(Property $property)
    {
        if ($property->agent_id !== Auth::user()->agent->id) {
            abort(403);
        }

        $property->load('images');

        return Inertia::render('Agent/Properties/Edit', [
            'property' => $property,
        ]);
    }

    public function update(Request $request, Property $property)
    {
        if ($property->agent_id !== Auth::user()->agent->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title'         => 'required|string|max:255',
            'description'   => 'required|string',
            'price'         => 'required|numeric|min:0',
            'address'       => 'required|string|max:255',
            'city'          => 'required|string|max:255',
            'state'         => 'required|string|max:255',
            'zip'           => 'required|string|max:20',
            'bedrooms'      => 'required|integer|min:0',
            'bathrooms'     => 'required|integer|min:0',
            'sqft'          => 'required|integer|min:0',
            'property_type' => 'required|string|max:255',
            'status'        => 'required|in:available,pending,sold',
            'images'        => 'nullable|array|max:10',
            'images.*'      => 'image|mimes:jpeg,png,jpg,webp|max:5120',
            'remove_images' => 'nullable|array',
            'remove_images.*' => 'integer|exists:property_images,id',
        ]);

        $property->update([
            'title'         => $validated['title'],
            'description'   => $validated['description'],
            'price'         => $validated['price'],
            'address'       => $validated['address'],
            'city'          => $validated['city'],
            'state'         => $validated['state'],
            'zip'           => $validated['zip'],
            'bedrooms'      => $validated['bedrooms'],
            'bathrooms'     => $validated['bathrooms'],
            'sqft'          => $validated['sqft'],
            'property_type' => $validated['property_type'],
            'status'        => $validated['status'],
        ]);

        // Remove requested images
        if (!empty($validated['remove_images'])) {
            $toRemove = $property->images()->whereIn('id', $validated['remove_images'])->get();
            foreach ($toRemove as $img) {
                // Remove from storage if it's not the placeholder
                if (str_starts_with($img->image_path, '/storage/')) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $img->image_path));
                }
                $img->delete();
            }
        }

        // Handle new image uploads
        if ($request->hasFile('images')) {
            $hasPrimary = $property->fresh()->images()->where('is_primary', true)->exists();
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create([
                    'image_path' => '/storage/' . $path,
                    'is_primary' => !$hasPrimary,
                ]);
                $hasPrimary = true;
            }
        }

        // Ensure at least one image is marked primary
        if (!$property->fresh()->images()->where('is_primary', true)->exists()) {
            $property->images()->first()?->update(['is_primary' => true]);
        }

        return redirect()->route('dashboard')->with('success', 'Property listing updated successfully.');
    }

    public function destroy(Property $property)
    {
        if ($property->agent_id !== Auth::user()->agent->id) {
            abort(403);
        }

        // Clean up stored images
        foreach ($property->images as $img) {
            if (str_starts_with($img->image_path, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $img->image_path));
            }
        }

        $property->delete();

        return redirect()->route('dashboard')->with('success', 'Property listing deleted successfully.');
    }
}
