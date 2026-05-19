<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Agent>
 */
class AgentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->state(['role' => 'agent']),
            'license_number' => $this->faker->unique()->numerify('LIC-########'),
            'phone' => $this->faker->phoneNumber(),
            'bio' => $this->faker->realText(200),
            'agency_name' => $this->faker->company() . ' Real Estate',
        ];
    }
}
