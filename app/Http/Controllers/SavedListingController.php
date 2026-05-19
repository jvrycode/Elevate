<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SavedListingController extends Controller
{
    public function toggle(Property $property)
    {
        $user = Auth::user();

        if ($user->savedListings()->where('property_id', $property->id)->exists()) {
            $user->savedListings()->detach($property->id);
        } else {
            $user->savedListings()->attach($property->id);
        }

        return back();
    }
}
