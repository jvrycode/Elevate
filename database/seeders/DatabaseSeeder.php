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

        $team = [
            [
                'name' => 'James Sterling',
                'email' => 'james@elevate.com',
                'title' => 'Founder & Principal',
                'avatar' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'name' => 'Elena Rostova',
                'email' => 'elena@elevate.com',
                'title' => 'Head of Acquisitions',
                'avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'name' => 'Michael Chen',
                'email' => 'michael@elevate.com',
                'title' => 'Luxury Specialist',
                'avatar' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'name' => 'Sarah Jenkins',
                'email' => 'sarah@elevate.com',
                'title' => 'Client Relations',
                'avatar' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
            ]
        ];

        foreach ($team as $member) {
            $user = User::factory()->create([
                'name' => $member['name'],
                'email' => $member['email'],
                'role' => 'agent',
            ]);

            Agent::factory()->create([
                'user_id' => $user->id,
                'agency_name' => $member['title'],
                'avatar' => $member['avatar']
            ])->each(function ($agent) {
                // For each agent, create 4-8 properties
                Property::factory(rand(4, 8))->create([
                    'agent_id' => $agent->id,
                ])->each(function ($property) {
                    
                    $allImages = [
                        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?q=80&w=1600&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600&auto=format&fit=crop',
                        '/images/hero.png',
                    ];

                    shuffle($allImages);

                    PropertyImage::create([
                        'property_id' => $property->id,
                        'image_path' => $allImages[0],
                        'is_primary' => true,
                    ]);

                    for ($i = 1; $i < rand(3, 5); $i++) {
                        PropertyImage::create([
                            'property_id' => $property->id,
                            'image_path' => $allImages[$i],
                            'is_primary' => false,
                        ]);
                    }
                });
            });
        }
    }
}
