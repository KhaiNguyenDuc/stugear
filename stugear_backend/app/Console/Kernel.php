<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;


class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
        $schedule->command('send:thread-notification-status')->everySixHours();
        
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');
        $this->commands([
            Commands\StartQueueWorkerCommand::class,
            Commands\StopQueueWorkerCommand::class,
            Commands\RestartQueueWorkerCommand::class,
        ]);

        require base_path('routes/console.php');
    }
}
