<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Dflydev\DotAccessData\Exception\DataException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class AssignmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getNumberToday()
    {
        $current = Carbon::now();
        $yesterday = Carbon::now()->subDay();
        $numberAssignments = 0;
        if (auth()->user()->role == 0) {
            $numberAssignments = DB::table('assignments')
                ->select(
                    'assignments.id',
                    'assignments.course_id'
                )
                ->join(
                    'courses',
                    'courses.id',
                    'assignments.course_id'
                )
                ->join(
                    'registered_students',
                    'registered_students.course_id',
                    'courses.id'
                )
                ->where('registered_students.user_id', auth()->id())
                ->where('assignments.deadline', '<=', $current)
                ->where('assignments.deadline', '>', $yesterday)
                ->count();
        } else {
            $numberAssignments = DB::table('assignments')
                ->select(
                    'assignments.id',
                    'assignments.course_id',
                    'courses.user_id'
                )
                ->join(
                    'courses',
                    'courses.id',
                    'assignments.course_id'
                )
                ->where('courses.user_id', auth()->id())
                ->where('assignments.deadline', '<=', $current)
                ->where('assignments.deadline', '>', $yesterday)
                ->count();
        }
        if ($numberAssignments > 1) {
            return $numberAssignments . ' assignments';
        }
        return $numberAssignments . ' assignment';
    }

    public function getAllAssignmentsMini()
    {
        $assigments = null;
        if (auth()->user()->role == 0) {
            $assigments = DB::table('assignments')
                ->select(
                    'assignments.course_id',
                    'users.avatar as teacherAvatar',
                    'assignments.deadline',
                    'assignments.title as assignmentTitle',
                    'courses.title as courseTitle',
                    DB::raw("(SELECT COUNT(id) FROM submissions WHERE submissions.assignment_id = assignments.id) as submission"),
                )
                ->join('courses', 'courses.id', 'assignments.course_id')
                ->join('registered_students', 'registered_students.course_id', 'courses.id')
                ->join('users', 'users.id', 'courses.user_id')
                ->where('registered_students.user_id', auth()->id())
                ->limit(5)
                ->orderBy('deadline', 'desc')
                ->get();
        } else {
            $assigments = DB::table('assignments')
                ->select(
                    'assignments.course_id',
                    'users.avatar as teacherAvatar',
                    'assignments.deadline',
                    'assignments.title as assignmentTitle',
                    'courses.title as courseTitle'
                )
                ->join('courses', 'courses.id', 'assignments.course_id')
                ->join('users', 'users.id', 'courses.user_id')
                ->where('courses.user_id', auth()->id())
                ->limit(5)
                ->orderBy('deadline', 'desc')
                ->get();
        }
        return response()->json([
            'assignments' => $assigments,
        ]);
    }
    public function getAssignmentsOfCourse(Request $request)
    {
        $courseId = $request->input('id');
        $assigments = DB::table('assignments')
            ->select(
                'users.avatar as teacherAvatar',
                'assignments.id as assignmentId',
                'assignments.title as assignmentTitle',
                'assignments.deadline',
                'courses.title as courseTitle',
                DB::raw("(SELECT COUNT(id) FROM submissions WHERE submissions.assignment_id = assignments.id) as submission"),
            )
            ->join('courses', 'courses.id', 'assignments.course_id')
            ->join('users', 'users.id', 'courses.user_id')
            ->where('assignments.course_id', $courseId)
            ->orderBy('deadline', 'desc')
            ->get();

        return response()->json([
            'assignments' => $assigments,
        ]);
    }

    public function createAssignment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'title' => 'required',
            'content' => 'required|max:255',
            'deadline' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        DB::table('assignments')
            ->insert([
                'course_id' => $request->input('id'),
                'title' => $request->input('title'),
                'content' => $request->input('content'),
                'deadline' => $request->input('deadline'),
            ]);
        return response()->json([
            'status' => 201,
        ]);
    }

    // For teacher 
    public function getInfo(Request $request)
    {
        $assignmentId = $request->input('id');
        $assignment = DB::table('assignments')
            ->select(
                'title as assignmentTitle',
                'content as assignmentContent',
                'deadline as assignmentDeadline',
            )
            ->where('id', $assignmentId)
            ->first();
        return response()->json([
            'assignment' => $assignment,
        ]);
    }

    // for teachers
    public function delete(Request $request)
    {
        $assignmentId = $request->input('id');
        DB::table('assignments')
            ->where('id', $assignmentId)
            ->delete();
    }

    // for teacher
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'title' => 'required',
            'content' => 'required|max:255',
            'deadline' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        try {
            DB::table('assignments')
                ->where('id', $request->input('id'))
                ->update([
                    'title' => $request->input('title'),
                    'content' => $request->input('content'),
                    'deadline' => $request->input('deadline'),
                ]);
            return response()->json([
                'status' => 201,
            ]);
        } catch (DataException $de) {
            return response()->json([
                'status' => $de,
            ]);
        }
    }
}
