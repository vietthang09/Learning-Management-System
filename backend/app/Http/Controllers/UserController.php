<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['getStudents', 'getTeachers']]);
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

    // For admin
    public function getStudents()
    {
        $students = DB::table('users')
            ->where('role', 0)
            ->paginate(10);
        return response()->json([
            'students' => $students,
        ]);
    }
    // For admin
    public function getTeachers()
    {
        $teachers = DB::table('users')
            ->where('role', 1)
            ->paginate(10);
        return response()->json([
            'teachers' => $teachers,
        ]);
    }

    // For admin
    public function addStudent(Request $request)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        DB::table('users')
            ->insert([
                'name' => $name,
                'email' => $email,
                'password' => bcrypt('password'),
                'role' => 0,
                'status' => 1,
            ]);
    }

    // For admin
    public function addTeacher(Request $request)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        DB::table('users')
            ->insert([
                'name' => $name,
                'email' => $email,
                'password' => bcrypt('password'),
                'role' => 1,
                'status' => 1,
            ]);
    }

    // For admin
    public function editUser(Request $request)
    {
        $userId = $request->input('id');
        $name = $request->input('name');
        $email = $request->input('email');
        DB::table('users')
            ->where('id', $userId)
            ->update([
                'name' => $name,
                'email' => $email,
            ]);
    }

    // For admin
    public function delete(Request $request)
    {
        $userId = $request->input('id');
        $user = DB::table('users')
            ->where('id', $userId)
            ->first();
        Storage::delete($user->avatar);
        DB::table('users')
            ->where('id', $userId)
            ->delete();
    }

    // For admin
    public function changeStatus(Request $request)
    {
        $userId = $request->input('id');
        $user = DB::table('users')
            ->where('id', $userId)
            ->first();
        $status = 1;
        if ($user->status == 1) {
            $status = 0;
        }
        DB::table('users')
            ->where('id', $userId)
            ->update([
                'status' => $status,
            ]);
    }
}
