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
        $courses = null;
        if (auth()->user()->role == 0) {
            $courses = DB::table('courses')
                ->select(
                    'courses.id as course_id',
                    'courses.title as courseTitle',
                    'courses.cover as courseCover',
                    'courses.public',
                    'courses.user_id',
                    'users.name as teacherName',
                    'users.avatar as teacherAvatar',
                    DB::raw("(SELECT COUNT(id) FROM registered_students WHERE registered_students.course_id = courses.id) as numberOfStudents"),
                    DB::raw("(SELECT COUNT(id) FROM materials WHERE materials.course_id = courses.id) as numberOfMaterials"),
                    DB::raw("(SELECT COUNT(id) FROM assignments WHERE assignments.course_id = courses.id) as numberOfAssignments"),
                )
                ->join('registered_students', 'registered_students.course_id', '=', 'courses.id')
                ->join('users', 'users.id', 'courses.user_id')
                ->where('public', 1)
                ->where('registered_students.user_id', auth()->id())
                ->limit(3)
                ->orderBy('registered_students.visited_at', 'desc')
                ->get();
        } else {
            $courses = DB::table('courses')
                ->select(
                    'courses.id as course_id',
                    'courses.title as courseTitle',
                    'courses.cover as courseCover',
                    'courses.public',
                    'courses.user_id',
                    'users.name as teacherName',
                    'users.avatar as teacherAvatar',
                    DB::raw("(SELECT COUNT(id) FROM registered_students WHERE registered_students.course_id = courses.id) as numberOfStudents"),
                    DB::raw("(SELECT COUNT(id) FROM materials WHERE materials.course_id = courses.id) as numberOfMaterials"),
                    DB::raw("(SELECT COUNT(id) FROM assignments WHERE assignments.course_id = courses.id) as numberOfAssignments"),
                )
                ->join('users', 'users.id', 'courses.user_id')
                ->where('courses.user_id', auth()->id())
                ->where('courses.public', 1)
                ->limit(3)
                ->orderBy('courses.accessed_at', 'desc')
                ->get();
        }
        return response()->json([
            'recentlyCourses' => $courses,
        ]);
    }

    public function getAllCourses()
    {
        $courses = null;
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
        return response()->json([
            'status' => 201,
            'courses' => $courses,
        ]);
    }

    public function getNewCourses()
    {
        $courses = DB::table('courses')
            ->select(
                'courses.id',
                'users.avatar as teacherAvatar',
                'users.name as teacherName',
                'courses.title as courseTitle',
                DB::raw("(select COUNT(*) from registered_students where registered_students.course_id = courses.id) as numberOfStudents"),
            )
            ->join('users', 'users.id', 'courses.user_id')
            ->where('public', 0)
            ->get();
        return response()->json([
            'newCourses' => $courses,
        ]);
    }

    public function createCourse(Request $request)
    {
        $title = $request->input('title');
        $introduction = $request->input('introduction');
        $filePath = $request->file('cover')->store('courses');
        DB::table('courses')
            ->insert([
                'user_id' => auth()->id(),
                'cover' => $filePath,
                'title' => $title,
                'introduction' => $introduction,
                'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                'public' => 0,
            ]);
    }

    public function getCourseInfo(Request $request)
    {
        $courseId = $request->input("id");
        $course = DB::table('courses')
            ->select(
                'courses.cover as courseCover',
                'courses.title as courseTitle',
                'courses.introduction as courseIntroduction',
                'users.avatar as teacherAvatar',
                'users.name as teacherName',
            )
            ->join('users', 'users.id', 'courses.user_id')
            ->where('courses.id', $courseId)
            ->first();
        return response()->json([
            'course' => $course,
        ]);
    }
}
