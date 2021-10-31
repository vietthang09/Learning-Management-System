<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ControllerMaster extends Controller
{

    static function getCourses($userId)
    {
        $user_id = 2;
        $courses = DB::table('courses')
            ->select('course_id', 'course_title', 'course_cover', 'public')
            ->join('registered_students', 'registered_students.course_id', '=', 'courses.id')
            ->join('users', 'users.id', '=', 'registered_students.user_id')
            ->where('public', 1)
            ->where('users.id', $user_id)->limit(3)->get();
        $collection = collect();
        foreach ($courses as $course) {
            $countAssignments = ControllerMaster::countAssginments($course->course_id);
            $countStudents = ControllerMaster::countStudents($course->course_id);
            $countMaterials = ControllerMaster::countMaterials($course->course_id);
            $teacherName = ControllerMaster::getTeacherByCourseId($course->course_id);
            $collection->push(['course' => $course, 'countAssignments' => $countAssignments, 'countStudents' => $countStudents, 'countMaterials' => $countMaterials, 'teacherName' => $teacherName]);
        }
        return $collection;
    }

    // Get new courses
    static function getNewCourses()
    {
        $courses = DB::table('courses')
            ->select('id', 'course_title', 'course_cover', 'public')
            ->where('public', 0)
            ->get();
        $collection = collect();
        foreach ($courses as $course) {
            $countStudents = ControllerMaster::countStudents($course->id);
            $teacherName = ControllerMaster::getTeacherByCourseId($course->id);
            $collection->push(['course' => $course, 'countStudents' => $countStudents, 'teacherName' => $teacherName]);
        }
        return $collection;
    }

    // Get all assignments
    static function getAssignments()
    {
        $assignments = DB::table('assignments')
            ->select('assignments.id', 'course_id', 'assignment_title', 'deadline', 'course_title')
            ->join('courses', 'courses.id', '=', 'assignments.course_id')
            ->join('users', 'users.id', '=', 'courses.id')
            ->orderBy('deadline', 'desc')
            ->get();
        $collection = collect();
        foreach ($assignments as $assignment) {
            $submission = ControllerMaster::getSubmission($assignment->id, 2);
            $collection->push(['assignment' => $assignment, 'submission' => $submission]);
        }
        return $collection;
    }

    static function getSubmission($assignmentID, $userId)
    {
        $submission = DB::table('submissions')
            ->select('submissions.assignment_id', 'submissions.user_id', 'submissions.file_name', 'submissions.file_path', 'submissions.id')
            ->where('assignment_id', '=', $assignmentID)
            ->where('user_id', '=', $userId)->first();
        return $submission;
    }

    static function countAssginments($courseId)
    {
        $assignments = Course::where('id', $courseId)->first()->assignments()->count();
        return $assignments;
    }

    static function countStudents($courseId)
    {
        $student = DB::table('users')
            ->join('registered_students', 'registered_students.user_id', '=', 'users.id')
            ->join('courses', 'courses.id', '=', 'registered_students.course_id')
            ->where('courses.id', $courseId)->count();
        return $student;
    }

    static function countMaterials($courseId)
    {
        $materials = DB::table('materials')
            ->join('courses', 'courses.id', '=', 'materials.course_id')
            ->where('courses.id', $courseId)->count();
        return $materials;
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
            ->select('assignments.id', 'assignment_title', 'deadline', 'assignment_content')
            ->join('courses', 'courses.id', '=', 'assignments.course_id')
            ->join('users', 'users.id', '=', 'courses.id')
            ->where('courses.id', $courseId)
            ->orderBy('deadline', 'desc')
            ->get();
        $collection = collect();
        foreach ($assignments as $assignment) {
            $submission = ControllerMaster::getSubmission($assignment->id, 2);
            $collection->push(['assignment' => $assignment, 'submission' => $submission]);
        }
        return $collection;
    }

    // Get teacher by course id
    static function getTeacherByCourseId($courseId)
    {
        $teacher = DB::table('users')
            ->join('courses', 'courses.user_id', '=', 'users.id')
            ->where('courses.id', '=', $courseId)
            ->first();
        $teacherName = $teacher->first_name . " " . $teacher->last_name;
        return $teacherName;
    }

    // Get materials by course id
    static function getMaterialsByCourseId($courseId)
    {
        $materials = DB::table('materials')
            ->select('material_title', 'material_content', 'file_link')
            ->join('courses', 'courses.id', '=', 'materials.course_id')
            ->where('courses.id', $courseId)
            ->get();
        return $materials;
    }
}
