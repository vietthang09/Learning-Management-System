<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SubmissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    // For students
    public function create(Request $request)
    {
        $assignmentId = $request->input('id');
        $file = $request->file('file');
        DB::table('submissions')
            ->insert([
                'assignment_id' => $assignmentId,
                'user_id' => auth()->id(),
                'fileName' => $file->getClientOriginalName(),
                'filePath' => $file->store('submissions'),
                'submitted_at' => Carbon::now('Asia/Ho_Chi_Minh'),
            ]);
    }
    public function check(Request $request)
    {
        $assignmentId = $request->input('id');
        $submission = DB::table('submissions')
            ->select(
                'id as submissionId',
                'fileName as submissionFileName',
                'submitted_at as submittedAt',
            )
            ->where('assignment_id', $assignmentId)
            ->where('user_id', auth()->id())
            ->first();
        return response()->json([
            'submission' => $submission,
        ]);
    }

    public function delete(Request $request)
    {
        $submissionId = $request->input('id');
        $submission = DB::table('submissions')
            ->where('id', $submissionId)
            ->first();
        Storage::delete($submission->filePath);
        $submission = DB::table('submissions')
            ->where('id', $submissionId)
            ->delete();
    }

    public function update(Request $request)
    {
        $submissionId = $request->input('id');
        $file = $request->file('file');
        $submission = DB::table('submissions')
            ->where('id', $submissionId)
            ->first();
        Storage::delete($submission->filePath);
        DB::table('submissions')
            ->where('id', $submissionId)
            ->update([
                'fileName' => $file->getClientOriginalName(),
                'filePath' => $file->store('submissions'),
                'submitted_at' => Carbon::now('Asia/Ho_Chi_Minh'),
            ]);
    }

    public function destroy(Request $request)
    {
        $materialId = $request->input('id');
        $material = DB::table('materials')
            ->where('id', $materialId)
            ->first();
        Storage::delete($material->filePath);
        DB::table('materials')
            ->where('id', $materialId)
            ->delete();
    }
}
