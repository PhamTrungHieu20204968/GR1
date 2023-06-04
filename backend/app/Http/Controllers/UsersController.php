<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;

class UsersController extends Controller
{
    private $users;
    public function __construct(){
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
    public function create()
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

    public function login(Request $request)
    {
        //
        $data = [
            'account' => $request->account,
            'password' => $request->password
        ];
        $res = $this->users->login($data);
        
       return response()->json($res);
       
    }

    public function signUp(Request $request)
    {
        //
        $data = [
            'account' => $request->account,
            'password' => $request->password,
            'name' => $request->name,
        ];

        $res = $this->users->insertData($data);
        
       return response()->json($res);
       
    }
}
