<?php

use App\Http\Controllers\ControllerMaster;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\Student\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\Student\CourseController as StudentCourseController;
use App\Http\Controllers\Student\CoursesController as StudentCoursesController;
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
    Route::post('/courses', [StudentCoursesController::class, 'index']);
    Route::post('/courses/search', [StudentCoursesController::class, 'search']);
    Route::post('/enroll', [CoursesController::class, 'enroll']);
    Route::post('/check-enroll', [CoursesController::class, 'checkEnroll']);
    Route::post('/get-out', [CoursesController::class, 'getOut']);
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
    Route::post('/courses', [TeacherCoursesController::class, 'index']);
    Route::post('/courses/search', [TeacherCoursesController::class, 'search']);
    Route::post('/create-course', [CoursesController::class, 'createCourse']);
    Route::post('/cancel-request', [CoursesController::class, 'cancelRequest']);
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

Route::post('/enrolled-list', [CoursesController::class, 'getEnrolledList']);
Route::get('/download/{id}', [DownloadController::class, 'getSubmission']);
Route::get('/material/download/{id}', [DownloadController::class, 'getMaterial']);

Route::group([
    'prefix' => 'posts'
], function () {
    Route::get('/', [PostController::class, 'getPosts']);
    Route::post('/update', [PostController::class, 'updatePost']);
    Route::post('/new', [PostController::class, 'newPost']);
    Route::post('/comments', [PostController::class, 'getComments']);
    Route::post('/post-comment', [PostController::class, 'postComment']);
    Route::post('/update-comment', [PostController::class, 'updateComment']);
    Route::post('/delete-comment', [PostController::class, 'deleteComment']);
    Route::post('/delete-post', [PostController::class, 'deletePost']);
    Route::get('/{id}', [PostController::class, 'getPost']);
});

Route::group([
    'prefix' => 'profile'
], function () {
    Route::post('/view', [ProfileController::class, 'getUser']);
    Route::post('/edit', [ProfileController::class, 'editUser']);
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('/login', [SessionController::class, 'login']);
    Route::post('/register', [SessionController::class, 'register']);
    Route::post('/logout', [SessionController::class, 'logout']);
});
