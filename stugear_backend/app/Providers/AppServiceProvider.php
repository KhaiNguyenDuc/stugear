<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(
            \App\Repositories\User\UserRepositoryInterface::class,
            \App\Repositories\User\UserRepository::class,
        );
        $this->app->singleton(
            \App\Repositories\Category\CategoryRepositoryInterface::class,
            \App\Repositories\Category\CategoryRepository::class,
        );
        $this->app->singleton(
            \App\Repositories\Product\ProductRepositoryInterface::class,
            \App\Repositories\Product\ProductRepository::class,
        );
        $this->app->singleton(
            \App\Repositories\Tag\TagRepositoryInterface::class,
            \App\Repositories\Tag\TagRepository::class,
        );
        $this->app->singleton(
            \App\Repositories\Rating\RatingRepositoryInterface::class,
            \App\Repositories\Rating\RatingRepository::class,
        );
        $this->app->singleton(
            \App\Repositories\Comment\CommentRepositoryInterface::class,
            \App\Repositories\Comment\CommentRepository::class,
        );
        $this->app->singleton(
            \App\Repositories\Wishlist\WishlistRepositoryInterface::class,
            \App\Repositories\Wishlist\WishlistRepository::class,
        );
        $this->app->singleton(
            \App\Repositories\Order\OrderRepositoryInterface::class,
            \App\Repositories\Order\OrderRepository::class,
        );
        $this->app->singleton(
            \App\Repositories\Ask\AskRepositoryInterface::class,
            \App\Repositories\Ask\AskRepository::class,
        );
        $this->app->singleton(
            \App\Repositories\Vote\VoteRepositoryInterface::class,
            \App\Repositories\Vote\VoteRepository::class,
        );
        $this->app->singleton(
            \App\Repositories\Thread\ThreadRepositoryInterface::class,
            \App\Repositories\Thread\ThreadRepository::class,
        );
        $this->app->singleton(
            \App\Repositories\Reply\ReplyRepositoryInterface::class,
            \App\Repositories\Reply\ReplyRepository::class,
        );
        $this->app->singleton(
            \App\Repositories\React\ReactRepositoryInterface::class,
            \App\Repositories\React\ReactRepository::class,
        );
        $this->app->singleton(
            \App\Repositories\Validation\ValidationRepositoryInterface::class,
            \App\Repositories\Validation\ValidationRepository::class,
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
