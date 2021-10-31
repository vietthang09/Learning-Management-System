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
        $download = Storage::download($submission->file_path, $submission->file_name, ['Content-Type: docx/pdf/zip/rar']);
        return $download;
    }
}
