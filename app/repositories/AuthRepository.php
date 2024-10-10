<?php

namespace App\repositories;
use App\interfaces\AuthInterface;
use App\Mail\mails\OtpCodeMail;
use App\Mail\NewMemberNotification;
use App\Models\Group;
use App\Models\Invitation;
use App\Models\Member;
use App\Models\OtpCode;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthRepository implements AuthInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
       
    }
    public function register(array $data) 
       {
            User::create($data);

            $otp_code = [
                'email' => $data['email'],
                'code' => rand(111111, 999999),
            ];
        OtpCode::where('email', $data['email'])->delete();    
        OtpCode::create($otp_code);
        Mail::to($data['email'])->send(new \App\Mail\OtpCodeMail(
            $data['name'],
            $data['email'],
            $otp_code['code']
        ));

       }
    public function login(array $data)
    {
        $user = User::where('email', $data['email'])->first();
        
        $newUser = Invitation::where('email', $data['email'])->first();
        if (!$user)
            return false;

        
        if (!Hash::check($data['password'], $user->password)) {

            return false;
        }
            if ( $newUser) {
                 Member::create([
                    'user_id' => $user->id,
                    'group_id' => $newUser->group_id
                ]);
                
                $newUser->delete();
                $group = Group::findOrFail($newUser->group_id);
                $users = $group->members()->with('user')->get();
        foreach($users as $member) {
            $email = $member->user->where('email', '!=', $data['email'])->first();
            $name = $member->user->where('name', '!=', $member->name)->first()->pluck('name');

            Mail::to($email)->send(new NewMemberNotification(
                $group,
                $name
            ));
        }
        $user->tokens()->delete();
        $user->token = $user->createToken($user->id)->plainTextToken;
        return $user;
            }
            $user->tokens()->delete();
        $user->token = $user->createToken($user->id)->plainTextToken;
        return $user;
        
    }   
    public function checkOtpCode(array $data)
    {
        $otp_code = OtpCode::where('email', $data['email'])->first();

        if(!$otp_code)
        
        return false;

        if(Hash::check($data['code'], $otp_code['code'])) {
            $user = User::where('email', $data['email'])->first();
            $user->update(['is_confirmed' => true]);

            $otp_code->delete();

            $user->token = $user->createToken($user->id)->plainTextToken;

            return $user;
        }
        return false;
    }
}
