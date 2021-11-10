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
    // public function index(Request $request)
    // {
    //     $userId = $request->input('userId');
    //     return response()->json([
    //         'status' => 200,
    //         'listOfCourses' => ControllerMaster::getAllCoursesEnrolled($userId, 0),
    //     ]);
    // }

    // public function createCourse(Request $request)
    // {
    //     try {
    //         $filePath = $request->file('file')->store('courses');
    //         DB::table('courses')
    //             ->insert([
    //                 'user_id' => $request->input('teacherId'),
    //                 'course_cover' => $filePath,
    //                 'course_title' => $request->input('title'),
    //                 'introduction' => $request->input('introduction'),
    //                 'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
    //                 'public' => 0,
    //             ]);
    //         return response()->json([
    //             'status' => 201,
    //         ]);
    //     } catch (DataException $th) {
    //         return response()->json([
    //             'status' => $th,
    //         ]);
    //     }
    // }

    // public function cancelRequest(Request $request)
    // {
    //     $courseId = $request->input('courseId');
    //     try {
    //         DB::table('courses')
    //             ->where('id', $courseId)
    //             ->delete();
    //         return response()->json([
    //             'status' => 201,
    //         ]);
    //     } catch (DataException $ex) {
    //         return response()->json([
    //             'status' => $ex,
    //         ]);
    //     }
    // }

    // public function enroll(Request $request)
    // {
    //     $studentId = $request->input('userId');
    //     $courseId =  $request->input('courseId');
    //     try {
    //         DB::table('registered_students')
    //             ->insert([
    //                 'user_id' => $studentId,
    //                 'course_id' => $courseId,
    //                 'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
    //             ]);
    //         return response()->json([
    //             'status' => 201,
    //         ]);
    //     } catch (DataException $ex) {
    //         return response()->json([
    //             'status' => $ex,
    //         ]);
    //     }
    // }

    // public function checkEnroll(Request $request)
    // {
    //     $studentId = $request->input('userId');
    //     $courseId =  $request->input('courseId');
    //     try {
    //         $registration = DB::table('registered_students')
    //             ->where('user_id', $studentId)
    //             ->where('course_id', $courseId)
    //             ->first();
    //         if ($registration) {
    //             return response()->json([
    //                 'status' => 1,
    //             ]);
    //         }
    //     } catch (DataException $ex) {
    //         return response()->json([
    //             'status' => $ex,
    //         ]);
    //     }
    // }

    // public function getOut(Request $request)
    // {
    //     $studentId = $request->input('userId');
    //     $courseId =  $request->input('courseId');
    //     try {
    //         DB::table('registered_students')
    //             ->where('user_id', $studentId)
    //             ->where('course_id', $courseId)
    //             ->delete();
    //         return response()->json([
    //             'status' => 201,
    //         ]);
    //     } catch (DataException $ex) {
    //         return response()->json([
    //             'status' => $ex,
    //         ]);
    //     }
    // }

    // public function getEnrolledList(Request $request)
    // {
    //     $courseId = $request->input('courseId');
    //     try {
    //         $students = DB::table('users')
    //             ->join('registered_students', 'registered_students.user_id', 'users.id')
    //             ->where('course_id', $courseId)
    //             ->get();
    //         return response()->json([
    //             'status' => 201,
    //             'students' => $students,
    //         ]);
    //     } catch (DataException $ex) {
    //         return response()->json([
    //             'status' => $ex,
    //         ]);
    //     }
    // }

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

    public function getAllCourses()
    {
        $courses;
        if (auth()->user()->role == 0) {
            $courses = ControllerMaster::getAllCoursesEnrolled(auth()->id(), 0);
        } else {
            $courses = ControllerMaster::getCoursesIsBeingTaught(auth()->id(), 0);
        }
        return response()->json([
            'courses' => $courses,
        ]);
    }

    public function findCourses(Request $request)
    {
        $searchInput = $request->input('searchInput');
        $courses = DB::table('courses')
            ->select(
                'course_id',
                'course_title',
                'course_cover',
                'public',
                'users.id as teacherId',
                'users.avatar as teacherAvatar',
                DB::raw("(select COUNT(*) from registered_students where registered_students.course_id = courses.id) as numberStudent")
            )
            ->join('registered_students', 'registered_students.course_id', '=', 'courses.id')
            ->join('users', 'users.id', 'courses.user_id')
            ->where('public', 1)
            ->where('registered_students.user_id', auth()->id())
            ->where('course_title', 'LIKE', "%{$searchInput}%")
            ->get();
        // $collectionOfCourses = collect();
        // foreach ($courses as $course) {
        //     $teacherName = ControllerMaster::getUserNameById($course->user_id);
        //     $numberOfStudents = ControllerMaster::countStudentsOfCourse($course->course_id);
        //     $numberOfMaterials = ControllerMaster::countMaterialsOfCourse($course->course_id);
        //     $numberOfAssignments = ControllerMaster::countAssginmentsOfCourse($course->course_id);
        //     $collectionOfCourses->push([
        //         'course' => $course,
        //         'teacherName' => $teacherName,
        //         'teacherAvatar' => ControllerMaster::getUserAvatar($course->user_id),
        //         'numberOfStudents' => $numberOfStudents,
        //         'numberOfMaterials' => $numberOfMaterials,
        //         'numberOfAssignments' => $numberOfAssignments,
        //     ]);
        // }
        return response()->json([
            'status' => 201,
            'courses' => $courses,
        ]);
    }

    public function getNewCourses()
    {
        $courses = DB::table('courses')
            ->select('users.id', 'users.avatar', 'users.name', 'courses.course_title')
            ->join('users', 'users.id', 'courses.user_id')
            ->where('public', 0)
            ->get();
        return response()->json([
            'newCourses' => $courses,
        ]);
    }

    public function getNumberEnrolled(Request $request)
    {
        $courseId = $request->input('courseId');
        $numberEnrolled = DB::table('courses')
            ->where('id', $courseId)
            ->count();
        return response()->json([
            'numberEnrolled' => $numberEnrolled,
        ]);
    }
}
