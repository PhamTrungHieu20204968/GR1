<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Admins extends Model
{
    use HasFactory;
    protected $table = 'admins';
    protected $fillable = ['id','account','password','created_at'];

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
