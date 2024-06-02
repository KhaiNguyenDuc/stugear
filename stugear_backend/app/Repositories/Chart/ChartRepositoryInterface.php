<?php

namespace App\Repositories\Chart;

use App\Repositories\RepositoryInterface;

interface ChartRepositoryInterface extends RepositoryInterface
{
    public function reportBar();

    public function gradientLine();

    public function recentEvent();
}
