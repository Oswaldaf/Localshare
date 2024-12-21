<?php

namespace App\interfaces;

interface AuthInterface
{
    public function register(array $data);
    public function login(array $data);
    public function checkOtpCode(array $data);    
}
