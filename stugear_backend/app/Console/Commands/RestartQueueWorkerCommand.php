<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class RestartQueueWorkerCommand extends Command
{
    protected $signature = 'queue:restart';
    protected $description = 'Restart the Laravel queue worker';

    public function handle()
    {
        $process = new Process(['supervisorctl', 'restart', 'laravel-worker']);
        $process->run();

        if ($process->isSuccessful()) {
            $this->info('Queue worker restarted successfully.');
        } else {
            $this->error('Failed to restart queue worker.');
        }
    }
}
