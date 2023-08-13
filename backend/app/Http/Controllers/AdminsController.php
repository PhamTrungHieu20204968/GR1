<?php

namespace App\Http\Controllers;

use App\Models\Admins;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;

class AdminsController extends Controller
{
    private $admins;
    public function __construct(){
        $this->admins = new Admins();
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
        $rules = [
            'account' => 'required',
            'password' => 'required',
        ];
    
        $messages = [
            'account.required' => 'Vui lòng nhập tài khoản',
            'password.required' => 'Vui lòng nhập mật khẩu',
        ];
    
        $validator = Validator::make($request->all(),$rules,$messages);
    
        $validator->validate();
    
        $data = [
            'account' => $request->account,
            'password' => $request->password
        ];
        $res = $this->admins->login($data);
        
       return response()->json($res);
    }
    
    public function getId(Request $request)
    {
    
        $id = $this->admins->getId($request->account);

       return response()->json($id);
    }

    public function changePass(Request $request)
    {

        $res = $this->admins->changePass($request->id,$request->pass);

        return response()->json($res);
    }

}
