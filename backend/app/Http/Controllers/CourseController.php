<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    public function index($courseId)
    {
        return response()->json([
            'status' => 200,
            'course' => ControllerMaster::getCourseById($courseId),
            'teacher' => ControllerMaster::getUserNameById($courseId),
            'materials' => ControllerMaster::getMaterialsByCourseId($courseId),
            'assignments' => ControllerMaster::getAssginmentsByCourseId($courseId),
        ]);
    }
    public function store(Request $request)
    {
        $fileName = $request->input('fileName');
        $filePath = $request->file('file')->store('submissions');
        DB::table('submissions')->insert([
            'assignment_id' =>  $request->input('assignment_id'),
            'user_id' => $request->input('user_id'),
            'fileName' => $fileName,
            'filePath' => $filePath,
            'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
        ]);
    }
    public function update(Request $request)
    {
        $submissionId = $request->input('submissionId');
        $filePath = $request->file('file')->store('submissions');
        $fileName = $request->input('fileName');
        $submission = DB::table('submissions')
            ->where('id', $submissionId)
            ->first();
        Storage::delete($submission->file_path);
        DB::table('submissions')
            ->where('id', $submissionId)
            ->update([
                'fileName' => $fileName,
                'filePath' => $filePath,
                'updated_at' => Carbon::now('Asia/Ho_Chi_Minh')
            ]);
    }

    public function deleteSubmission(Request $request)
    {
        $submissionId = $request->input('submissionId');
        $submission = DB::table('submissions')
            ->where('id', $submissionId)
            ->first();
        Storage::delete($submission->filePath);
        $submission = DB::table('submissions')
            ->where('id', $submissionId)
            ->delete();
    }

    public function getAssignment(Request $request)
    {
        $assignmentID = $request->input('assignmentId');
        $userId = $request->input('userId');
        $assignment = DB::table('assignments')
            ->where('id', $assignmentID)
            ->first();
        $submission = CourseController::getSubmission($assignmentID, $userId);
        $submissionStatus = "border-red-400";
        $today = Carbon::now('Asia/Ho_Chi_Minh')->format('y-m-d');
        if (strtotime($assignment->deadline) < strtotime($today) && $submission != null) {
            $submissionStatus = "border-green-400";
        }
        if (strtotime($assignment->deadline) >= strtotime($today) && $submission == null) {
            $submissionStatus = "border-yellow-400";
        }
        if (strtotime($assignment->deadline) >= strtotime($today) && $submission != null) {
            $submissionStatus = "border-green-400";
        }
        return response()->json([
            'assignment' => $assignment,
            'course_title' => CourseController::getCourseTitleById($assignment->course_id),
            'submission' => $submission,
            'submissionStatus' => $submissionStatus,
        ]);
    }
    static function getSubmission($assignmentID, $userId)
    {
        $submission = DB::table('submissions')
            ->select('submissions.assignment_id', 'submissions.user_id', 'submissions.fileName', 'submissions.filePath', 'submissions.id')
            ->where('assignment_id', '=', $assignmentID)
            ->where('user_id', '=', $userId)
            ->first();
        return $submission;
    }

    static function getCourseTitleById($courseId)
    {
        $course = DB::table('courses')
            ->select('course_title')
            ->where('id', $courseId)
            ->first();
        return $course->course_title;
    }
}
