<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 200,
            'collection' => ControllerMaster::getCourses(2),
            'countTodayAssigments' => UserController::countTodayAssignments(),
            'assignments' => ControllerMaster::getAssignments(),
        ]);
    }

    // Get number of today assignmentss
    static function countTodayAssignments()
    {
        $numberAssignments = DB::table('assignments')
            ->join('courses', 'courses.id', '=', 'assignments.course_id')
            ->join('users', 'users.id', '=', 'courses.id')
            ->where('deadline', '<=', date("Y/m/d"))
            ->get()->count();
        return $numberAssignments;
    }
}
