<?php

namespace App\Http\Controllers;

use App\Events\Message;
use Illuminate\Http\Request;
use App\Util\AuthService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $userId = Auth::guard('web')->id();
        if ($request->sender_id == 5) {
            $receiver = 12;
        } else {
            $receiver = 5;
        }
        event(new Message($request->sender_id, $receiver, $request->content, Carbon::now()));
        // lưu message vô database
        return response()->json([
            'status' => 'Thành công',
            'message' => 'Gửi tin nhắn thành công',
            'data' => [
                'sender_id' => $userId,
                'receiver_id' => 12,
                'content' => $request->content
            ]
        ]);
    }

    public function show(Request $request) {
        // $token = $request->header();
        // $bareToken = substr($token['authorization'][0], 7);
        // $userId = AuthService::getUserId($bareToken);
        $id = Auth::guard('web')->id();
        return view('welcome', [
            'id' => $id
        ]);
    }

    public function loginUISSR() {
        return view('loginSSR');
    }

    public function loginSSR(Request $request)
    {
        $credential = [
            'email' => $request->email,
            'password' => $request->password
        ];
        $remember = $request->remember ?? false;
        if (Auth::guard('web')->attempt($credential, $remember)) {
            return Auth::guard('web')->id();
        }
        return 222;
    }

    // tạo function show UI chat, dùng vue 1 phần để load chat

    // tạo function get room, load all message
}
