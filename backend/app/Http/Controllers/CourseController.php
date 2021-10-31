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
            'teacher' => ControllerMaster::getTeacherByCourseId($courseId),
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
            'file_name' => $fileName,
            'file_path' => $filePath,
            'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
        ]);
    }
    public function update(Request $request)
    {
        $submissionId = $request->input('submissionId');
        $filePath = $request->file('file')->store('submissions');
        $fileName = $request->input('fileName');
        DB::table('submissions')
            ->where('id', $submissionId)
            ->update([
                'file_name' => $fileName,
                'file_path' => $filePath,
                'updated_at' => Carbon::now('Asia/Ho_Chi_Minh')
            ]);
    }
}
