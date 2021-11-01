<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
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

Route::get('/home', [UserController::class, 'index']);
Route::get('/courses', [CoursesController::class, 'index']);
Route::get('/posts', [PostController::class, 'getPosts']);
Route::post('/posts/new', [PostController::class, 'newPost']);
Route::get('/posts/{id}', [PostController::class, 'getPost']);
Route::get('/courses/{id}', [CourseController::class, 'index']);
Route::post('/submit/upload', [CourseController::class, 'store']);
Route::post('/submit/update', [CourseController::class, 'update']);
Route::post('/submit/delete', [CourseController::class, 'deleteSubmission']);
Route::get('/download/{id}', [DownloadController::class, 'getSubmission']);
Route::get('/assignment/{id}', [CourseController::class, 'getAssignment']);
