<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\BaseRepository;
use App\Util\AppConstant;
use Illuminate\Support\Facades\DB;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function getModel()
    {
        return User::class;
    }

    /**
     * Find user by email
     *
     * @param mixed $email
     * @return \App\Models\User
     */
    public function findUserByEmail($email)
    {
        $user = User::where('email', $email)->first();
        return $user;
    }


    public function getAllUserWithContactDetail($limit)
    {
        $query = DB::table('users')
            ->join('contact_details', 'users.id', '=', 'contact_details.user_id')
            ->join('user_roles', 'users.id', '=', 'user_roles.user_id')
            ->join('roles', 'roles.id', '=', 'user_roles.role_id')
            ->select(
                'users.id',
                'roles.role_name',
                'users.name',
                'users.email',
                'users.first_name',
                'users.is_enable',
                'last_name',
                'is_enable',
                'users.created_at',
                'contact_details.phone_number',
                'contact_details.gender',
                DB::raw("DATE_FORMAT(contact_details.birthdate, '%d-%m-%Y') as birthdate"),
                'contact_details.full_address',
                'contact_details.province',
                'contact_details.ward',
                'contact_details.district',
                'contact_details.city',
                'contact_details.social_link'
            );
    
        return $query->paginate($limit);
    }
    

    public function getUserWithContactDetailById($id)
    {
        $ordersCount = DB::table('orders')
        ->where('seller_id', $id)
        ->where('status', 4)
        ->count();

        $usersWithContactDetails = DB::table('users')
            ->join('contact_details', 'users.id', '=', 'contact_details.user_id')->where('users.id', '=', $id)
            ->select(
                'users.id',
                'users.name',
                'users.email',
                'users.first_name',
                'users.reputation',
                'last_name',
                'is_enable',
                'contact_details.phone_number',
                'contact_details.gender',
                'contact_details.birthdate',
                'contact_details.full_address',
                'contact_details.province',
                'contact_details.ward',
                'contact_details.district',
                'contact_details.city',
                'contact_details.social_link',
            )
            ->get();

        $usersWithContactDetails = $usersWithContactDetails->map(function ($user) use ($ordersCount) {
            $user->ordersCount = $ordersCount;
            return $user;
        });
        return $usersWithContactDetails;
    }

    public function getContactDetail($userId)
    {
        $result = DB::table('contact_details')->where('user_id', $userId)->first();
        return $result;
    }

    public function updateContactDetail($data, $userId)
    {
        $result = DB::table('contact_details')->where('user_id', $userId)
            ->update($data);
        return $result;
    }

    public function getTopContributor($limit)
    {
        $usersWithContactDetails = DB::table('users')
            ->join('contact_details', 'users.id', '=', 'contact_details.user_id')
            ->select(
                'users.id',
                'users.name',
                'users.email',
                'users.first_name',
                'last_name',
                'is_enable',
                'users.reputation',
                'contact_details.phone_number',
                'contact_details.gender',
                'contact_details.birthdate',
                'contact_details.full_address',
                'contact_details.province',
                'contact_details.ward',
                'contact_details.district',
                'contact_details.city',
                'contact_details.social_link',
            )
            ->orderBy('users.reputation', 'desc')
            ->take($limit)
            ->get();
        return $usersWithContactDetails;
    }
    public function getAssistant()
    {

        return DB::table('users')
            ->select(
                'users.id',
                'users.name'
            )
            ->join('user_roles', 'user_roles.user_id', '=', 'users.id')
            ->join('roles', 'user_roles.role_id', '=', 'roles.id')
            ->where('roles.role_name', AppConstant::$ROLE_ASSISTANT)
            ->first();
    }
}
