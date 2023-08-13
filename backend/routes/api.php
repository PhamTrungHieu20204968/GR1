<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\WorksController;
use App\Http\Controllers\ShareController;
use App\Http\Controllers\AdminsController;
use App\Http\Controllers\HistoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('user')->group(function () {
    Route::post('/login', [UsersController::class, 'login']);
    Route::post('/signup', [UsersController::class, 'signUp']);
    Route::post('/logout', [UsersController::class, 'logout']);
    Route::post('/getAll', [UsersController::class, 'getAll']);
    Route::get('/getTable', [UsersController::class, 'getTable']);
    Route::post('/deleteOne', [UsersController::class, 'deleteOne']);
    Route::post('/updateOne', [UsersController::class, 'updateOne']);
    Route::post('/getId', [UsersController::class, 'getId']);
    Route::post('/changePass', [UsersController::class, 'changePass']);
});

Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminsController::class, 'login']);
    Route::post('/getId', [AdminsController::class, 'getId']);
    Route::post('/changePass', [AdminsController::class, 'changePass']);
});

Route::prefix('history')->group(function () {
    Route::get('/getTable', [HistoryController::class, 'getTable']);
});

Route::prefix('work')->group(function () {
    Route::post('/create', [WorksController::class, 'create']);
    Route::post('/get', [WorksController::class, 'getAll']);
    Route::post('/delete', [WorksController::class, 'deleteOne']);
    Route::post('/deleteShare', [WorksController::class, 'deleteShare']);
    Route::post('/update', [WorksController::class, 'updateOne']);
    Route::post('/createShare', [WorksController::class, 'createShare']);
    Route::post('/updateShare', [WorksController::class, 'updateShare']);
});

Route::prefix('share')->group(function () {
    Route::post('/getShareList', [ShareController::class, 'getShareList']);
    Route::post('/getByUserId', [ShareController::class, 'getByUserId']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
