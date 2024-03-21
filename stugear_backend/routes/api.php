<?php

use App\Http\Controllers\AskController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\WishlistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerifyController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\ReplyController;
// Route::controller(AuthController::class)->group(function () {
//     Route::post('login', 'login')->middleware('auth_jwt');
//     Route::post('register', 'register');
//     Route::post('logout', 'logout');
//     Route::post('refresh', 'refresh');

// });
Route::controller(AuthController::class)->prefix('auth')->group(function (){
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/refresh', 'refresh');
    Route::get('/send-reset-password-email', 'sendResetPasswordEmail');
    Route::post('/reset-password', 'resetPassword');
});



Route::controller(CategoryController::class)->prefix('categories')->group(function (){
    Route::get('/', 'index');
    Route::post('/', 'create')->middleware('admin_permission');
    Route::patch('/{id}', 'update')->middleware('admin_permission');
    Route::delete('/{id}', 'delete')->middleware('admin_permission');
    Route::get('/{id}', 'view');
    Route::post('/{id}/upload-image', 'uploadImage')->middleware('admin_permission');
    Route::get('/{id}/images', 'getImage');
    Route::get('/{id}/statistic','getStatisticByCategory');
});

Route::controller(VerifyController::class)->prefix('products')->group(function (){
    Route::get('/send-verify-email','sendVerifyEmail');
    Route::post('/verify-email','verifyEmail');
});

Route::controller(ProductController::class)->prefix('products')->group(function (){
    Route::get('/', 'index');
    Route::get('/all-status', 'getAllStatusProduct');
    Route::get('/all-transaction', 'getAllTransactionMethod');
    Route::get('/current', 'getProductByCurrentUser');
    Route::get('/search','searchByName');
    Route::post('/category-search','searchInCategory');
    Route::get('/criteria','getByCriteria');
    Route::post('/search-criteria','searchWithCriteria');
    Route::get('/category/{id}', 'getProductByCategoryId');
    Route::get('/tag/{id}','getProductByTagId');
    Route::get('/{id}', 'view');
    Route::post('/', 'create')->middleware('auth_jwt');
    Route::post('/draft', 'createDraft')->middleware('auth_jwt');
    Route::patch('/{id}/update','updateProduct')->middleware('auth_jwt');
    Route::patch('/status/{id}','updateStatus')->middleware('auth_jwt');
    Route::patch('/{id}/attach-tag','attachTag')->middleware('auth_jwt');
    Route::post('/{id}/upload-image', 'uploadImage')->middleware('auth_jwt');
    Route::get('/{id}/images', 'getImage');
    Route::delete('/{id}', 'delete')->middleware('auth_jwt');
});


Route::controller(WishlistController::class)->group(function (){
    Route::get('/users/wishlists', 'getWishlistByUserId')->middleware('auth_jwt');
    Route::post('/users/wishlists', 'addProductToWishlist')->middleware('auth_jwt');
    Route::post('/wishlists/remove', 'remove')->middleware('auth_jwt');
});

Route::get('/users/buy/orders', [OrderController::class, 'getCurrentUserOrdersHistory'])->middleware('auth_jwt');
Route::get('/users/sell/orders', [OrderController::class, 'getCurrentUserOrders'])->middleware('auth_jwt');

Route::controller(UserController::class)->prefix('users')->group(function (){
    Route::get('/', 'index');
    Route::get('/info', 'getCurrentUserInfo')->middleware('auth_jwt');
    Route::get('/balance','getCurrentUserBalance')->middleware('auth_jwt');
    Route::get('/{id}', 'view');
    Route::post('/{id}/upload-image', 'uploadImage')->middleware('auth_jwt');
    Route::get('/{id}/images', 'getImage');
    Route::patch('/status/{id}','updateStatus')->middleware('auth_jwt');
    Route::patch('/info','updateProfile')->middleware('auth_jwt');
});

Route::controller(TagController::class)->prefix('tags')->group(function (){
    Route::post('/', 'create')->middleware('auth_jwt');
    Route::get('/','index');
    Route::get('/{id}', 'view');
});

Route::controller(RatingController::class)->group(function (){
    Route::get('/products/{id}/ratings', 'getRatingByProductId');
});

Route::controller(CommentController::class)->group(function (){
    Route::get('/products/{id}/comments', 'getCommentByProductId');
    Route::post('/products/{id}/comments', 'create')->middleware('auth_jwt');
    Route::patch('/products/{id}/comments', 'update')->middleware('auth_jwt');
    Route::patch('/products/comments/{id}/vote', 'vote');
});

Route::controller(PaymentController::class)->prefix('payments')->group(function (){
    Route::get('/test-api-payment','testApiPayment');
    Route::post('/momo-payment','momoPayment')->middleware('auth_jwt');;
    Route::post('/vnpay-payment','vnpayPayment')->middleware('auth_jwt');;
});

Route::controller(OrderController::class)->prefix('orders')->group(function (){
    Route::post('/','create')->middleware('auth_jwt');
    Route::get('/','getAllOrders')->middleware('admin_permission');
    Route::get('/{id}', 'getOrderById')->middleware('auth_jwt');
    Route::patch('/{id}/seller', 'updateStatusBySeller')->middleware('auth_jwt');
    Route::patch('/{id}/buyer', 'updateStatusByBuyer')->middleware('auth_jwt');
    Route::patch('/{id}/admin', 'updateStatusByAdmin')->middleware('admin_permission');
});

Route::controller(AskController::class)->prefix('asks')->group(function (){
    Route::post('/withdraw','withdraw')->middleware('auth_jwt');
    Route::post('/handle-withdraw/{id}', 'handleWithdraw')->middleware('admin_permission');
    Route::post('/report', 'report')->middleware('auth_jwt');
    Route::post('/handle-report/{id}', 'handleReport')->middleware('admin_permission');
    Route::post('/{id}/upload-image', 'uploadImage')->middleware('auth_jwt');
    Route::get('/current/withdraws', 'getListWithdrawByCurrentUser');
    Route::get('/{id}/images', 'getImage');
    Route::get('/withdraws', 'getListWithdraw');
    Route::get('/reports', 'getListReport');
});

Route::controller(ThreadController::class)->prefix('threads')->group(function (){
    Route::post('/filter','index');
    Route::get('/{id}', 'getThreadById'); 
    Route::patch('/{id}/react', 'reactByThreadAndUser')->middleware('auth_jwt'); 
    
    Route::post('/', 'create');
    Route::patch('/{id}/attach-tag','attachTag')->middleware('auth_jwt');
    Route::delete('/{id}', 'delete')->middleware('auth_jwt');
});

Route::controller(ReplyController::class)->group(function (){
    Route::get('/thread/{id}/replies', 'getReplyByThreadId');
    Route::delete('/replies/{id}', 'delete')->middleware('auth_jwt');
    Route::patch('/replies/{id}/react', 'reactByReplyAndUser')->middleware('auth_jwt');
});







