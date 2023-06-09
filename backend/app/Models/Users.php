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
        if (DB::table($this->table)
        ->where([
            'account' => $data['account'],
            'password' => $data['password'],
        ])->exists()) {
            $user = DB::table($this->table)
            ->where([
                'account' => $data['account'],
                'password' => $data['password'],
            ])
            ->first();
            $token = bin2hex(random_bytes(16));
       
            return ['user' => $user,'token' => $token];
        }else return false;

    }

    public function insertData($data){

        $user = Users::create([
                'account' => $data['account'],
                'password' => $data['password'],
                'name' => $data['name'],
        ]);

        $token = bin2hex(random_bytes(16));
       
        return ['user' => $user,'token' => $token];
    }
}
