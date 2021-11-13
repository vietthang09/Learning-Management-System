<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ForumController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getPosts()
    {
        $posts = DB::table('posts')
            ->select(
                'users.id as authorId',
                'users.avatar as authorAvatar',
                'users.name as authorName',
                'posts.created_at as createdAt',
                'posts.content as content',
                'posts.image as filePath',
            )
            ->join('users', 'users.id', 'posts.user_id')
            ->get();
        return response()->json([
            'posts' => $posts,
        ]);
    }
}
