<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Users extends Model
{
    use HasFactory;
    protected $table = 'users';
    protected $fillable = ['id','account','password','name','email','age','sex','created_at','updated_at'];

    protected $hidden = [
        'password'
    ];


    public function getAllUsers() {
        $users = DB::table($this->table)->get();
        return $users;
    }

    public function login($data){
        $user = DB::table($this->table)
        ->select('*')
        ->where([
            'account' => $data['account'],
            'password' => $data['password'],
        ])
        ->get();

        if(sizeof($user) > 0) return true;
        else return false;

    }

    public function insertData($data){
        $status = DB::table($this->table)->insert([
            'account' => $data['account'],
            'password' => $data['password'],
            'name' => $data['name'],
            'created_at' => date('Y-m-d H:i:s')
        ]);

       

        return $status;
    }
}
