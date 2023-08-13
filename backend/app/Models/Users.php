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

        $user = DB::table('users')->insert([
                'account' => $data['account'],
                'password' => $data['password'],
                'name' => $data['name'],
                'created_at' => date('Y-m-d H:i:s'),
        ]);

        $token = bin2hex(random_bytes(16));
       
        return ['user' => $user,'token' => $token];
    }

    public function getUserId($email){

        $user = DB::table('users')->where('account', $email)->first();
       
        return $user->id;
    }

    public function getAll($id){

        $users = DB::table('users')
        ->select('account')
        ->where('id','<>',$id)
        ->get();
       
        return $users;
    }

    public function getTable(){

        $users = DB::table('users')
        ->select('*')
        ->get();
       
        return $users;
    }

    public function deleteOne($id){

        $users = DB::table('users')
        ->where('id', '=', $id)->delete();
       
        return $users;
    }

    public function updateOne($data){

        $status = DB::table('users')
        ->where('id', '=', $data["id"])
        ->update([
            'password'=> $data["password"],
            'name' => $data["name"],
            'age' => $data["age"],
            'sex' => $data["sex"],
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
       
        return $status;
    }

    public function getId($account){
        $id = DB::table($this->table)
        ->select('id')
        ->where('account',$account)
        ->get();
        return $id;
    }

    public function changePass($id,$pass){
        $status = DB::table($this->table)
        ->where('id', $id)
        ->update(['password' => $pass]);
        return $status;
    }
}
