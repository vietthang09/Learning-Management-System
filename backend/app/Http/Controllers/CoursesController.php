<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Dflydev\DotAccessData\Exception\DataException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Validator;

class CoursesController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['getCourses']]);
    }

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
                    'users.id as teacherId',
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
                ->orderBy('registered_students.accessed_at', 'desc')
                ->get();
        } else {
            $courses = DB::table('courses')
                ->select(
                    'courses.id as course_id',
                    'courses.title as courseTitle',
                    'courses.cover as courseCover',
                    'courses.public',
                    'courses.user_id',
                    'users.id as teacherId',
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
            $courses = DB::table('courses')
                ->select(
                    'courses.id as course_id',
                    'courses.title as courseTitle',
                    'courses.cover as courseCover',
                    'courses.public',
                    'courses.user_id',
                    'users.id as teacherId',
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
                ->orderBy('registered_students.accessed_at', 'desc')
                ->get();
        } else {
            $courses = DB::table('courses')
                ->select(
                    'courses.id as course_id',
                    'courses.title as courseTitle',
                    'courses.cover as courseCover',
                    'courses.public',
                    'courses.user_id',
                    'users.id as teacherId',
                    'users.name as teacherName',
                    'users.avatar as teacherAvatar',
                    DB::raw("(SELECT COUNT(id) FROM registered_students WHERE registered_students.course_id = courses.id) as numberOfStudents"),
                    DB::raw("(SELECT COUNT(id) FROM materials WHERE materials.course_id = courses.id) as numberOfMaterials"),
                    DB::raw("(SELECT COUNT(id) FROM assignments WHERE assignments.course_id = courses.id) as numberOfAssignments"),
                )
                ->join('users', 'users.id', 'courses.user_id')
                ->where('courses.user_id', auth()->id())
                ->where('courses.public', 1)
                ->orderBy('courses.accessed_at', 'desc')
                ->get();
        }
        return response()->json([
            'courses' => $courses,
        ]);
    }

    public function findCourses(Request $request)
    {
        $searchInput = $request->input('input');
        $courses = null;
        if (auth()->user()->role == 0) {
            $courses = DB::table('courses')
                ->select(
                    'courses.id as course_id',
                    'courses.title as courseTitle',
                    'courses.cover as courseCover',
                    'courses.public',
                    'courses.user_id',
                    'users.id as teacherId',
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
                ->where('courses.title', 'LIKE', "%{$searchInput}%")
                ->orderBy('registered_students.accessed_at', 'desc')
                ->get();
        } else {
            $courses = DB::table('courses')
                ->select(
                    'courses.id as course_id',
                    'courses.title as courseTitle',
                    'courses.cover as courseCover',
                    'courses.public',
                    'courses.user_id',
                    'users.id as teacherId',
                    'users.name as teacherName',
                    'users.avatar as teacherAvatar',
                    DB::raw("(SELECT COUNT(id) FROM registered_students WHERE registered_students.course_id = courses.id) as numberOfStudents"),
                    DB::raw("(SELECT COUNT(id) FROM materials WHERE materials.course_id = courses.id) as numberOfMaterials"),
                    DB::raw("(SELECT COUNT(id) FROM assignments WHERE assignments.course_id = courses.id) as numberOfAssignments"),
                )
                ->join('users', 'users.id', 'courses.user_id')
                ->where('courses.user_id', auth()->id())
                ->where('courses.public', 1)
                ->where('courses.title', 'LIKE', "%{$searchInput}%")
                ->orderBy('courses.accessed_at', 'desc')
                ->get();
        }
        return response()->json([
            'courses' => $courses,
        ]);
    }

    public function getNewCourses()
    {
        $courses = DB::table('courses')
            ->select(
                'courses.id',
                'users.id as teacherId',
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

    // For teachers
    public function createCourse(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'introduction' => 'required|max:255',
            'cover' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        try {
            $filePath = $request->file('cover')->store('courses');
            DB::table('courses')
                ->insert([
                    'user_id' => auth()->id(),
                    'cover' => $filePath,
                    'title' => $request->input('title'),
                    'introduction' => $request->input('introduction'),
                    'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                    'public' => 0,
                ]);
            return response()->json([
                'status' => 201,
            ]);
        } catch (DataException $de) {
            return response()->json([
                'errors' => $de,
            ]);
        }
    }

    public function enrollCourse(Request $request)
    {
        $courseId = $request->input('id');
        DB::table('registered_students')
            ->insert([
                'user_id' => auth()->id(),
                'course_id' => $courseId,
            ]);
    }

    public function cancelRequest(Request $request)
    {
        $courseId = $request->input('id');
        if (auth()->user()->role == 0) {
            DB::table('registered_students')
                ->where('user_id', auth()->id())
                ->where('course_id', $courseId)
                ->delete();
        } else {
            $course = DB::table('courses')
                ->where('id', $courseId)
                ->first();
            Storage::delete($course->cover);
            DB::table('courses')
                ->where('id', $courseId)
                ->delete();
        }
    }

    public function getCourseInfo(Request $request)
    {
        $courseId = $request->input("id");
        if (auth()->user()->role == 0) {
            $course = DB::table('registered_students')
                ->where('user_id', auth()->id())
                ->where('registered_students.course_id', $courseId)
                ->update([
                    'accessed_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                ]);
        } else {
            $course = DB::table('courses')
                ->where('id', $courseId)
                ->where('courses.user_id', auth()->id())
                ->update([
                    'accessed_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                ]);
        }
        $course = DB::table('courses')
            ->select(
                'courses.user_id as teacherId',
                'courses.cover as courseCover',
                'courses.title as courseTitle',
                'courses.introduction as courseIntroduction',
                'users.avatar as teacherAvatar',
                'users.name as teacherName',
            )
            ->join(
                'users',
                'users.id',
                'courses.user_id'
            )
            ->where('courses.id', $courseId)
            ->first();
        return response()->json([
            'course' => $course,
        ]);
    }

    public function getRegisteredList(Request $request)
    {
        $courseId = $request->input('id');
        $students = DB::table('registered_students')
            ->select(
                'users.id as studentId',
                'users.avatar as studentAvatar',
                'users.name as studentName',
                'users.email as studentEmail',
            )
            ->join(
                'users',
                'users.id',
                'registered_students.user_id'
            )
            ->where('registered_students.course_id', $courseId)
            ->get();
        return response()->json([
            'students' => $students,
        ]);
    }

    public function countCoursesOfUser(Request $request)
    {
        $userId = $request->input('id');
        $user = DB::table('users')
            ->where('id', $userId)
            ->first();
        $count = 0;
        if ($user->role == 0) {
            $count = DB::table('registered_students')
                ->where('user_id', $userId)
                ->count();
        } else {
            $count = DB::table('courses')
                ->where('user_id', $userId)
                ->count();
        }
        return response()->json([
            'numberOfCourses' => $count,
        ]);
    }

    public function confirm(Request $request)
    {
        $courseId = $request->input('id');
        DB::table('courses')
            ->where('id', $courseId)
            ->update([
                'public' => 1,
            ]);
    }

    // For admin
    public function getCourses()
    {
        $courses = DB::table('courses')
            ->select(
                'users.name as teacherName',
                'users.avatar as teacherAvatar',
                'users.email as teacherEmail',
                'courses.id as courseId',
                'courses.title',
                'courses.public',
                DB::raw("(select COUNT(*) from registered_students where registered_students.course_id = courses.id) as numberOfStudents"),
            )
            ->join('users', 'users.id', 'courses.user_id')
            ->paginate(10);
        return  response()->json([
            'courses' => $courses,
        ]);
    }

    // For admin
    public function getNumberCourses()
    {
        $number = DB::table('courses')
            ->count();
        return response()->json([
            'numberCourse' => $number,
        ]);
    }

    // For students
    public function checkEnrolled(Request $request)
    {
        $courseId = $request->input('id');
        $user = DB::table('registered_students')
            ->where('user_id', auth()->id())
            ->where('course_id', $courseId)
            ->first();
        if ($user) {
            return response()->json([
                'enrolled' => true,
            ]);
        } else {
            return response()->json([
                'enrolled' => false,
            ]);
        }
    }

    // For students
    public function checkTeaching(Request $request)
    {
        $courseId = $request->input('id');
        $user = DB::table('courses')
            ->where('user_id', auth()->id())
            ->where('id', $courseId)
            ->first();
        if ($user) {
            return response()->json([
                'teaching' => true,
            ]);
        } else {
            return response()->json([
                'teaching' => false,
            ]);
        }
    }
}
