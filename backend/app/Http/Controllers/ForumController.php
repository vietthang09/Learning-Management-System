<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
                'posts.id as postId',
                'users.avatar as authorAvatar',
                'users.name as authorName',
                'posts.created_at as createdAt',
                'posts.content as content',
                'posts.image as filePath',
            )
            ->join('users', 'users.id', 'posts.user_id')
            ->orderBy('posts.created_at', 'desc')
            ->get();
        return response()->json([
            'posts' => $posts,
        ]);
    }
    public function create(Request $request)
    {
        $content = $request->input('content');
        $image = $request->file('image');
        if ($image) {
            DB::table('posts')
                ->insert([
                    'user_id' => auth()->id(),
                    'content' => $content,
                    'image' => $image->store('forum'),
                    'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                ]);
        } else {
            DB::table('posts')
                ->insert([
                    'user_id' => auth()->id(),
                    'content' => $content,
                    'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                ]);
        }
    }
    public function delete(Request $request)
    {
        $id = $request->input('id');
        $post = DB::table('posts')
            ->where('id', $id)
            ->first();
        Storage::delete($post->image);
        DB::table('posts')
            ->where('id', $id)
            ->delete();
    }

    public function getPost(Request $request)
    {
        $id = $request->input('id');
        $post = DB::table('posts')
            ->where('id', $id)
            ->first();
        return response()->json([
            'post' => $post,
        ]);
    }
}
