<?php

namespace App\Interfaces;

interface GroupInterface
{
    public function createGroup(array $data);
    public function addMember(array $data);
    public function sendInvitation(array $data);
    public function addFiles(array $data);
}
