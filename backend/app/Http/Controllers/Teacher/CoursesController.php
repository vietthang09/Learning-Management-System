<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CoursesController extends Controller
{
    public function index(Request $request)
    {
        // $userId = $request->input('userId');
        // return response()->json([
        //     'status' => 200,
        //     'listOfCourses' => ControllerMaster::getAllCoursesEnrolled($userId, 0),
        // ]);
    }
}
