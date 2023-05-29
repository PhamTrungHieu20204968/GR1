<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Works extends Model
{
    use HasFactory;
    protected $table = 'works';
    protected $fillable = ['id','name','type','start','end','description','user_id','is_deleted','updated_at','created_at'];
}
