<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ControllerMaster;
use App\Http\Controllers\Student\HomeController as StudentHomeController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->input('userId');
        return response()->json([
            'listOfCourses' => ControllerMaster::getCoursesIsBeingTaught($userId, 3),
            'listOfNewCourses' => StudentHomeController::getNewCourses(),
            'numberOfAssigmentsToday' => HomeController::countTodayAssignments($userId),
            'listOfAssignments' => HomeController::getAllAssignments($userId),
        ]);
    }

    static function countTodayAssignments($teacherId)
    {
        $current = Carbon::now();
        $yesterday = Carbon::now()->subDay();
        $numberAssignments = DB::table('assignments')
            ->select('assignments.id', 'assignments.course_id')
            ->join('courses', 'courses.id', 'assignments.course_id')
            ->where('courses.user_id', $teacherId)
            ->where('deadline', '<=', $current)
            ->where('deadline', '>', $yesterday)
            ->get()
            ->count();
        if ($numberAssignments > 1) {
            return $numberAssignments . ' assignments';
        }
        return $numberAssignments . ' assignment';
    }

    static function getAllAssignments($teacherId)
    {
        $assigments = DB::table('assignments')
            ->select('assignments.id', 'assignments.course_id')
            ->join('courses', 'courses.id', 'assignments.course_id')
            ->where('courses.user_id', $teacherId)
            ->orderBy('deadline', 'desc')
            ->get();
        return $assigments;
    }
}
