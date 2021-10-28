<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CoursesController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 200,
            'courseList' => ControllerMaster::getCourses(2),
        ]);
    }
}
