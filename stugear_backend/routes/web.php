<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/', [MessageController::class, 'show']);
Route::get('/login-ssr', [MessageController::class, 'loginUISSR']);
Route::post('/login-ssr', [MessageController::class, 'loginSSR'])->name('login.ssr');

// Route::controller(MessageController::class)->prefix('chats')->group(function () {
//     Route::post('/', 'sendMessage')->name('send.message'); //->middleware('auth_jwt');
// });
