<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class QueueStatusCheck extends Command
{
    protected $signature = 'queue:status-check';
    protected $description = 'Check if the queue worker is running';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        if (strncasecmp(PHP_OS, 'WIN', 3) === 0) {
            // Windows
            $process = new Process(['tasklist', '/FI', 'IMAGENAME eq php.exe']);
        } else {
            // Unix-like systems
            $process = new Process(['pgrep', '-fl', 'artisan queue:work']);
        }
        
        $process->run();

        if ($process->isSuccessful() && !empty($process->getOutput())) {
            $this->info('Queue worker is running');
            return 0; // Zero exit code for success
        } else {
            $this->info('Queue worker is not running');
            return 1; // Non-zero exit code for failure
        }
    }
}
