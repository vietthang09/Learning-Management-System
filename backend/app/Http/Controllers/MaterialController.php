<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaterialController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function create(Request $request)
    {
        $courseId = $request->input('id');
        $title = $request->input('title');
        $content = $request->input('content');
        $file = $request->file('file');
        DB::table('materials')
            ->insert([
                'course_id' => $courseId,
                'title' => $title,
                'content' => $content,
                'fileName' => $file->getClientOriginalName(),
                'filePath' => $file->store('materials'),
            ]);
    }

    public function getMaterialsInCourse(Request $request)
    {
        $courseId = $request->input('id');
        $materials = DB::table('materials')
            ->select(
                'id as materialId',
                'title as materialTitle',
                'content as materialContent',
                'fileName as fileName'
            )
            ->where('course_id', $courseId)
            ->get();
        return response()->json([
            'materials' => $materials,
        ]);
    }

    public function getInfo(Request $request)
    {
        $materialId = $request->input('id');
        $material = DB::table('materials')
            ->select(
                'title as materialTitle',
                'content as materialContent',
                'fileName as fileName'
            )
            ->where('id', $materialId)
            ->first();
        return response()->json([
            'material' => $material,
        ]);
    }
}
