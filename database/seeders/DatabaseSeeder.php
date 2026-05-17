<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Agent;
use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create an Admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@elevate.com',
            'role' => 'admin',
        ]);

        // Create a Client user
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'client@elevate.com',
            'role' => 'client',
        ]);

        // Create a single Agent user for testing
        $agentUser = User::factory()->create([
            'name' => 'Test Agent',
            'email' => 'agent@elevate.com',
            'role' => 'agent',
        ]);

        // Create the Agent profile and their Properties
        Agent::factory(1)->create(['user_id' => $agentUser->id])->each(function ($agent) {
            // For each agent, create 5-10 properties
            Property::factory(rand(5, 10))->create([
                'agent_id' => $agent->id,
            ])->each(function ($property) {
                
                // For each property, add 1 primary image and 2-4 gallery images
                // We'll reuse the placeholder images we already generated
                $images = [
                    '/images/hero.png',
                    '/images/thumb1.png',
                    '/images/thumb2.png',
                    '/images/footer.png',
                ];

                // Shuffle to get a random primary
                shuffle($images);

                PropertyImage::create([
                    'property_id' => $property->id,
                    'image_path' => $images[0],
                    'is_primary' => true,
                ]);

                for ($i = 1; $i < rand(3, 4); $i++) {
                    PropertyImage::create([
                        'property_id' => $property->id,
                        'image_path' => $images[$i],
                        'is_primary' => false,
                    ]);
                }
            });
        });
    }
}
