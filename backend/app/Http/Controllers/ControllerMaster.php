<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Support\Facades\DB;

class ControllerMaster extends Controller
{

    static function getAllCoursesEnrolled($userId, $limit)
    {

        $courses = null;
        if ($limit == 0) {
            $courses = DB::table('courses')
                ->select(
                    'course_id',
                    'course_title',
                    'course_cover',
                    'public',
                    'courses.user_id',
                    'users.name as teacherName',
                    'users.avatar as teacherAvatar',
                    DB::raw("(SELECT COUNT(id) FROM registered_students WHERE registered_students.course_id = courses.id) as numberOfStudents"),
                    DB::raw("(SELECT COUNT(id) FROM materials WHERE materials.course_id = courses.id) as numberOfMaterials"),
                    DB::raw("(SELECT COUNT(id) FROM assignments WHERE assignments.course_id = courses.id) as numberOfAssignments"),
                )
                ->join('registered_students', 'registered_students.course_id', '=', 'courses.id')
                ->join('users', 'users.id', 'courses.user_id')
                ->where('public', 1)
                ->where('registered_students.user_id', $userId)
                ->orderBy('registered_students.updated_at', 'desc')
                ->get();
        } else {
            
        }
        return $courses;
    }

    // Get course teaching by teacher
    static function getCoursesIsBeingTaught($teacherId, $limit)
    {
        $courses = null;
        if ($limit == 0) {
            $courses = DB::table('courses')
                ->select(
                    'courses.id as course_id',
                    'course_title',
                    'course_cover',
                    'public',
                    'courses.user_id',
                    'users.id',
                    'users.name as teacherName',
                    'users.avatar as teacherAvatar',
                    DB::raw("(SELECT COUNT(id) FROM registered_students WHERE registered_students.course_id = courses.id) as numberOfStudents"),
                    DB::raw("(SELECT COUNT(id) FROM materials WHERE materials.course_id = courses.id) as numberOfMaterials"),
                    DB::raw("(SELECT COUNT(id) FROM assignments WHERE assignments.course_id = courses.id) as numberOfAssignments"),
                )
                ->join('users', 'users.id', 'courses.user_id')
                ->where('courses.user_id', $teacherId)
                ->where('courses.public', 1)
                ->orderBy('courses.updated_at', 'desc')
                ->get();
        } else {
            
        }
        return $courses;
    }

    // Get course by id
    static function getCourseById($courseId)
    {
        $course = Course::where('id', $courseId)->first();
        return $course;
    }

    // Get assignments by course id
    static function getAssginmentsByCourseId($courseId)
    {
        $assignments = DB::table('assignments')
            ->where('course_id', $courseId)
            ->get();
        return $assignments;
    }


    // Get materials by course id
    static function getMaterialsByCourseId($courseId)
    {
        $materials = DB::table('materials')
            ->select('materials.id', 'material_title', 'material_content', 'fileName')
            ->join('courses', 'courses.id', '=', 'materials.course_id')
            ->where('courses.id', $courseId)
            ->get();
        return $materials;
    }
}
