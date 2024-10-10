<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileControlleur;
use App\Http\Controllers\GroupController;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v2.0.0')->group(function() {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/otp-code', [AuthController::class, 'checkOtpCode']);
        Route::get('/users/{id}/deleteUser', [AuthController::class, 'delete']);
        Route::get('/members/{id}/deleteMember', [GroupController::class, 'deleteMember']);
        

        Route::middleware('auth:sanctum')->group(function() {
            Route::post('/groups/{groupId}/addMember', [GroupController::class, 'addMember']);
            Route::post('/createGroup', [GroupController::class, 'createGroup']);
            Route::get('/groupList', [GroupController::class, 'groupList']);
            Route::post('/group/{groupId}/addFile', [FileControlleur::class, 'store']);
            Route::get('/group/{groupId}/getGroupById', [GroupController::class, 'showGroup']);
            Route::get('/group/{id}/groupFiles/', [FileControlleur::class, 'show']);
            Route::get('/files', [FileControlleur::class, 'userFiles']);
        });
        Route::post('/getUserByEmail', [AuthController::class, 'userProfile']);
        


});




