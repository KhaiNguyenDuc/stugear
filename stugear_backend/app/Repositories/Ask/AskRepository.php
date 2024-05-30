<?php

namespace App\Repositories\Ask;

use App\Models\Ask;
use App\Repositories\BaseRepository;

class AskRepository extends BaseRepository implements AskRepositoryInterface
{
    public function getModel()
    {
        return Ask::class;
    }

    public function getListReport($limit)
    {
        return $asks = 
        Ask::where('type', 2)
        ->join('users as owner', 'asks.owner_id', '=', 'owner.id')
        ->join('users as denounced', 'asks.denounced_id', '=', 'denounced.id')
        ->select(
            'asks.*',
            'owner.name as owner_name',
            'owner.email as owner_email',
            'denounced.name as denounced_name',
            'denounced.email as denounced_email'
        )
        ->paginate($limit);
    }

    
    public function getListWithdraw($limit)
    {
        return $asks = 
        Ask::where('type', 1)
        ->join('users as owner', 'asks.owner_id', '=', 'owner.id')
        ->select(
            'asks.*',
            'owner.name as owner_name',
            'owner.email as owner_email',
        )
        ->paginate($limit);
    }

    public function getListAskByCurrentUser($type, $limit, $userId)
    {
        $asks = Ask::where('type', $type)->where('owner_id', $userId)->paginate($limit);
        return $asks;
    }
}
