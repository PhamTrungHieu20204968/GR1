<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Share extends Model
{
    use HasFactory;
    protected $table = 'share';
    protected $fillable = ['user_id','work_id','role','created_at'];

    public function insertData($data){
    
    $status = DB::table('share')->insert($data);
  

    return $status;
    }

    public function deleteWork($id){
    
        $deleted = DB::table('share')->where('work_id', $id)->delete();
    
        return $deleted;
    }

    public function deleteUser($id){
    
        $deleted = DB::table('share')->where('user_id', $id)->delete();
    
        return $deleted;
    }

    public function getShareList($id){
    
        $list = DB::table('share')
        ->join('users', 'users.id', '=', 'share.user_id')
        ->select('account','role')
        ->where('share.work_id','=',$id)
        ->get();;
    
        return $list;
    }
    public function getByUserId($id){
    
        $list = DB::table('share')
        ->join('works', 'works.id', '=', 'share.work_id')
        ->select('works.*', 'share.role')
        ->where('share.user_id','=',$id)
        ->get();;
    
        return $list;
    }
}
