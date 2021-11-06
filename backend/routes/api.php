<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\Student\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\Student\CourseController as StudentCourseController;
use App\Http\Controllers\Teacher\CourseController as TeacherCourseController;
use App\Http\Controllers\Teacher\CoursesController as TeacherCoursesController;
use App\Http\Controllers\Teacher\HomeController as TeacherHomeController;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'student'
], function () {
    Route::post('/home', [HomeController::class, 'index']);
    Route::post('/courses', [CoursesController::class, 'index']);
    Route::get('/course/{id}', [StudentCourseController::class, 'index']);
    Route::post('/submit/upload', [StudentCourseController::class, 'store']);
    Route::post('/submit/update', [StudentCourseController::class, 'update']);
    Route::post('/submit/delete', [StudentCourseController::class, 'deleteSubmission']);
    Route::post('/assignment', [StudentCourseController::class, 'getAssignment']);
});

Route::group([
    'prefix' => 'teacher'
], function () {
    Route::post('/home', [TeacherHomeController::class, 'index']);
    Route::post('/create-course', [CoursesController::class, 'createCourse']);
    Route::get('/course/{id}', [TeacherCourseController::class, 'index']);
    Route::post('/createassignment', [TeacherCourseController::class, 'createAssignment']);
    Route::post('/assignment', [TeacherCourseController::class, 'getAssignment']);
    Route::post('/assignment/delete', [TeacherCourseController::class, 'deleteAssignment']);
    Route::post('/assignment/update', [TeacherCourseController::class, 'updateAssignment']);
    Route::post('/assignment/submissions', [TeacherCourseController::class, 'getSubmissions']);
    Route::post('/assignment/give-mark', [TeacherCourseController::class, 'giveMark']);
    Route::post('/material/creatematerial', [TeacherCourseController::class, 'createMaterial']);
    Route::post('/material/delete', [TeacherCourseController::class, 'deleteMaterial']);
    Route::post('/material/update', [TeacherCourseController::class, 'updateMaterial']);
});

Route::get('/download/{id}', [DownloadController::class, 'getSubmission']);
Route::get('/material/download/{id}', [DownloadController::class, 'getMaterial']);
Route::get('/posts', [PostController::class, 'getPosts']);
Route::post('/posts/new', [PostController::class, 'newPost']);
Route::get('/posts/{id}', [PostController::class, 'getPost']);
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('/login', [SessionController::class, 'login']);
    Route::post('/register', [SessionController::class, 'register']);
    Route::post('/logout', [SessionController::class, 'logout']);
});
