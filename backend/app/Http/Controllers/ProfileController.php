<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function getUser(Request $request)
    {
        $userId = $request->input('userId');
        $user = User::find($userId);
        return response()->json([
            'status' => 201,
            'user' => $user,
        ]);
    }
    public function editUser(Request $request)
    {
        $id = $request->input('id');
        $name = $request->input('name');
        $email = $request->input('email');
        $user = User::find($id);
        $user->name = $name;
        $user->email = $email;
        $user->save();
        return response()->json([
            'status' => 201,
        ]);
    }
}
