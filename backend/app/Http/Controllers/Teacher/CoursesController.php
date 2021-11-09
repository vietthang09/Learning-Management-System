<?php

namespace App\Http\Controllers\Teacher;

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
            'listOfCourses' => ControllerMaster::getCoursesIsBeingTaught($userId, 0),
        ]);
    }

    public function search(Request $request)
    {
        $searchInput = $request->input('searchInput');
        $teacherId = $request->input('teacherId');
        $courses = DB::table('courses')
            ->select('id as course_id', 'course_title', 'course_cover', 'introduction', 'public', 'user_id')
            ->where('user_id', $teacherId)
            ->where('public', 1)
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
                'teacherAvatar' => ControllerMaster::getUserAvatar($course->user_id),
                'numberOfStudents' => $numberOfStudents,
                'numberOfMaterials' => $numberOfMaterials,
                'numberOfAssignments' => $numberOfAssignments,
            ]);
        }
        return response()->json([
            'status' => 200,
            'listOfCourses' => $collectionOfCourses,
        ]);
    }
}
