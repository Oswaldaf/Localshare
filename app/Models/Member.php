<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;
    protected $fillable = [
        'group_id',
        'user_id',
    ];
    public function groups()
    {
        return $this->belongsTo(Group::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    // public function users()
    // {
    //     return $this->hasMany(User::class, 'user_id');
    // }
    public function files()
    {
        return $this->hasMany(File::class);
    }
}
