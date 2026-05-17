<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'agent_id',
        'title',
        'slug',
        'description',
        'price',
        'address',
        'city',
        'state',
        'zip',
        'bedrooms',
        'bathrooms',
        'sqft',
        'property_type',
        'status',
        'views',
    ];

    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }

    public function images()
    {
        return $this->hasMany(PropertyImage::class);
    }

    public function inquiries()
    {
        return $this->hasMany(Inquiry::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'saved_listings');
    }

    public function primaryImage()
    {
        return $this->hasOne(PropertyImage::class)->where('is_primary', true);
    }
}
