<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ControllerMaster;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    public function index($courseId)
    {
        $courseInfo = DB::table('courses')
            ->where('id', $courseId)
            ->first();
        return response()->json([
            'courseInfo' => $courseInfo,
            'teacher' => ControllerMaster::getUserNameById($courseInfo->user_id),
            'materials' => ControllerMaster::getMaterialsByCourseId($courseId),
            'assignments' => ControllerMaster::getAssginmentsByCourseId($courseId),
        ]);
    }

    public function createAssignment(Request $request)
    {
        $courseId = $request->input('courseId');
        $title =  $request->input('title');
        $content = $request->input('content');
        $deadline = $request->input('deadline');
        DB::table('assignments')
            ->insert([
                'course_id' => $courseId,
                'assignment_title' => $title,
                'assignment_content' => $content,
                'deadline' => $deadline,
                'created_at' => Carbon::now('Asia/Ho_Chi_Minh')->format('y-m-d'),
            ]);
    }

    public function updateAssignment(Request $request)
    {
        DB::table('assignments')
            ->where('id', $request->input('assignmentId'))
            ->update([
                'assignment_title' => $request->input('title'),
                'assignment_content' => $request->input('content'),
                'deadline' => $request->input('deadline'),
            ]);
    }

    public function deleteAssignment(Request $request)
    {
        DB::table('assignments')
            ->where('id', $request->input('assignmentId'))
            ->delete();
    }

    static function countNumberSubmissions($assignmentId)
    {
        $submissions = DB::table('submissions')
            ->where('assignment_id', $assignmentId)
            ->count();
        if ($submissions > 1) {
            return $submissions . " students";
        } else {
            return $submissions . " student";
        }
    }

    public function getAssignment(Request $request)
    {
        $assignmentID = $request->input('assignmentId');
        $assignment = DB::table('assignments')
            ->where('id', $assignmentID)
            ->first();
        $submissionStatus = "border-green-400";
        $today = Carbon::now('Asia/Ho_Chi_Minh')->format('y-m-d');
        if (strtotime($assignment->deadline) >= strtotime($today)) {
            $submissionStatus = "border-yellow-400";
        }
        return response()->json([
            'assignment' => $assignment,
            'submissionStatus' => $submissionStatus,
            'course_title' => CourseController::getCourseTitleById($assignment->course_id),
            'numberOfSubmissions' => CourseController::countNumberSubmissions($assignmentID),
        ]);
    }

    static function getCourseInfo($courseId)
    {
        $courseInfo = DB::table('courses')
            ->where('id', $courseId)
            ->first();
        return $courseInfo;
    }
    static function getCourseTitleById($courseId)
    {
        $course = DB::table('courses')
            ->select('course_title')
            ->where('id', $courseId)
            ->first();
        return $course->course_title;
    }

    public function createMaterial(Request $request)
    {
        DB::table('materials')
            ->insert([
                'course_id' => $request->input('courseId'),
                'material_title' => $request->input('title'),
                'material_content' => $request->input('content'),
                'fileName' => $request->input('fileName'),
                'filePath' => $request->file('file')->store('materials'),
                'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
            ]);
    }
}
