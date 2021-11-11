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
        $numberAssignments = 0;
        if (auth()->user()->role == 0) {
            $numberAssignments = DB::table('assignments')
                ->select(
                    'assignments.id',
                    'assignments.course_id'
                )
                ->join(
                    'courses',
                    'courses.id',
                    'assignments.course_id'
                )
                ->join(
                    'registered_students',
                    'registered_students.course_id',
                    'courses.id'
                )
                ->where('registered_students.user_id', auth()->id())
                ->where('assignments.deadline', '<=', $current)
                ->where('assignments.deadline', '>', $yesterday)
                ->count();
        } else {
            $numberAssignments = DB::table('assignments')
                ->select(
                    'assignments.id',
                    'assignments.course_id',
                    'courses.user_id'
                )
                ->join(
                    'courses',
                    'courses.id',
                    'assignments.course_id'
                )
                ->where('courses.user_id', auth()->id())
                ->where('assignments.deadline', '<=', $current)
                ->where('assignments.deadline', '>', $yesterday)
                ->count();
        }
        if ($numberAssignments > 1) {
            return $numberAssignments . ' assignments';
        }
        return $numberAssignments . ' assignment';
    }

    public function getAllAssignmentsMini()
    {
        $assigments = null;
        if (auth()->user()->role == 0) {
            $assigments = DB::table('assignments')
                ->select(
                    'assignments.course_id',
                    'users.avatar',
                    'assignments.deadline',
                    'assignments.title as assignmentTitle',
                    'courses.title as courseTitle'
                )
                ->join('courses', 'courses.id', 'assignments.course_id')
                ->join('registered_students', 'registered_students.course_id', 'courses.id')
                ->join('users', 'users.id', 'courses.user_id')
                ->where('registered_students.user_id', auth()->id())
                ->limit(5)
                ->orderBy('deadline', 'desc')
                ->get();
        } else {
            $assigments = DB::table('assignments')
                ->select(
                    'assignments.course_id',
                    'users.avatar',
                    'assignments.deadline',
                    'assignments.title as assignmentTitle',
                    'courses.title as courseTitle'
                )
                ->join('courses', 'courses.id', 'assignments.course_id')
                ->join('users', 'users.id', 'courses.user_id')
                ->where('courses.user_id', auth()->id())
                ->limit(5)
                ->orderBy('deadline', 'desc')
                ->get();
        }
        return response()->json([
            'assignments' => $assigments,
        ]);
    }
    public function getAllAssignments()
    {
        $assigments = null;
        if (auth()->user()->role == 0) {
            $assigments = DB::table('assignments')
                ->select('assignments.course_id', 'users.avatar', 'assignments.deadline', 'assignments.assignment_title', 'courses.course_title')
                ->join('courses', 'courses.id', 'assignments.course_id')
                ->join('registered_students', 'registered_students.course_id', 'courses.id')
                ->join('users', 'users.id', 'courses.user_id')
                ->where('registered_students.user_id', auth()->id())
                ->orderBy('deadline', 'desc')
                ->get();
        } else {
            $assigments = DB::table('assignments')
                ->select('assignments.course_id', 'users.avatar', 'assignments.deadline', 'assignments.assignment_title', 'courses.course_title')
                ->join('courses', 'courses.id', 'assignments.course_id')
                ->join('users', 'users.id', 'courses.user_id')
                ->where('courses.user_id', auth()->id())
                ->orderBy('deadline', 'desc')
                ->get();
        }
        return response()->json([
            'assignments' => $assigments,
        ]);
    }
}
