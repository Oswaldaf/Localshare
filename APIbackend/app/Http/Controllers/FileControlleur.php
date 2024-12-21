<?php

namespace App\Http\Controllers;

use App\Http\Requests\fileRequest;
use App\Http\Resources\FileResource;
use App\Http\Resources\GroupResource;
use App\Interfaces\FileInterface;
use App\Mail\NewFileNotification;
use App\Models\File;
use App\Models\Group;
use App\Models\Member;
use App\Models\User;
use App\responses\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth ;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Throwable;

class FileControlleur extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $files = File::allFiles();

        return $files;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(fileRequest $request, String $groupId)
    {
        $user = Auth::user();
        $group = Group::findOrFail($groupId);
        $member = $group->members()->where('user_id', $user->id)->first();
        
        DB::beginTransaction();
        try {
            if ($request->hasFile('file')) {
                $fileName = time().'.'.$request->file->getClientOriginalExtension();
                $request->file->move(public_path('files'), $fileName);
                // $file->file = $fileName;
            }
            $data = [
                'file' => $fileName,
                'member_id' => $member->id, 
                'group_id' => $group->id,
            ];
            $file = File::create($data);
            
            $users = $group->members()->with('user')->get();
            foreach($users as $member){
                $email = $member->user->email;
                $name = $member->user->name;
                Mail::to($email)->send(new NewFileNotification(
                    $group,
                    $name    
                ));
            }
        
            
        DB::commit();

        return ApiResponse::sendResponse(true, ['file' => new FileResource($file), 'group' => new GroupResource($group) ], $member, 201);
        } catch(Throwable $th) {
            return $th;
            return ApiResponse::rollback($th);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $group = Group::findOrFail($id);
        $files = $group->files;

        return response()->json([
            'files' => $files
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function userFiles()
    {
       $user = Auth::user();
       $groups = $user->groups()->with('files')->get(); 

       $files = [];

   
       foreach ($groups as $group) {
           $files = array_merge($files, $group->files->toArray());
       }
       return response()->json([
            'files' => $files,
            'groups' => $groups
       ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
