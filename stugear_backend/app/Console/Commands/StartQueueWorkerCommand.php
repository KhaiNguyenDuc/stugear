<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class StartQueueWorkerCommand extends Command
{
    protected $signature = 'queue:start';
    protected $description = 'Start the Laravel queue worker';

    public function handle()
    {
        $process = new Process(['supervisorctl', 'start', 'laravel-worker']);
        $process->run();

        if ($process->isSuccessful()) {
            $this->info('Queue worker started successfully.');
        } else {
            $this->error('Failed to start queue worker.');
        }
    }
}
