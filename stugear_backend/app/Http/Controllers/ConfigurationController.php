<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConfigurationController extends Controller
{
    public function getStatus()
    {

        $data = DB::table("configurations")->where('id', 1)
            ->select(
                "is_auto_reviewed",
                "is_auto_reply_thread"
            )
            ->first();
        $memberData = [];
        $memberData["is_auto_reviewed"] = $data->is_auto_reviewed;
        $memberData["is_auto_reply_thread"] = $data->is_auto_reply_thread;
        return response()->json([
            'status' => 'Thành công',
            'message' => 'Lấy dữ liệu thành công',
            'data' => $data,
        ]);
    }

    public function updateStatus(Request $request)
    {
        $type = $request->type;
        if ($type === "review") {
            $data = DB::table('configurations')
                ->where('id', '=', 1)
                ->update([
                    'is_auto_reviewed' => $request->reviewStatus,
                ]);
        } else if($type==="reply") {
            $data = DB::table('configurations')
                ->where('id', '=', 1)
                ->update([
                    'is_auto_reply_thread' => $request->replyStatus,
                ]);
        }

        return response()->json([
            'status' => 'Thành công',
            'message' => 'Lấy dữ liệu thành công',
            'data' => $data,
        ]);
    }
}
