<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;

class QueueStatusController extends Controller
{
    public function checkQueueStatus()
    {
        $exitCode = Artisan::call('queue:status-check');

        if ($exitCode === 0) {
            return response()->json(['status' => 'running']);
        } else {
            return response()->json(['status' => 'not running']);
        }
    }
}
