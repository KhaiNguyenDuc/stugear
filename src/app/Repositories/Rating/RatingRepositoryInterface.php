<?php

namespace App\Repositories\Rating;

use App\Repositories\RepositoryInterface;

interface RatingRepositoryInterface extends RepositoryInterface
{
    public function getRatingByProductId($id);
    public function rating($product_id, $rating, $userId);

}
