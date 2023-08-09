<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\WorksController;
use App\Http\Controllers\ShareController;
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
});

Route::prefix('work')->group(function () {
    Route::post('/create', [WorksController::class, 'create']);
    Route::post('/get', [WorksController::class, 'getAll']);
    Route::post('/delete', [WorksController::class, 'deleteOne']);
    Route::post('/deleteShare', [WorksController::class, 'deleteShare']);
    Route::post('/update', [WorksController::class, 'updateOne']);
    Route::post('/createShare', [WorksController::class, 'createShare']);
});

Route::prefix('share')->group(function () {
    Route::post('/getShareList', [ShareController::class, 'getShareList']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
