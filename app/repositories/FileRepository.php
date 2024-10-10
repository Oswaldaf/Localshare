<?php

namespace App\repositories;
use App\Interfaces\FileInterface;
use App\Models\File;

class FileRepository implements FileInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    public function store(array $data)
    {
        File::create($data);
    }
    
}
