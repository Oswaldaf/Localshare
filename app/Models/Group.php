<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_name',
        'description',
        'created_by'
    ];
    public function fichiers()
    {
        return $this->hasMany(File::class);
    }

    public function createur()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function users()
    {
        return $this->hasManyThrough(User::class, Member::class, 'group_id', 'id', 'id', 'user_id');
    }
    public function members()
    {
        return $this->hasMany(Member::class);
    }
    public function files()
    {
        return $this->hasMany(File::class);
    }
    public function invitations()
    {
        return $this->hasMany(Invitation::class);
    }
}
