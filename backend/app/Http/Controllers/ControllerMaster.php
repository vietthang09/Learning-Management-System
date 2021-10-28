<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ControllerMaster extends Controller
{

    static function getCourses($userId)
    {
        $user_id = 2;
        $courses = DB::table('courses')
            ->join('registered_students', 'registered_students.course_id', '=', 'courses.id')
            ->join('users', 'users.id', '=', 'registered_students.user_id')
            ->where('users.id', $user_id)->get();

        $collection = collect();

        foreach ($courses as $course) {
            $countAssignments = ControllerMaster::countAssginments($course->course_id);
            $countStudents = ControllerMaster::countStudents($course->course_id);
            $countMaterials = ControllerMaster::countMaterials($course->course_id);
            $teacherName = ControllerMaster::getTeacherName($user_id);
            $collection->push(['course' => $course, 'countAssignments' => $countAssignments, 'countStudents' => $countStudents, 'countMaterials' => $countMaterials, 'teacherName' => $teacherName]);
        }
        return $collection;
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

    // Get teacher of courses
    static function getTeacherName($id)
    {
        $teacher = DB::table('users')
            ->join('courses', 'courses.user_id', '=', 'users.id')
            ->where('courses.id', '=', $id)
            ->first();
        $teacherName = $teacher->first_name . " " . $teacher->last_name;
        return $teacherName;
    }

    static function countAssginments($id)
    {
        $assignments = Course::where('id', $id)->first()->assignments()->count();
        return $assignments;
    }

    static function countStudents($id)
    {
        $student = DB::table('users')
            ->join('registered_students', 'registered_students.user_id', '=', 'users.id')
            ->join('courses', 'courses.id', '=', 'registered_students.course_id')
            ->where('courses.id', $id)->count();
        return $student;
    }

    static function countMaterials($id)
    {
        $materials = DB::table('materials')
            ->join('courses', 'courses.id', '=', 'materials.course_id')
            ->where('courses.id', $id)->count();
        return $materials;
    }
}
