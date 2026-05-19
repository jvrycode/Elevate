<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->create(['role' => 'admin']);

        $posts = [
            [
                'title' => 'The Future of Luxury Real Estate in 2026',
                'category' => 'Market Analysis',
                'excerpt' => 'An in-depth look at emerging trends, changing demographics, and the new amenities defining ultra-luxury properties this year.',
                'content' => 'The luxury real estate market is undergoing a massive transformation. As we look towards 2026, buyers are prioritizing wellness amenities, sustainable architecture, and integrated smart home technology over sheer square footage. The definition of luxury is shifting from conspicuous consumption to highly curated, experiential living spaces.',
                'cover_image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
            ],
            [
                'title' => 'Mastering the Art of the Off-Market Deal',
                'category' => 'Buying Guides',
                'excerpt' => 'Why the best properties never hit the public market, and how our exclusive network gives you access to the unlisted.',
                'content' => 'Finding the perfect property often means looking beyond the MLS. Off-market deals, also known as pocket listings, are becoming increasingly common in the ultra-luxury segment. Our agents maintain an exclusive network of high-net-worth individuals and developers to connect you with these hidden gems before they ever reach the public eye.',
                'cover_image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
            ],
            [
                'title' => 'Modern Coastal Architecture Trends',
                'category' => 'Architecture',
                'excerpt' => 'Exploring how top architects are blending indoor and outdoor spaces to create seamless coastal living experiences.',
                'content' => 'Coastal architecture is moving away from traditional nautical themes and embracing a sleek, minimalist aesthetic. Floor-to-ceiling glass, natural materials like stone and reclaimed wood, and seamless indoor-outdoor transitions are defining the new wave of beachfront living. The goal is to let the surrounding environment speak for itself.',
                'cover_image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
            ],
            [
                'title' => 'Navigating High-Interest Rate Markets',
                'category' => 'Market Analysis',
                'excerpt' => 'Strategies for luxury buyers and investors to maximize purchasing power in a fluctuating economic landscape.',
                'content' => 'Navigating high-interest rate environments requires strategic planning. Cash buyers hold significant leverage, while those financing can benefit from exploring creative structures or focusing on emerging markets with strong appreciation potential. We analyze the macro-economic factors to ensure your investment remains sound and profitable.',
                'cover_image' => 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
            ],
            [
                'title' => 'The Rise of Smart Home Ecosystems',
                'category' => 'Technology',
                'excerpt' => 'How integrated AI and automated ecosystems are becoming standard expectations in eight-figure homes.',
                'content' => 'The modern smart home goes far beyond voice-controlled lighting. We are seeing fully integrated ecosystems that learn your habits, optimize energy consumption, and manage security seamlessly, all controlled from a centralized, intuitive interface. True luxury is having a home that anticipates your needs.',
                'cover_image' => 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop',
            ],
            [
                'title' => 'Top Up-and-Coming Luxury Neighborhoods',
                'category' => 'Neighborhoods',
                'excerpt' => 'We spotlight five exclusive enclaves that are seeing unprecedented growth and demand this season.',
                'content' => 'While established luxury zip codes always hold their value, savvy investors are looking at emerging neighborhoods on the periphery. These areas offer stunning architectural opportunities and strong community planning, positioning them as the highly sought-after enclaves of tomorrow. Here are the top five neighborhoods to watch.',
                'cover_image' => 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop',
            ],
        ];

        foreach ($posts as $index => $postData) {
            BlogPost::create([
                'user_id' => $admin->id,
                'title' => $postData['title'],
                'slug' => Str::slug($postData['title']),
                'category' => $postData['category'],
                'excerpt' => $postData['excerpt'],
                'body' => $postData['content'],
                'cover_image' => $postData['cover_image'],
                'published_at' => now()->subDays($index * 2), // Stagger publication dates
            ]);
        }
    }
}
