<?php

namespace App\Http\Controllers;

use App\Models\Works;
use App\Models\Share;
use App\Models\Users;
use Illuminate\Http\Request;

class WorksController extends Controller
{
    private $works;
    private $share;
    private $users;
    public function __construct(){
        $this->works = new Works();
        $this->share = new Share();
        $this->users = new Users();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
        $data = [
            'userId'=>$request->userId,
            'name'=>$request->name,
            'description'=>$request->description,
            'type'=>$request->type,
            'timeStart'=>$request->timeStart,
            'timeEnd'=>$request->timeEnd,
        ];
        $res = $this->works->insertData($data);

        return response()->json($res);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getAll(Request $request)
    {
        //
        $data =  $this->works->getAll($request->userId);

        return response()->json($data);

    }

    public function deleteOne(Request $request)
    {
        //
        if($request->type === "2"){
            $deletedShareTable = $this->share->deleteWork($request->workId);
        }
        $data =  $this->works->deleteOne($request->workId);

        return response()->json($data);

    }

    public function deleteShare(Request $request)
    {
        //
        $deletedShareTable = $this->share->deleteWork($request->workId);
        
        $data =  $this->works->deleteOne($request->workId);

        return response()->json($deletedShareTable);

    }

    public function updateOne(Request $request)
    {
        //
        $data = [
            'id' => $request->workId,
            'userId'=>$request->userId,
            'name'=>$request->name,
            'description'=>$request->description,
            'type'=>$request->type,
            'timeStart'=>$request->timeStart,
            'timeEnd'=>$request->timeEnd,
        ];
        $res =  $this->works->updateOne($data);

        return response()->json($data);

    }

    public function createShare(Request $request)
    {
        //
        $data = [
            'userId'=>$request->userId,
            'name'=>$request->name,
            'description'=>$request->description,
            'type'=>$request->type,
            'role'=>$request->role,
            'share'=>$request->share,
            'timeStart'=>$request->timeStart,
            'timeEnd'=>$request->timeEnd,
        ];
        $res1 = $this->works->insertData($data);

        $shareData=[];
        foreach ($data['share'] as $member) {
            $item = ['user_id' => $this->users->getUserId($member), 'work_id' => $res1->id,'role' => $data['role']];
            array_push($shareData,$item);
        }
        $res2= $this->share->insertData($shareData);
        

        return response()->json($res1);

    }
    
}
