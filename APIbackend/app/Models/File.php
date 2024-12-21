<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $fillable = [
        'file',
        'member_id',
        'group_id'
    ];

    public function sender()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }
    public function sendAt()
    {
        return $this->belongsTo(Group::class, 'group_id');
    }
}
