<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    public function getPosts()
    {
        $posts = DB::table('posts')
            ->select('id')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json([
            'posts' => $posts,
        ]);
    }
    public function getPost($postId)
    {
        $post = DB::table('posts')
            ->where('posts.id', $postId)
            ->first();
        $created_at = Carbon::create($post->created_at, 'Asia/Ho_Chi_Minh');
        return response()->json([
            'post' => $post,
            // 'userName' => ControllerMaster::getNameByUserId($post->user_id),
            'createdAt' => $created_at->diffForHumans(),
        ]);
    }

    public function newPost(Request $request)
    {
        $filePath = $request->file('file')->store('forum');
        DB::table('posts')->insert([
            'user_id' => 2,
            'content' => $request->input('content'),
            'image_path' => $filePath,
            'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
        ]);
    }
}
