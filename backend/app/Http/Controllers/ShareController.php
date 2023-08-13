<?php

namespace App\Http\Controllers;
use App\Models\Share;

use Illuminate\Http\Request;

class ShareController extends Controller
{
    private $share;
    public function __construct(){
        $this->share = new Share();
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
    public function create($data)
    {
        //
        
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
    
    public function getShareList(Request $request)
    {
        //
        $res = $this->share->getShareList($request->workId);

        return response()->json($res);
    }

    public function getByUserId(Request $request)
    {
        //
        $res = $this->share->getByUserId($request->userId);

        return response()->json($res);
    }
}
