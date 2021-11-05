<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    public function getSubmission($submissionId)
    {
        $submission = DB::table('submissions')
            ->where('id', $submissionId)
            ->first();
        $download = Storage::download($submission->filePath, $submission->fileName, ['Content-Type: docx/pdf/zip/rar']);
        return $download;
    }
    public function getMaterial($materialId)
    {
        $material = DB::table('materials')
            ->where('id', $materialId)
            ->first();
        $download = Storage::download($material->filePath, $material->fileName, ['Content-Type: docx/pdf/zip/rar']);
        return $download;
    }
}
