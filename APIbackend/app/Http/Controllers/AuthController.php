<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserRessource;
use App\interfaces\AuthInterface;
use App\Mail\NewMemberNotification;
use App\Models\Group;
use App\Models\Invitation;
use App\Models\Member;
use App\Models\User;
use App\responses\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Throwable;

class AuthController extends Controller
{
    private AuthInterface $authInterface;

    public function __construct(AuthInterface $authInterface)
    {
        $this->authInterface = $authInterface;
    }
    public function register(Request $request)
    {
        ($request->hasFile('avatar') ? $avatarPath = $request->file('avatar')->store('avatars', 'public') : $avatarPath = null);
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'avatar' => $avatarPath
        ];
        

        DB::beginTransaction();
        try {
            $user = $this->authInterface->register($data);
            DB::commit();
            return ApiResponse::sendResponse(true, [new UserRessource($user)], 'Opération effectuée.', 201);

        }catch (\Throwable $th) {
            return ApiResponse::rollback($th);
        }
        
    }
    public function login(LoginRequest $loginRequest)
    {
        $data = [
            'email' => $loginRequest->email,
            'password' => $loginRequest->password,
        ];

        DB::beginTransaction();

        try {
            
            $user = $this->authInterface->login($data);
            

            DB::commit();

            if (!$user){
                return ApiResponse::sendResponse(
                    false,
                    [],
                    'identifiant invalide.',
                    401
                );
            }
            return response()->json([
                'success' => true,
                'message' => 'Connexion réussie',
                'email' => $user->email,
                'user_id' => $user->id,
                'token' => $user->token, 
                $user,
            ], 200);
            
        } catch (\Throwable $th) {
            return $th;
            return ApiResponse::rollback($th);
        }
    }
    public function checkOtpCode(Request $request)
    {
        $data = [
            'email' => $request->email,
            'code' => $request->code,
        ];

        DB::beginTransaction();
        try {
            $user = $this->authInterface->checkOtpCode($data);

            DB::commit();

            if (!$user) {

                return ApiResponse::sendResponse(
                    false,
                    [],
                    'Code de Confirmation Invalide.',
                    200
                );
            }


            return ApiResponse::sendResponse(
                true,
                [new UserRessource($user)],
                'Opérations effectué.',
                200
            );
        } catch (\Throwable $th) {
            return ApiResponse::rollback($th);
        }
    }
    public function userProfile(Request $request) {
        $data = [
            'email' => $request->email
        ];
        $user = User::where('email', $data['email'])->first(); 
         if ($user) {
        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar 
        ], 200);
    }
    return response()->json(['message' => 'Non authentifié'], 401);
        // return response()->json($user);
    }
    public function delete(String $id)
    {
        try {
            $user = User::findOrFail($id);
        if($user){
            $user->delete();
        }
        return response()->json([
            'success'
        ]);
        }catch(Throwable $th){
            return $th;
            return response()->json(['false']);
        }
    }


}
