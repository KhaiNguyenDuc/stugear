<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class autoUpdateStatusOrder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'order:auto-update-status-order';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Auto update status order if it not update manually';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $dateThreshold = Carbon::now()->subDays(7);

        DB::table('orders')
            ->where('status', 3)
            ->where('updated_at', '<=', $dateThreshold)
            ->update(['status' => 4]);

        DB::table('orders')
            ->where('status', 6)
            ->where('updated_at', '<=', $dateThreshold)
            ->update(['status' => 7]);
    }
}
