<?php

namespace Database\Factories;

use App\Models\Agent;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $projectNames = [
            'The Pinnacle', 'One River Point', 'Lumina Towers', 'Aria Estates', 
            'The Continuum', 'Elysian Heights', 'Grand Oakhaven', 'Azure Condominiums', 
            'The Residences at Westridge', 'Silverpine Manor', 'Crestview Terrace', 
            'Harbor Villas', 'Nova Lofts', 'Royal Plaza Estates', 'The Monarch', 
            'Vanguard Tower', 'The Meridian', 'Paramount Residences', 'Solstice Heights', 
            'The Opus', 'Ascent at Roebling', 'The Belvedere', 'Astoria Penthouse', 
            'The Cosmopolitan', 'Horizon Estate'
        ];
        
        $title = $this->faker->randomElement($projectNames) . ' ' . $this->faker->randomElement(['I', 'II', 'Residences', 'Estate', 'Villas', '']);
        $title = trim($title);
        
        $descPool = [
            "Experience unparalleled luxury in this stunning property located in the heart of the city. Featuring modern amenities and breathtaking views, this home offers the perfect blend of comfort and elegance.",
            "This magnificent residence boasts expansive living spaces, high-end finishes, and an abundance of natural light. Perfect for entertaining, the open-concept layout flows seamlessly into a beautifully landscaped outdoor oasis.",
            "Step into this beautifully designed home, where every detail has been meticulously crafted. Enjoy a gourmet kitchen, spacious master suite, and top-of-the-line appliances that make everyday living a joy.",
            "A rare opportunity to own a piece of architectural brilliance. This exclusive property features state-of-the-art smart home technology, a private pool, and unparalleled privacy in a prestigious neighborhood.",
            "Discover your dream home in this highly sought-after community. With its modern design, premium materials, and convenient access to local amenities, this property is the epitome of luxurious living.",
            "This immaculate property offers resort-style living with its expansive floor plan, high ceilings, and designer touches throughout. Enjoy a seamless indoor-outdoor lifestyle perfect for both relaxation and entertaining."
        ];
        $description = $this->faker->randomElement($descPool) . "\n\n" . $this->faker->randomElement($descPool);

        return [
            'agent_id' => Agent::factory(),
            'title' => ucwords($title),
            'slug' => Str::slug($title . ' ' . $this->faker->unique()->numberBetween(100, 999)),
            'description' => $description,
            'price' => $this->faker->numberBetween(500000, 5000000),
            'address' => $this->faker->streetAddress(),
            'city' => $this->faker->city(),
            'state' => $this->faker->stateAbbr(),
            'zip' => $this->faker->postcode(),
            'latitude' => $this->faker->latitude(40.5, 40.9),
            'longitude' => $this->faker->longitude(-74.3, -73.7),
            'bedrooms' => $this->faker->numberBetween(2, 7),
            'bathrooms' => $this->faker->numberBetween(2, 6),
            'sqft' => $this->faker->numberBetween(1500, 10000),
            'property_type' => $this->faker->randomElement(['House', 'Condo', 'Townhouse']),
            'status' => $this->faker->randomElement(['available', 'available', 'available', 'pending', 'sold']),
        ];
    }
}
