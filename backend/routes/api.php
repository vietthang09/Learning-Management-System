<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\ControllerMaster;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\Student\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\Student\CourseController as StudentCourseController;
use App\Http\Controllers\Student\CoursesController as StudentCoursesController;
use App\Http\Controllers\SubmissionController;
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
// For courses controller
Route::group([
    'prefix' => 'course'
], function () {
    Route::post('/recently', [CoursesController::class, 'getRecentlyCourses']);
    Route::post('/all', [CoursesController::class, 'getAllCourses']);
    Route::post('/find', [CoursesController::class, 'findCourses']);
    Route::post('/getInfo', [CoursesController::class, 'getCourseInfo']);
    Route::post('/get-new', [CoursesController::class, 'getNewCourses']);
    Route::post('/enroll', [CoursesController::class, 'enrollCourse']);
    Route::post('/create', [CoursesController::class, 'createCourse']);
    Route::post('/registered-list', [CoursesController::class, 'getRegisteredList']);
    Route::post('/cancel', [CoursesController::class, 'cancelRequest']);
});

// For assignment controller
Route::group([
    'prefix' => 'assignment'
], function () {
    Route::post('/number-today', [AssignmentController::class, 'getNumberToday']);
    Route::post('/timeline', [AssignmentController::class, 'getAllAssignmentsMini']);
    Route::post('/in-course', [AssignmentController::class, 'getAssignmentsOfCourse']);
    Route::post('/create', [AssignmentController::class, 'createAssignment']);
    Route::post('/info', [AssignmentController::class, 'getInfo']);
    Route::post('/delete', [AssignmentController::class, 'delete']);
    Route::post('/update', [AssignmentController::class, 'update']);
});
// For submission controller
Route::group([
    'prefix' => 'submission'
], function () {
    Route::post('/create', [SubmissionController::class, 'create']);
    Route::post('/delete', [SubmissionController::class, 'delete']);
    Route::post('/check', [SubmissionController::class, 'check']);
    Route::get('/download/{id}', [DownloadController::class, 'getSubmission']);
    Route::post('/update', [SubmissionController::class, 'update']);
    Route::post('/get-submissions', [SubmissionController::class, 'getSubmissions']);
});

// For material controller
Route::group([
    'prefix' => 'material'
], function () {
    Route::post('/create', [MaterialController::class, 'create']);
    Route::post('/in-course', [MaterialController::class, 'getMaterialsInCourse']);
    Route::post('/get-info', [MaterialController::class, 'getInfo']);
    Route::get('/download/{id}', [DownloadController::class, 'getMaterial']);
    Route::post('/update', [MaterialController::class, 'update']);
    Route::post('/delete', [MaterialController::class, 'destroy']);
});


// Route::post('/enrolled-list', [CoursesController::class, 'getEnrolledList']);
// Route::get('/download/{id}', [DownloadController::class, 'getSubmission']);
// Route::get('/material/download/{id}', [DownloadController::class, 'getMaterial']);

// Route::group([
//     'prefix' => 'posts'
// ], function () {
//     Route::get('/', [PostController::class, 'getPosts']);
//     Route::post('/update', [PostController::class, 'updatePost']);
//     Route::post('/new', [PostController::class, 'newPost']);
//     Route::post('/comments', [PostController::class, 'getComments']);
//     Route::post('/post-comment', [PostController::class, 'postComment']);
//     Route::post('/update-comment', [PostController::class, 'updateComment']);
//     Route::post('/delete-comment', [PostController::class, 'deleteComment']);
//     Route::post('/delete-post', [PostController::class, 'deletePost']);
//     Route::get('/{id}', [PostController::class, 'getPost']);
// });

// Route::group([
//     'prefix' => 'profile'
// ], function () {
//     Route::post('/view', [ProfileController::class, 'getUser']);
//     Route::post('/edit', [ProfileController::class, 'editUser']);
// });
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('/login', [SessionController::class, 'login']);
    Route::post('/register', [SessionController::class, 'register']);
    Route::post('/logout', [SessionController::class, 'logout']);
});
