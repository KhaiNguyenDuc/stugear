<?php

namespace App\Repositories\Order;

use App\Repositories\RepositoryInterface;

interface OrderRepositoryInterface extends RepositoryInterface
{
    public function getCurrentUserOrdersHistory($userId, $limit);

    public function getCurrentUserOrders($userId, $limit);

    public function getCompleteOrder($id);

    public function getOrdersWorkingByProductId($productId);

    public function getAllOrderWithVenderInfo($limit);
}
