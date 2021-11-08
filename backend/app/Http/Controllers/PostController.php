<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Dflydev\DotAccessData\Exception\DataException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
            'status' => 200,
        ]);
    }
    public function getPost($postId)
    {
        $post = DB::table('posts')
            ->join('users', 'users.id', 'posts.user_id')
            ->where('posts.id', $postId)
            ->first();
        $created_at = Carbon::create($post->created_at, 'Asia/Ho_Chi_Minh');
        return response()->json([
            'post' => $post,
            'createdAt' => $created_at->diffForHumans(),
        ]);
    }

    public function newPost(Request $request)
    {
        $userId = $request->input('user_id');
        $filePath = $request->file('file')->store('forum');
        DB::table('posts')->insert([
            'user_id' => $userId,
            'content' => $request->input('content'),
            'image_path' => $filePath,
            'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
        ]);
    }

    public function deletePost(Request $request)
    {
        $postId = $request->input('postId');
        try {
            DB::table('posts')
                ->where('id', $postId)
                ->delete();
            return response()->json([
                'status' => 201,
            ]);
        } catch (DataException $de) {
            return response()->json([
                'status' => $de,
            ]);
        }
    }

    public function getComments(Request $request)
    {
        $postId = $request->input('postId');
        $comments = DB::table('comments')
            ->select('comments.id as commentId', 'comments.content', 'comments.user_id', 'comments.image_link', 'comments.created_at', 'users.id', 'users.name',)
            ->join('users', 'users.id', 'comments.user_id')
            ->where('post_id', $postId)
            ->get();
        return response()->json([
            'status' => 201,
            'comments' => $comments,
        ]);
    }

    public function postComment(Request $request)
    {
        $userId = $request->input('userId');
        $postId = $request->input('postId');
        $content = $request->input('content');
        $file = $request->file('image');
        $filePath = null;
        if ($file == null) {
            DB::table('comments')
                ->insert([
                    'user_id' => $userId,
                    'post_id' => $postId,
                    'content' => $content,
                    'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                ]);
        } else {
            $filePath = $request->file('image')->store('forum');
            DB::table('comments')
                ->insert([
                    'user_id' => $userId,
                    'post_id' => $postId,
                    'content' => $content,
                    'image_link' => $filePath,
                    'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                ]);
        }

        return response()->json([
            'status' => 201,
        ]);
    }

    public function deleteComment(Request $request)
    {
        $commentId = $request->input('commentId');
        $comment = DB::table('comments')
            ->where('id', $commentId)
            ->first();
        Storage::delete($comment->image_link);
        DB::table('comments')
            ->where('id', $commentId)
            ->delete();
        return response()->json([
            'status' => 201,
        ]);
    }
}
