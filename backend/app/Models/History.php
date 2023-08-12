<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class History extends Model
{
    use HasFactory;
    protected $table = 'history';
    protected $fillable = ['user_id','work_id','action','created_at'];


    public function getTable(){

        $history = DB::table('history')
        ->select('*')
        ->get();
       
        return $history;
    }

    public function deleteWork($id){
    
        $deleted = DB::table('history')->where('work_id', $id)->delete();
    
        return $deleted;
    }

    public function deleteUser($id){
    
        $deleted = DB::table('history')->where('user_id', $id)->delete();
    
        return $deleted;
    }

    public function insertCreateData($userId,$workId){
        $status =  DB::table('history')->insert([
            'user_id' => $userId,
            'work_id' => $workId,
            'action' =>  'Create',
            'created_at' => date('Y-m-d H:i:s'),
        ]);
        return $status;
    }

    public function insertDeleteData($userId,$workId){
        $status =  DB::table('history')->insert([
            'user_id' => $userId,
            'work_id' => $workId,
            'action' =>  'Delete',
            'created_at' => date('Y-m-d H:i:s'),
        ]);
        return $status;
    }

    public function insertUpdateData($userId,$workId){
        $status =  DB::table('history')->insert([
            'user_id' => $userId,
            'work_id' => $workId,
            'action' =>  'Update',
            'created_at' => date('Y-m-d H:i:s'),
        ]);
        return $status;
    }

}
