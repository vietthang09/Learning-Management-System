<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index($courseId)
    {
        return response()->json([
            'status' => 200,
            'course' => ControllerMaster::getCourseById($courseId),
            'teacher' => ControllerMaster::getTeacherByCourseId($courseId),
            'materials' => ControllerMaster::getMaterialsByCourseId($courseId),
            'assignments' => ControllerMaster::getAssginmentsByCourseId($courseId),
        ]);
    }
}
