<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Works extends Model
{
    use HasFactory;
    protected $table = 'works';
    protected $fillable = ['id','name','type','start','end','description','user_id','is_deleted','updated_at','created_at'];


    public function insertData($data){
    $status = Works::create([
            'user_id'=>$data['userId'],
            'name'=>$data['name'],
            'description'=>$data['description'],
            'type'=>$data['type'],
            'start'=>date('Y-m-d H:i:s' , strtotime($data['timeStart'])),
            'end'=>date('Y-m-d H:i:s' , strtotime($data['timeEnd'])),
            'created_at' => date('Y-m-d H:i:s'),
    ]);

    return $status;
    }

    public function getAll($userId){
        $data = DB::table('works')
        ->where('user_id','=',$userId)
        ->get();
        return $data;
    }

    public function deleteOne($workId){
        $deleted = DB::table('works')
        ->where('id', '=', $workId)
        ->delete();

        return $deleted;
    }

    public function updateOne($data){
        $affected = DB::table('works')
            ->where('id','=',$data['workId'])
            ->where('user_id','=',$data['userId'])
            ->update([
                'name'=>$data['name'],
                'user_id'=>$data['userId'],
                'description'=>$data['description'],
                'type'=>$data['type'],
                'start'=>date('Y-m-d H:i:s' , strtotime($data['timeStart'])),
                'end'=>date('Y-m-d H:i:s' , strtotime($data['timeEnd'])),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);

        return $affected;
    }
    
}
