<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Course;
use App\Models\RegisteredStudent;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        $courses = DB::table('courses')
            ->join('registered_students', 'registered_students.course_id', '=', 'courses.id')
            ->join('users', 'users.id', '=', 'registered_students.user_id')
            ->where('users.id', 2)->get();

        $collection = collect();

        foreach ($courses as $course) {
            $count = UserController::getAssginmentsOfCourse($course->course_id);
            $student = UserController::getStudents($course->course_id);
            $collection->push(['course' => $course, 'number' => $count, 'students' => $student]);
        }
        // dd($collection);
        $numberAssigments = UserController::countTodayAssignments();
        $assigments = UserController::getAssignments();
        // return view('home', ['collection' => $collection, 'numberAssigments' => $numberAssigments, 'assignments' => $assigments]);
        return response()->json([
            'status' => 200,
            'collection' => $collection,
            'number' => $numberAssigments,
        ]);
    }

    // public function index()
    // {
    // $list = DB::table('assignments')
    //     ->select(DB::raw('count(courses.id) as number_of_assignments, courses.course_title, users.first_name'))
    //     ->join('courses', 'courses.id', '=', 'assignments.course_id')
    //     ->join('users', 'users.id', '=', 'courses.user_id')
    //     ->join('materials', 'materials.course_id', '=', 'courses.id')
    //     ->groupBy('courses.course_title', 'users.first_name')
    //     ->get();
    // dd($list);
    // return view('home', ['list' => $list]);
    // }

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

    // Get all assignments
    static function getAssignments()
    {
        $assignments = DB::table('assignments')
            ->join('courses', 'courses.id', '=', 'assignments.course_id')
            ->join('users', 'users.id', '=', 'courses.id')
            ->get();
        return $assignments;
    }

    static function getAssginmentsOfCourse($id)
    {
        $assignments = Course::where('id', $id)->first()->assignments()->count();
        return $assignments;
    }

    static function getStudents($id)
    {
        $student = DB::table('users')
            ->join('registered_students', 'registered_students.user_id', '=', 'users.id')
            ->join('courses', 'courses.id', '=', 'registered_students.course_id')
            ->where('courses.id', $id)->count();
        return $student;
    }
}
