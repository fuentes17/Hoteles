<?php

use App\Http\Controllers\api\HotelController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(HotelController::class)->group(function(){

    Route::get('/Hoteles','index');
    Route::get('/Habitaciones','Habitacion');
    Route::get('/Acomodacion','Acomodacion');
    Route::post('/Hotel','store');
    Route::get('/Hotel/{id}','show');
    Route::put('/Hotel/{id}','update');
    Route::delete('/Hotel/{id}','destroy');
});