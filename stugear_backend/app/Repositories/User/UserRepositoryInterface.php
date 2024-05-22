<?php

namespace App\Repositories\User;

use App\Repositories\RepositoryInterface;

interface UserRepositoryInterface extends RepositoryInterface
{
    public function findUserByEmail($email);
    

    public function getAllUserWithContactDetail($limit);

    public function getUserWithContactDetailById($id);
    public function getContactDetail($userId);

    public function updateContactDetail($data, $userId);

    public function getTopContributor($limit);
    public function getAssistant();

}
