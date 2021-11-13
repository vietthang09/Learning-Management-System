<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function update(Request $request)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $avatar = $request->file('image');
        if ($avatar) {
            Storage::delete(auth()->user()->avatar);
            DB::table('users')
                ->where('id', auth()->id())
                ->update([
                    'name' => $name,
                    'email' => $email,
                    'avatar' => $avatar->store('users'),
                ]);
        } else {
            DB::table('users')
                ->where('id', auth()->id())
                ->update([
                    'name' => $name,
                    'email' => $email,
                ]);
        }
    }
}
