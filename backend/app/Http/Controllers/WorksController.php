<?php

namespace App\Http\Controllers;

use App\Models\Works;
use Illuminate\Http\Request;

class WorksController extends Controller
{
    private $works;
    public function __construct(){
        $this->works = new Works();
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
        $data =  $this->works->deleteOne($request->workId);

        return response()->json($data);

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
    
}
