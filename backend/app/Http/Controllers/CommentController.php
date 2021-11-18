<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getComments(Request $request)
    {
        $postId = $request->input('id');
        $comments = DB::table('comments')
            ->select(
                'users.id as authorId',
                'users.name as authorName',
                'users.avatar as authorAvatar',
                'comments.id as commentId',
                'comments.content',
                'comments.image',
                'comments.created_at as createdAt',
            )
            ->join('users', 'users.id', 'comments.user_id')
            ->where('post_id', $postId)
            ->get();
        return response()->json([
            'comments' => $comments,
        ]);
    }

    public function create(Request $request)
    {
        $postId = $request->input('postId');
        $content = $request->input('content');
        $image = $request->file('image');
        if ($image) {
            DB::table('comments')
                ->insert([
                    'post_id' => $postId,
                    'user_id' => auth()->id(),
                    'content' => $content,
                    'image' => $image->store('forum'),
                    'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                ]);
        } else {
            DB::table('comments')
                ->insert([
                    'post_id' => $postId,
                    'user_id' => auth()->id(),
                    'content' => $content,
                    'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                ]);
        }
    }

    public function delete(Request $request)
    {
        $commentId = $request->input('id');
        $comment = DB::table('comments')
            ->where('id', $commentId)
            ->first();
        if ($comment->image) {
            Storage::delete($comment->image);
        }
        DB::table('comments')
            ->where('id', $commentId)
            ->delete();
    }
}
