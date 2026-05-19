<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(\Illuminate\Http\Request $request)
    {
        $query = BlogPost::published()
            ->with('author')
            ->latest('published_at');

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $posts = $query->paginate(9)->withQueryString();

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'filters' => $request->only(['category']),
        ]);
    }

    public function show(BlogPost $post)
    {
        if (!$post->published_at || $post->published_at > now()) {
            abort(404);
        }

        $post->load('author');

        $related = BlogPost::published()
            ->where('id', '!=', $post->id)
            ->where('category', $post->category)
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'post'    => $post,
            'related' => $related,
        ]);
    }
}
