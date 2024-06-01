<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class StopQueueWorkerCommand extends Command
{
    protected $signature = 'queue:stop';
    protected $description = 'Stop the Laravel queue worker';

    public function handle()
    {
        $process = new Process(['supervisorctl', 'stop', 'laravel-worker']);
        $process->run();

        if ($process->isSuccessful()) {
            $this->info('Queue worker stopped successfully.');
        } else {
            $this->error('Failed to stop queue worker.');
        }
    }
}
