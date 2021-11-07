<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ControllerMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CoursesController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->input('userId');
        return response()->json([
            'status' => 200,
            'listOfCourses' => ControllerMaster::getAllCoursesEnrolled($userId, 0),
        ]);
    }

    public function search(Request $request)
    {
        $searchInput = $request->input('searchInput');
        $userId = $request->input('studentId');
        $courses = DB::table('courses')
            ->select('course_id', 'course_title', 'course_cover', 'public', 'courses.user_id')
            ->join('registered_students', 'registered_students.course_id', '=', 'courses.id')
            ->where('public', 1)
            ->where('registered_students.user_id', $userId)
            ->where('course_title', 'LIKE', "%{$searchInput}%")
            ->get();
        $collectionOfCourses = collect();
        foreach ($courses as $course) {
            $teacherName = ControllerMaster::getUserNameById($course->user_id);
            $numberOfStudents = ControllerMaster::countStudentsOfCourse($course->course_id);
            $numberOfMaterials = ControllerMaster::countMaterialsOfCourse($course->course_id);
            $numberOfAssignments = ControllerMaster::countAssginmentsOfCourse($course->course_id);
            $collectionOfCourses->push([
                'course' => $course,
                'teacherName' => $teacherName,
                'numberOfStudents' => $numberOfStudents,
                'numberOfMaterials' => $numberOfMaterials,
                'numberOfAssignments' => $numberOfAssignments,
            ]);
        }
        return response()->json([
            'status' => 201,
            'listOfCourses' => $collectionOfCourses,
        ]);
    }
}
