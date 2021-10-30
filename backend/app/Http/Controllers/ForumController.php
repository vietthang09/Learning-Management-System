<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ForumController extends Controller
{
    public function index()
    {
        return view('posting');
    }

    public function sendData(Request $request)
    {
        $post = new Post;
        $post->user_id = $request->user_id;
        $post->content = $request->content;
        $post->image_link = $request->image_link;
        $post->file_link = $request->file_link;
        $post->created_at = now();
        $post->updated_at = now();
        $post->save();
        return redirect('posting')->with('status', 'Create Post Success!!!');
    }

    static function ForumMaster()
    {
        $collection = collect([]);
        $posts = ForumController::getPost();
        
        foreach ($posts as $post) {
            $comments = ForumController::getComment($post->id);
            $collection->push([
                'posts' => $post,
                'comments' => $comments,
            ]);
        }
        dd($collection);
    }

    static function getPost(){
        return DB::table('posts')
                ->get();     
    }

    static function getComment($post_id){
        return DB::table('comments')
                ->where('id', $post_id)
                ->get();    
    }
}
