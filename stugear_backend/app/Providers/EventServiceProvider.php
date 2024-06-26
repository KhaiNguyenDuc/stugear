<?php

namespace App\Providers;

use App\Events\InteractProduct;
use App\Events\InteractThread;
use App\Events\ProductCreated;
use App\Events\ThreadCreated;
use App\Listeners\NotificationProductListener;
use App\Listeners\NotificationThreadListener;
use App\Listeners\ProductCreatedListener;
use App\Listeners\ThreadCreatedListener;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Observers\ModelObserver;


class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        ThreadCreated::class => [
            ThreadCreatedListener::class,
        ],
        ProductCreated::class => [
            ProductCreatedListener::class,
        ],
        InteractThread::class => [
            NotificationThreadListener::class,
        ],
        InteractProduct::class => [
            NotificationProductListener::class,
        ],
    ];



    /**
     * Register any events for your application.
     */
    public function boot(): void
    {

    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
