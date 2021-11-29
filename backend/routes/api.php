<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\UserController;
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
    Route::post('/count-of-user', [CoursesController::class, 'countCoursesOfUser']);
    Route::post('/confirm', [CoursesController::class, 'confirm']);
    Route::post('/get-courses', [CoursesController::class, 'getCourses']);
    Route::post('/number-course', [CoursesController::class, 'getNumberCourses']);
    Route::post('/check-enrolled', [CoursesController::class, 'checkEnrolled']);
    Route::post('/check-teaching', [CoursesController::class, 'checkTeaching']);
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

// For user controller
Route::group([
    'prefix' => 'user'
], function () {
    Route::post('/update', [UserController::class, 'update']);
    Route::post('/students', [UserController::class, 'getStudents']);
    Route::post('/filter-students', [UserController::class, 'getStudentsWithFilter']);
    Route::post('/teachers', [UserController::class, 'getTeachers']);
    Route::post('/filter-teachers', [UserController::class, 'getTeachersWithFilter']);
    Route::post('/add-student', [UserController::class, 'addStudent']);
    Route::post('/add-teacher', [UserController::class, 'addTeacher']);
    Route::post('/edit-user', [UserController::class, 'editUser']);
    Route::post('/delete', [UserController::class, 'delete']);
    Route::post('/change-status', [UserController::class, 'changeStatus']);
    Route::post('/number-student', [UserController::class, 'getNumberStudents']);
    Route::post('/number-teacher', [UserController::class, 'getNumberTeachers']);
    Route::post('/find-student', [UserController::class, 'findStudent']);
    Route::post('/find-teacher', [UserController::class, 'findTeacher']);
    Route::post('/get-by-id', [UserController::class, 'getUserById']);
});

// For forum controller
Route::group([
    'prefix' => 'forum'
], function () {
    Route::get('/posts', [ForumController::class, 'getPosts']);
    Route::post('/create', [ForumController::class, 'create']);
    Route::post('/delete', [ForumController::class, 'delete']);
    Route::post('/get-post', [ForumController::class, 'getPost']);
    Route::post('/count-of-user', [ForumController::class, 'countPostsOfUser']);
    Route::post('/count-of-admin', [ForumController::class, 'countPostForAdmin']);
    Route::post('/number-post', [ForumController::class, 'getNumberPosts']);
    Route::post('/get-own-post', [ForumController::class, 'getOwnPost']);
});

// For comment controller
Route::group([
    'prefix' => 'comment'
], function () {
    Route::post('/get-comments', [CommentController::class, 'getComments']);
    Route::post('/create', [CommentController::class, 'create']);
    Route::post('/delete', [CommentController::class, 'delete']);
});

// For session controller
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('/login', [SessionController::class, 'login']);
    Route::post('/register', [SessionController::class, 'register']);
    Route::post('/logout', [SessionController::class, 'logout']);
    Route::post('/get-user', [SessionController::class, 'getUser']);
});
