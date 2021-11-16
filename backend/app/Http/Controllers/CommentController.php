<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $image = $request->input('image');
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
}
