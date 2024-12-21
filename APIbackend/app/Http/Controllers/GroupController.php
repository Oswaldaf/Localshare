<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddMemberRequest;
use App\Http\Requests\CreateGroupRequest;
use App\Http\Resources\GroupResource;
use App\Http\Resources\UserRessource;
use App\Interfaces\GroupInterface;
use App\Mail\InvitationMail;
use App\Mail\NewMemberNotification;
use App\Models\Group;
use App\Models\Member;
use App\Models\User;
use App\responses\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Throwable;

class GroupController extends Controller
{
    private GroupInterface $groupInterface;
    public function __construct(GroupInterface $groupInterface)
    {
        $this->groupInterface = $groupInterface;
    }
    public function createGroup(CreateGroupRequest $request)
    {
        
        $data = [
            'group_name' => $request->group_name,
            'description' => $request->description,
            'created_by' => Auth::id()
        ];
        DB::beginTransaction();
        try{
            $user = Auth::user();
            $group = Group::create($data);
            
        if($group) {
            $group->members()->create([
                'user_id' => $user->id,
                'group_id' => $group->id
            ]);
        }
            DB::commit();

            return ApiResponse::sendResponse(true, [new GroupResource($group) ], 'Opération effectuée.', 201);
            


        }catch(Throwable $th){
           return ApiResponse::rollback($th);
        }
    }
    public function addMember(AddMemberRequest $request, String $groupId)
{
    $data = [
        'email' => $request->email,
    ];

    DB::beginTransaction();
    try {
        $user = User::where('email', $data['email'])->first();
        $signUpLink = url('/v2.0.0/register') . '?email=' . $request->email;
        $group = Group::findOrFail($groupId);
        $group_name = $group->group_name;

        if (!$user) {
            $is_user = false;

            $member = $group->invitations()->create([
                'email' => $data['email'],
                'group_id' => $group->id
            ]);

            Mail::to($data['email'])->send(new InvitationMail(
                $signUpLink,
                $group_name
            ));

            DB::commit();
            return ApiResponse::sendResponse(true, [new GroupResource($member)], 'Invitation envoyée avec succès', 201);
        }elseif ($group->members()->where('user_id', $user->id)->exists()) {
                return ApiResponse::sendResponse(
                    [
                    ],
                        false,
                        'Cet utilisateur appartient déjà à ce groupe'
                );
        }else {
            $is_user = true;

        $member = $group->members()->create([
            'user_id' => $user->id,
            'is_user' => $is_user,
        ]);
        $users = $group->members()->with('user')->get();
        foreach($users as $member) {
            $email = $member->user->where('email', '!=', $data['email'])->first();
            if($member != null){
                $name = $member->user->where('name', '!=', $member->name)->first();
            }

            Mail::to($email)->send(new NewMemberNotification(
                $group,
                $name->name,
            ));
        }

        DB::commit();
        return ApiResponse::sendResponse(true, [new GroupResource($member)], 'Membre ajouté avec succès', 201);
        }
        
    } catch (Throwable $th) {
        return $th;
        return ApiResponse::sendResponse(false, [], 'Erreur lors de l\ajout du membre', 500);
    }
}

    public function newUser(Request $request)
    {
        $data = [
            'email' => $request->email
        ];
        $user = User::where('email', $data['email'])->first();
        
        return ApiResponse::sendResponse(
            true,
            [new UserRessource($user)],
            'connexion effectuée.',
            200 
        );
    }
    public function groupList()
    {
        $user = Auth::user();
        $groups = $user->groups;

        return response()->json([
            'groups' => $groups,
        ]
        );
    }
    public function showGroup(String $groupId)
    {
        $group = Group::findOrFail($groupId);
        $users = $group->users;
        $members = $group->members;
        return response()->json([
            'users' => $users,
            'group' => $group,
            'members' => $members
        ]);
    }
    public function deleteMember(String $id)
    {
        try{
            $member = Member::findOrFail($id);
            if($member){
                $member->delete();

                return response()->json([
                    'Membre supprimée avec succès'
                ]);
            }
        }catch(Throwable $th) {
            return false;
        }


    }

}