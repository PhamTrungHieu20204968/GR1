<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    use HasFactory;
    protected $table = 'users';
    protected $fillable = ['id','account','password','name','email','age','sex','created_at','updated_at'];

    protected $hidden = [
        'password'
    ];
}
