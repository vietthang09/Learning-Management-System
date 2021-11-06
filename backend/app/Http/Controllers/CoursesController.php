<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Dflydev\DotAccessData\Exception\DataException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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

    public function createCourse(Request $request)
    {
        try {
            $filePath = $request->file('file')->store('courses');
            DB::table('courses')
                ->insert([
                    'user_id' => $request->input('teacherId'),
                    'course_cover' => $filePath,
                    'course_title' => $request->input('title'),
                    'introduction' => $request->input('introduction'),
                    'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                    'public' => 0,
                ]);
            return response()->json([
                'status' => 201,
            ]);
        } catch (DataException $th) {
            return response()->json([
                'status' => $th,
            ]);
        }
    }
}
