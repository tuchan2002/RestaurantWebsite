<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\AuthController;

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

Route::middleware('cors')->group(function(){
    // public routes
    Route::post('/auth/register',[AuthController::class, 'register']);
    Route::post('/auth/login',[AuthController::class, 'login']);

    // protected routes
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/restaurants', [RestaurantController::class, 'index']);
        Route::post('/restaurants', [RestaurantController::class, 'store']);
        Route::get('/restaurants/owned', [RestaurantController::class, 'getUserRestaurants']);
        Route::get('/restaurants/{id}', [RestaurantController::class, 'getRestaurant'])->middleware(['verifyUser']);

        // PUT METHOD
        Route::post('/restaurants/{id}', [RestaurantController::class, 'update'])->middleware(['verifyUser']);
        Route::delete('/restaurants/{id}', [RestaurantController::class, 'destroy'])->middleware(['verifyAdminAndUser']);
        Route::get('/auth',[AuthController::class, 'checkUserLoggedIn']);
        Route::post('/auth/logout',[AuthController::class, 'logout']);
    });
});
