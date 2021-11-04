<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->input('userId');
        return response()->json([
            'listOfCourses' => ControllerMaster::getAllCoursesEnrolled($userId, 3),
            'listOfNewCourses' => HomeController::getNewCourses(),
            'numberOfAssigmentsToday' => HomeController::countTodayAssignments(),
            'listOfAssignments' => HomeController::getAllAssignments($userId),
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
            ->get()
            ->count();
        return $numberAssignments;
    }

    // Get new courses
    static function getNewCourses()
    {
        $courses = DB::table('courses')
            ->select('id', 'course_title', 'course_cover', 'public', 'user_id')
            ->where('public', 0)
            ->get();
        $collectionOfNewCourses = collect();
        foreach ($courses as $course) {
            $teacherName = ControllerMaster::getUserNameById($course->user_id);
            $numberOfStudents = ControllerMaster::countStudentsOfCourse($course->id);
            $collectionOfNewCourses->push([
                'course' => $course,
                'teacherName' => $teacherName,
                'numberOfStudents' => $numberOfStudents,
            ]);
        }
        return $collectionOfNewCourses;
    }

    static function getAllAssignments($userId)
    {
        $assigments = DB::table('assignments')
            ->select('assignments.id', 'assignments.course_id')
            ->join('courses', 'courses.id', 'assignments.course_id')
            ->join('registered_students', 'registered_students.course_id', 'courses.id')
            ->where('registered_students.user_id', $userId)
            ->orderBy('deadline', 'desc')
            ->get();
        return $assigments;
    }
}
