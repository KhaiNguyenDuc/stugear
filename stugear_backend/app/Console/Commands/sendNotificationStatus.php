<?php

namespace App\Console\Commands;

use App\Mail\ThreadStatus;
use App\Util\AppConstant;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class sendNotificationStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:thread-notification-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send notification about thread, reply status change!';

    // public function __construct() {

    // }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        DB::table('threads')
        ->where('view_by_owner', '<', Carbon::now()->subDays(3))
        ->update(['unsent_notification' => true]);

        $threads = DB::table('threads')
            ->where('unsent_notification', '=', false)
            ->get();

        foreach ($threads as $thread) {
            $user = DB::table('users')->where('id', '=', $thread->user_id)->first();
            $countReplies = DB::table('replies')
                ->where('thread_id', '=', $thread->id)
                ->whereBetween('created_at', [$thread->view_by_owner, Carbon::now()])
                ->count();
            if ($countReplies != 0) {
                DB::table('notifications')->insert([
                    'user_id' => $thread->user_id,
                    'content' => 'Link: ' . AppConstant::$DOMAIN_FE . 'thread/' . $thread->id . ' có tổng cộng: ' . $countReplies . ' phản hồi!',
                    'target_id' => $thread->id,
                    'type' => 'thread',
                    'created_by' => 3,
                    'updated_by' => 3,
                    'created_at' => Carbon::now(),
                    'updated_at'=> Carbon::now()
                ]);

                $mailData = [
                    'subject' => 'Stugear xin chào',
                    'content' => 'Link: ' . AppConstant::$DOMAIN_FE . 'thread/' . $thread->id . ' có tổng cộng: ' . $countReplies . ' phản hồi!',
                    'signature' => 'Stugear'
                ];
                try {
                    Mail::to($user->email)->send(new ThreadStatus($mailData));
                } catch (\Throwable $th) {
                    Log::error($th);
                }
            }
        }
    }
}
