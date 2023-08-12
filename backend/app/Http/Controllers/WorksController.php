<?php

namespace App\Http\Controllers;

use App\Models\Works;
use App\Models\Share;
use App\Models\Users;
use App\Models\History;
use Illuminate\Http\Request;

class WorksController extends Controller
{
    private $works;
    private $share;
    private $users;
    private $history;
    public function __construct(){
        $this->works = new Works();
        $this->share = new Share();
        $this->users = new Users();
        $this->history = new History();
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
        $this->history->insertCreateData($res->user_id,$res->id);

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
        $deletedShareTable = $this->share->deleteWork($request->workId);
        $deletedHistoryTable = $this->history->insertDeleteData($request->userId,$request->workId);

        $res =  $this->works->deleteOne($request->workId);

        return response()->json($res);

    }

    public function deleteShare(Request $request)
    {
        //
        $deletedShareTable = $this->share->deleteWork($request->workId);
        $deletedHistoryTable = $this->history->insertDeleteData($request->userId,$request->workId);
        
        $data =  $this->works->deleteOne($request->workId);

        return response()->json($deletedShareTable);

    }

    public function updateOne(Request $request)
    {
        //
        $data = [
            'workId' => $request->workId,
            'userId'=>$request->userId,
            'name'=>$request->name,
            'description'=>$request->description,
            'type'=>$request->type,
            'timeStart'=>$request->timeStart,
            'timeEnd'=>$request->timeEnd,
        ];
        $res =  $this->works->updateOne($data);
        $deletedHistoryTable = $this->history->insertUpdateData($request->userId,$request->workId);

       
        $res2 = $this->share->deleteWork($data['workId']);

        return response()->json($res);

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
        $this->history->insertCreateData($res1->user_id,$res1->id);
        

        return response()->json($res1);

    }

    public function updateShare(Request $request)
    {
        //
        $data = [
            'workId'=>$request->workId,
            'userId'=>$request->userId,
            'name'=>$request->name,
            'description'=>$request->description,
            'type'=>$request->type,
            'role'=>$request->role,
            'share'=>$request->share,
            'timeStart'=>$request->timeStart,
            'timeEnd'=>$request->timeEnd,
        ];
        
        $shareData=[];
        foreach ($data['share'] as $member) {
            $item = ['user_id' => $this->users->getUserId($member), 'work_id' => $data['workId'],'role' => $data['role']];
            array_push($shareData,$item);
        }
        $res2 = $this->share->deleteWork($data['workId']);
        $res3= $this->share->insertData($shareData);
        $res1 = $this->works->updateOne($data);
        $deletedHistoryTable = $this->history->insertUpdateData($request->userId,$request->workId);
        

        return response()->json($res3);

    }
}
