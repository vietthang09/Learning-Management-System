<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 200,
            'collection' => ControllerMaster::getCourses(2),
            'newCourses' => ControllerMaster::getNewCourses(),
            'countTodayAssigments' => UserController::countTodayAssignments(),
            'assignments' => ControllerMaster::getAssignments(),
        ]);
    }

    // Get number of today assignmentss
    static function countTodayAssignments()
    {
        $current = Carbon::now();
        $yesterday = Carbon::now()->subDay();
        $numberAssignments = DB::table('assignments')
            ->join('courses', 'courses.id', '=', 'assignments.course_id')
            ->join('users', 'users.id', '=', 'courses.id')
            ->where('deadline', '<=', $current)
            ->where('deadline', '>', $yesterday)
            ->get()->count();
        return $numberAssignments;
    }
}
