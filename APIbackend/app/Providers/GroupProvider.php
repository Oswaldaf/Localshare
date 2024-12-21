<?php

namespace App\Providers;

use App\Interfaces\GroupInterface;
use App\repositories\GroupRepository;
use Illuminate\Support\ServiceProvider;

class GroupProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(GroupInterface::class, GroupRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
