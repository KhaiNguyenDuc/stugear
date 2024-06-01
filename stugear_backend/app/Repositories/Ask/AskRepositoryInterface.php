<?php

namespace App\Repositories\Ask;

use App\Repositories\RepositoryInterface;

interface AskRepositoryInterface extends RepositoryInterface
{
    public function getListReport($limit);
    public function getListWithdraw($limit);
    public function getListAskByCurrentUser($type, $limit, $userId);
}
