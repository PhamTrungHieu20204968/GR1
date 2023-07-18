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
    // $status = DB::table('works')->insert([
    //     'user_id'=>$data['userId'],
    //     'name'=>$data['name'],
    //     'description'=>$data['description'],
    //     'type'=>$data['type'],
    //     'start'=>$data['timeStart'],
    //     'end'=>$data['timeEnd'],
    // ]);
    $status = Works::create([
            'user_id'=>$data['userId'],
            'name'=>$data['name'],
            'description'=>$data['description'],
            'type'=>$data['type'],
            'start'=>date('Y-m-d H:i:s' , strtotime($data['timeStart'])),
            'end'=>date('Y-m-d H:i:s' , strtotime($data['timeEnd'])),
    ]);

    return $status;
    }
}
