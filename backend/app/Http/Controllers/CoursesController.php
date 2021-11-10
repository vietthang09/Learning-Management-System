<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Dflydev\DotAccessData\Exception\DataException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CoursesController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }
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

    public function cancelRequest(Request $request)
    {
        $courseId = $request->input('courseId');
        try {
            DB::table('courses')
                ->where('id', $courseId)
                ->delete();
            return response()->json([
                'status' => 201,
            ]);
        } catch (DataException $ex) {
            return response()->json([
                'status' => $ex,
            ]);
        }
    }

    public function enroll(Request $request)
    {
        $studentId = $request->input('userId');
        $courseId =  $request->input('courseId');
        try {
            DB::table('registered_students')
                ->insert([
                    'user_id' => $studentId,
                    'course_id' => $courseId,
                    'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                ]);
            return response()->json([
                'status' => 201,
            ]);
        } catch (DataException $ex) {
            return response()->json([
                'status' => $ex,
            ]);
        }
    }

    public function checkEnroll(Request $request)
    {
        $studentId = $request->input('userId');
        $courseId =  $request->input('courseId');
        try {
            $registration = DB::table('registered_students')
                ->where('user_id', $studentId)
                ->where('course_id', $courseId)
                ->first();
            if ($registration) {
                return response()->json([
                    'status' => 1,
                ]);
            }
        } catch (DataException $ex) {
            return response()->json([
                'status' => $ex,
            ]);
        }
    }

    public function getOut(Request $request)
    {
        $studentId = $request->input('userId');
        $courseId =  $request->input('courseId');
        try {
            DB::table('registered_students')
                ->where('user_id', $studentId)
                ->where('course_id', $courseId)
                ->delete();
            return response()->json([
                'status' => 201,
            ]);
        } catch (DataException $ex) {
            return response()->json([
                'status' => $ex,
            ]);
        }
    }

    public function getEnrolledList(Request $request)
    {
        $courseId = $request->input('courseId');
        try {
            $students = DB::table('users')
                ->join('registered_students', 'registered_students.user_id', 'users.id')
                ->where('course_id', $courseId)
                ->get();
            return response()->json([
                'status' => 201,
                'students' => $students,
            ]);
        } catch (DataException $ex) {
            return response()->json([
                'status' => $ex,
            ]);
        }
    }

    public function getRecentlyCourses()
    {
        $courses;
        if (auth()->user()->role == 0) {
            $courses = ControllerMaster::getAllCoursesEnrolled(auth()->id(), 3);
        } else {
            $courses = ControllerMaster::getCoursesIsBeingTaught(auth()->id(), 3);
        }
        return response()->json([
            'recentlyCourses' => $courses,
        ]);
    }
}
