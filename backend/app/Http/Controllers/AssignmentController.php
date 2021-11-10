<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AssignmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getNumberToday()
    {
        $current = Carbon::now();
        $yesterday = Carbon::now()->subDay();
        $numberAssignments = DB::table('assignments')
            ->select('assignments.id', 'assignments.course_id')
            ->join('courses', 'courses.id', 'assignments.course_id')
            ->join('registered_students', 'registered_students.course_id', 'courses.id')
            ->where('registered_students.user_id', auth()->id())
            ->where('deadline', '<=', $current)
            ->where('deadline', '>', $yesterday)
            ->count();
        if ($numberAssignments > 1) {
            return $numberAssignments . ' assignments';
        }
        return $numberAssignments . ' assignment';
    }

    public function getAllAssignments()
    {
        $assigments = DB::table('assignments')
            ->select('assignments.course_id', 'users.avatar', 'assignments.deadline', 'courses.course_title')
            ->join('courses', 'courses.id', 'assignments.course_id')
            ->join('registered_students', 'registered_students.course_id', 'courses.id')
            ->join('users', 'users.id', 'courses.user_id')
            ->where('registered_students.user_id', auth()->id())
            ->orderBy('deadline', 'desc')
            ->get();
        return response()->json([
            'assignments' => $assigments,
        ]);
    }
}
