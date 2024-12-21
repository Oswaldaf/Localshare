<?php

namespace App\repositories;
use App\Interfaces\GroupInterface;
use App\Mail\InvitationMail;
use App\Models\Group;
use App\Models\Member;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class GroupRepository implements GroupInterface
{
    /**
     * Create a new class instance.
     */
    public function createGroup(array $data)
    {
        Group::create($data);
        return $data;
    }
    public function addMember(array $data)
    {
         Member::create($data);
       
    }
    public function sendInvitation(array $data)
    {

    }
    public function addFiles(array $data)
    {

    }
}
