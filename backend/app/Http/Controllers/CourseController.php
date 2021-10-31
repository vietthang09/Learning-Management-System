<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
    public function store(Request $request)
    {
        $fielnames = $request->input('name');
        $filepath = $request->file('file')->store('submissions');
        DB::table('submissions')->insert([
            'assignment_id' =>  $request->input('assignment_id'),
            'user_id' => $request->input('user_id'),
            'link_file' => 'a',
        ]);
    }
}
