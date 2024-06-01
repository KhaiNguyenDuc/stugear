<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Symfony\Component\Process\Process;

class QueueStatusController extends Controller
{
    public function status(): JsonResponse
    {
        $process = new Process(['supervisorctl', 'status', 'laravel-worker']);
        $process->run();

        if (!$process->isSuccessful()) {
            return response()->json(['error' => 'Could not check queue status'], 500);
        }

        $output = $process->getOutput();

        if (strpos($output, 'RUNNING') !== false) {
            return response()->json(['queue' => 'running']);
        } else {
            return response()->json(['queue' => 'not running']);
        }
    }

    public function start()
    {
        $process = new Process(['php', 'artisan', 'queue:start']);
        $process->run();

        if ($process->isSuccessful()) {
            return response()->json(['message' => 'Queue worker started successfully.']);
        } else {
            return response()->json(['error' => 'Failed to start queue worker.'], 500);
        }
    }

    public function stop()
    {
        $process = new Process(['php', 'artisan', 'queue:stop']);
        $process->run();

        if ($process->isSuccessful()) {
            return response()->json(['message' => 'Queue worker stopped successfully.']);
        } else {
            return response()->json(['error' => 'Failed to stop queue worker.'], 500);
        }
    }

    public function restart()
    {
        $process = new Process(['php', 'artisan', 'queue:restart']);
        $process->run();

        if ($process->isSuccessful()) {
            return response()->json(['message' => 'Queue worker restarted successfully.']);
        } else {
            return response()->json(['error' => 'Failed to restart queue worker.'], 500);
        }
    }

    
}